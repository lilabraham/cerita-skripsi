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
    // Parse request body
    const body: SurveyData = await request.json();

    // Validate required fields
    if (!body.namaInisial || !body.rentangUsia || !body.tingkatPemahaman || !body.kritekSaran) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Validate environment variables
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create JWT authentication
    const jwt = new JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, "\n"), // Handle escaped newlines
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Initialize Google Sheets document
    const doc = new GoogleSpreadsheet(sheetId, jwt);

    // Load document metadata
    await doc.loadInfo();

    // Get the first sheet (or create one if needed)
    let sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      sheet = await doc.addSheet({ title: "Survey Responses" });
    }

    // Add headers if sheet is empty
    if (sheet.rowCount === 0) {
      await sheet.setHeaderRow([
        "Timestamp",
        "Nama/Inisial",
        "Rentang Usia",
        "Tingkat Pemahaman",
        "Kritik & Saran",
      ]);
    }

    // Add new row with survey data
    const timestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    await sheet.addRow({
      Timestamp: timestamp,
      "Nama/Inisial": body.namaInisial,
      "Rentang Usia": body.rentangUsia,
      "Tingkat Pemahaman": body.tingkatPemahaman,
      "Kritik & Saran": body.kritekSaran,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Data survei berhasil tersimpan",
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Survey submission error:", error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan data",
      },
      { status: 500 }
    );
  }
}
