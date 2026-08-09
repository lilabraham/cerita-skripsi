// src/app/api/submit-survey/route.ts
import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// ── Simple sanitizer: strip to plain text, cap length ──
function sanitize(val: unknown, maxLen = 200): string {
  if (typeof val !== "string") return "";
  return val.replace(/[<>"'&]/g, "").trim().slice(0, maxLen);
}

function isValidAnswer(val: unknown, allowed: readonly string[]): boolean {
  return typeof val === "string" && allowed.includes(val);
}

// ── Rate limit: simple in-memory per-IP window ──
const submissions = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 150;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let timestamps = submissions.get(ip) ?? [];
  
  // Remove timestamps older than the rate window
  timestamps = timestamps.filter(t => now - t < RATE_WINDOW_MS);
  
  if (timestamps.length >= RATE_MAX) {
    return true;
  }
  
  timestamps.push(now);
  submissions.set(ip, timestamps);
  
  // Cleanup old entries periodically to prevent memory leaks
  if (submissions.size > 1000) {
    for (const [k, v] of submissions) {
      if (v.every(t => now - t >= RATE_WINDOW_MS)) {
        submissions.delete(k);
      }
    }
  }
  return false;
}

export async function POST(request: Request) {
  try {
    // ── Rate limit ──
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Terlalu banyak permintaan. Coba lagi nanti." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // ── Validate structure ──
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }
    const { dataDiri, pengetahuan, sikap } = body;

    if (!dataDiri || typeof dataDiri !== "object") {
      return NextResponse.json({ success: false, message: "Data diri tidak valid" }, { status: 400 });
    }
    if (!pengetahuan || typeof pengetahuan !== "object") {
      return NextResponse.json({ success: false, message: "Jawaban pengetahuan tidak valid" }, { status: 400 });
    }
    if (!sikap || typeof sikap !== "object") {
      return NextResponse.json({ success: false, message: "Jawaban sikap tidak valid" }, { status: 400 });
    }

    // ── Validate & sanitize data diri ──
    const nama = sanitize(dataDiri.nama, 100);
    const umur = sanitize(dataDiri.umur, 3);
    const kelas = sanitize(dataDiri.kelas, 20);
    const jenisKelamin = isValidAnswer(dataDiri.jenisKelamin, ["L", "P"]) ? dataDiri.jenisKelamin : "";

    if (!nama || !umur || !jenisKelamin || !kelas) {
      return NextResponse.json({ success: false, message: "Data diri tidak lengkap" }, { status: 400 });
    }

    // ── Validate pengetahuan (p1..p24 must be "B" or "S") ──
    const BS = ["B", "S"] as const;
    const pengetahuanCols: Record<string, string> = {};
    for (let i = 1; i <= 24; i++) {
      const key = `p${i}`;
      const val = pengetahuan[key];
      if (!isValidAnswer(val, BS)) {
        return NextResponse.json(
          { success: false, message: `Soal pengetahuan ${i} belum dijawab atau tidak valid` },
          { status: 400 }
        );
      }
      pengetahuanCols[`P${i}`] = val;
    }

    // ── Validate sikap (s1..s23 must be "SS"/"S"/"TS"/"STS") ──
    const LIKERT = ["SS", "S", "TS", "STS"] as const;
    const sikapCols: Record<string, string> = {};
    for (let i = 1; i <= 23; i++) {
      const key = `s${i}`;
      const val = sikap[key];
      if (!isValidAnswer(val, LIKERT)) {
        return NextResponse.json(
          { success: false, message: `Soal sikap ${i} belum dijawab atau tidak valid` },
          { status: 400 }
        );
      }
      sikapCols[`S${i}`] = val;
    }

    // ── Google Sheets auth ──
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!email || !key || !sheetId) {
      console.error("Missing Google Sheets env vars");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const auth = new JWT({
      email,
      key: key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ title: "Responses" });
    }

    // ── Build & append row ──
    const row = {
      Timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      Nama: nama,
      Umur: umur,
      JenisKelamin: jenisKelamin,
      Kelas: kelas,
      ...pengetahuanCols,
      ...sikapCols,
    };

    try {
      await sheet.loadHeaderRow();
    } catch {
      // If loadHeaderRow fails, it means the sheet is completely empty.
      const cols = Object.keys(row);
      // Ensure the sheet has enough columns to hold all our data (Google Sheets default is A-Z = 26 cols)
      if (sheet.columnCount < cols.length) {
        await sheet.resize({ rowCount: sheet.rowCount || 1000, columnCount: cols.length + 5 });
      }
      await sheet.setHeaderRow(cols);
    }

    let retries = 3;
    while (retries > 0) {
      try {
        await sheet.addRow(row);
        break;
      } catch (err: any) {
        if (err?.response?.status === 429 && retries > 1) {
          retries--;
          // Tunggu 1,5 detik sebelum mencoba lagi (Exponential backoff sederhana)
          await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
          throw err;
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // Log safely — never expose raw error to client
    console.error("Submit survey error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}