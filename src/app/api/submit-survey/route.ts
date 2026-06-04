import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

interface SurveyData {
  namaInisial: string;
  rentangUsia: string;
  tingkatPemahaman: string;
  kritekSaran: string;
}

export async function POST(request: NextRequest) {
  try {
    // ─── Step 1: Parse Request Body ───────────────────────────────────────
    let body: SurveyData;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("[Survey API] JSON Parse Error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON format in request body" },
        { status: 400 }
      );
    }

    console.log("[Survey API] Received form data:", {
      namaInisial: body.namaInisial,
      rentangUsia: body.rentangUsia,
      tingkatPemahaman: body.tingkatPemahaman,
      kritekSaranLength: body.kritekSaran?.length || 0,
    });

    // ─── Step 2: Validate Form Data ───────────────────────────────────────
    if (!body.namaInisial?.trim()) {
      console.warn("[Survey API] Validation failed: namaInisial is empty");
      return NextResponse.json(
        { error: "Nama/Inisial tidak boleh kosong" },
        { status: 400 }
      );
    }
    if (!body.rentangUsia) {
      console.warn("[Survey API] Validation failed: rentangUsia is empty");
      return NextResponse.json(
        { error: "Rentang usia harus dipilih" },
        { status: 400 }
      );
    }
    if (!body.tingkatPemahaman) {
      console.warn("[Survey API] Validation failed: tingkatPemahaman is empty");
      return NextResponse.json(
        { error: "Tingkat pemahaman harus dipilih" },
        { status: 400 }
      );
    }
    if (!body.kritekSaran?.trim()) {
      console.warn("[Survey API] Validation failed: kritekSaran is empty");
      return NextResponse.json(
        { error: "Kritik & Saran tidak boleh kosong" },
        { status: 400 }
      );
    }

    // ─── Step 3: Validate Environment Variables ───────────────────────────
    console.log("[Survey API] Validating environment variables...");

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail) {
      console.error(
        "[Survey API] ❌ GOOGLE_SERVICE_ACCOUNT_EMAIL is not set in .env.local"
      );
      return NextResponse.json(
        {
          error: "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL in environment",
          debug: "Check .env.local configuration",
        },
        { status: 500 }
      );
    }

    if (!privateKeyRaw) {
      console.error(
        "[Survey API] ❌ GOOGLE_PRIVATE_KEY is not set in .env.local"
      );
      return NextResponse.json(
        {
          error: "Missing GOOGLE_PRIVATE_KEY in environment",
          debug: "Check .env.local configuration",
        },
        { status: 500 }
      );
    }

    if (!sheetId) {
      console.error("[Survey API] ❌ GOOGLE_SHEET_ID is not set in .env.local");
      return NextResponse.json(
        {
          error: "Missing GOOGLE_SHEET_ID in environment",
          debug: "Check .env.local configuration",
        },
        { status: 500 }
      );
    }

    console.log("[Survey API] ✓ Environment variables validated");
    console.log("[Survey API] Service Account Email:", serviceAccountEmail);
    console.log("[Survey API] Sheet ID:", sheetId.substring(0, 10) + "...");

    // ─── Step 4: Parse Private Key ───────────────────────────────────────
    console.log("[Survey API] Parsing private key...");

    // Handle both escaped and non-escaped newlines
    const privateKey = privateKeyRaw
      .replace(/\\n/g, "\n") // Convert escaped \\n to actual newlines
      .replace(/\\"/g, '"'); // Handle escaped quotes

    if (
      !privateKey.includes("-----BEGIN PRIVATE KEY-----") ||
      !privateKey.includes("-----END PRIVATE KEY-----")
    ) {
      console.error(
        "[Survey API] ❌ Private key format invalid. Missing PEM markers."
      );
      console.error(
        "[Survey API] Private key should start with '-----BEGIN PRIVATE KEY-----' and end with '-----END PRIVATE KEY-----'"
      );
      return NextResponse.json(
        {
          error: "Invalid private key format",
          debug: "Private key must be a valid PEM format",
        },
        { status: 500 }
      );
    }

    console.log("[Survey API] ✓ Private key parsed successfully");

    // ─── Step 5: Create JWT Authentication ───────────────────────────────
    console.log("[Survey API] Creating JWT authentication...");

    let jwt: JWT;
    try {
      jwt = new JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      console.log("[Survey API] ✓ JWT created successfully");
    } catch (jwtError) {
      console.error("[Survey API] ❌ JWT Creation Error:", jwtError);
      return NextResponse.json(
        {
          error: "Failed to authenticate with Google",
          debug: jwtError instanceof Error ? jwtError.message : String(jwtError),
        },
        { status: 500 }
      );
    }

    // ─── Step 6: Initialize Google Sheets Document ───────────────────────
    console.log("[Survey API] Initializing Google Sheets document...");

    let doc: GoogleSpreadsheet;
    try {
      doc = new GoogleSpreadsheet(sheetId, jwt);
      console.log("[Survey API] ✓ GoogleSpreadsheet object created");
    } catch (docError) {
      console.error("[Survey API] ❌ GoogleSpreadsheet Init Error:", docError);
      return NextResponse.json(
        {
          error: "Failed to initialize Google Sheets client",
          debug: docError instanceof Error ? docError.message : String(docError),
        },
        { status: 500 }
      );
    }

    // ─── Step 7: Load Document Info ──────────────────────────────────────
    console.log("[Survey API] Loading spreadsheet metadata...");

    try {
      await doc.loadInfo();
      console.log(
        "[Survey API] ✓ Spreadsheet loaded. Title:",
        doc.title || "(untitled)"
      );
    } catch (loadError) {
      console.error("[Survey API] ❌ Failed to load spreadsheet:", loadError);

      // Check if it's an auth error
      if (
        loadError instanceof Error &&
        loadError.message.includes("403") &&
        loadError.message.includes("Forbidden")
      ) {
        console.error(
          "[Survey API] 🔐 This appears to be a permission issue:"
        );
        console.error(
          "   1. Make sure the spreadsheet is shared with:",
          serviceAccountEmail
        );
        console.error(
          "   2. Service account should have 'Editor' role, not just 'Viewer'"
        );
      }

      if (
        loadError instanceof Error &&
        loadError.message.includes("404") &&
        loadError.message.includes("Not Found")
      ) {
        console.error(
          "[Survey API] 📋 Spreadsheet not found. Check GOOGLE_SHEET_ID:"
        );
        console.error("   Your GOOGLE_SHEET_ID:", sheetId);
      }

      return NextResponse.json(
        {
          error: "Failed to access spreadsheet",
          debug: loadError instanceof Error ? loadError.message : String(loadError),
        },
        { status: 500 }
      );
    }

    // ─── Step 8: Get or Create Sheet ─────────────────────────────────────
    console.log("[Survey API] Getting or creating sheet...");

    let sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      console.log("[Survey API] No sheets found, creating new sheet...");
      try {
        sheet = await doc.addSheet({ title: "Survey Responses" });
        console.log("[Survey API] ✓ New sheet created");
      } catch (sheetCreateError) {
        console.error(
          "[Survey API] ❌ Failed to create sheet:",
          sheetCreateError
        );
        return NextResponse.json(
          {
            error: "Failed to create sheet in spreadsheet",
            debug:
              sheetCreateError instanceof Error
                ? sheetCreateError.message
                : String(sheetCreateError),
          },
          { status: 500 }
        );
      }
    } else {
      console.log(
        "[Survey API] ✓ Using existing sheet:",
        sheet.title || "(untitled)"
      );
    }

    // ─── Step 9: Set Headers or Verify Them ──────────────────────────────
    console.log("[Survey API] Checking sheet headers...");

    const expectedHeaders = [
      "Timestamp",
      "Nama/Inisial",
      "Rentang Usia",
      "Tingkat Pemahaman",
      "Kritik & Saran",
    ];

    try {
      if (sheet.rowCount === 0) {
        console.log("[Survey API] Sheet is empty, setting headers...");
        await sheet.setHeaderRow(expectedHeaders);
        console.log("[Survey API] ✓ Headers created:", expectedHeaders);
      } else {
        console.log(
          "[Survey API] ✓ Sheet has existing data, row count:",
          sheet.rowCount
        );
      }
    } catch (headerError) {
      console.error("[Survey API] ❌ Failed to set/verify headers:", headerError);
      return NextResponse.json(
        {
          error: "Failed to configure sheet headers",
          debug:
            headerError instanceof Error ? headerError.message : String(headerError),
        },
        { status: 500 }
      );
    }

    // ─── Step 10: Add Row with Survey Data ───────────────────────────────
    console.log("[Survey API] Adding new row to sheet...");

    const timestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    try {
      await sheet.addRow({
        Timestamp: timestamp,
        "Nama/Inisial": body.namaInisial.trim(),
        "Rentang Usia": body.rentangUsia,
        "Tingkat Pemahaman": body.tingkatPemahaman,
        "Kritik & Saran": body.kritekSaran.trim(),
      });

      console.log("[Survey API] ✓ Row added successfully");
      console.log("[Survey API] Timestamp:", timestamp);
    } catch (rowError) {
      console.error("[Survey API] ❌ Failed to add row:", rowError);
      return NextResponse.json(
        {
          error: "Failed to save survey response",
          debug: rowError instanceof Error ? rowError.message : String(rowError),
        },
        { status: 500 }
      );
    }

    // ─── Step 11: Success Response ──────────────────────────────────────
    console.log(
      "[Survey API] ✅ Survey submitted successfully! Data saved to Google Sheets."
    );

    return NextResponse.json(
      {
        success: true,
        message: "Data survei berhasil tersimpan",
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Survey API] ❌ Unexpected Error:", error);
    console.error(
      "[Survey API] Error Stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );

    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan saat menyimpan data",
        debug:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : "Enable NODE_ENV=development for more details",
      },
      { status: 500 }
    );
  }
}
