// src/app/api/submit-survey/route.ts
import { NextResponse } from "next/server";

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

// ── Google Auth: get access token via service account JWT ──
// ponytail: hand-roll JWT token instead of importing google-auth-library (saves cold start time on serverless)
async function getAccessToken(email: string, privateKeyPem: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));

  const unsigned = `${header}.${payload}`;
  
  // Import the private key and sign
  const keyData = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  
  const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsigned)
  );

  // Base64url encode the signature
  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const jwt = `${header}.${payload}.${sig}`;

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${tokenRes.status}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

// ponytail: cache access token in module scope — reused across warm invocations, 1 fewer API call per request
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getCachedToken(email: string, key: string): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.token;
  }
  const token = await getAccessToken(email, key);
  cachedToken = { token, expiresAt: now + 3500_000 }; // ~58 min
  return token;
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
    const kelas = isValidAnswer(dataDiri.kelas, ["XI 1", "XI 2", "XI 5"]) ? dataDiri.kelas : "";
    const jenisKelamin = isValidAnswer(dataDiri.jenisKelamin, ["L", "P"]) ? dataDiri.jenisKelamin : "";

    if (!nama || !jenisKelamin || !kelas) {
      return NextResponse.json({ success: false, message: "Data diri tidak lengkap" }, { status: 400 });
    }

    // ── Validate pengetahuan (p1..p24 must be "B" or "S") ──
    const BS = ["B", "S"] as const;
    const pengetahuanVals: string[] = [];
    for (let i = 1; i <= 24; i++) {
      const val = pengetahuan[`p${i}`];
      if (!isValidAnswer(val, BS)) {
        return NextResponse.json(
          { success: false, message: `Soal pengetahuan ${i} belum dijawab atau tidak valid` },
          { status: 400 }
        );
      }
      pengetahuanVals.push(val);
    }

    // ── Validate sikap (s1..s23 must be "SS"/"S"/"TS"/"STS") ──
    const LIKERT = ["SS", "S", "TS", "STS"] as const;
    const sikapVals: string[] = [];
    for (let i = 1; i <= 23; i++) {
      const val = sikap[`s${i}`];
      if (!isValidAnswer(val, LIKERT)) {
        return NextResponse.json(
          { success: false, message: `Soal sikap ${i} belum dijawab atau tidak valid` },
          { status: 400 }
        );
      }
      sikapVals.push(val);
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

    const privateKey = key.replace(/\\n/g, "\n");
    const accessToken = await getCachedToken(email, privateKey);

    // ── Build row as flat array of values ──
    const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    const rowValues = [timestamp, nama, jenisKelamin, kelas, ...pengetahuanVals, ...sikapVals];

    // ── Single API call: append row via Google Sheets REST API ──
    // ponytail: 1 API call vs 3 (loadInfo + loadHeaderRow + addRow). This is the root cause fix.
    const MAX_RETRIES = 3;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
      
      const res = await fetch(appendUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      });

      if (res.ok) {
        return NextResponse.json({ success: true });
      }

      // Rate limited or transient — retry
      if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES - 1) {
        const delay = 1000 * Math.pow(2, attempt) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // Non-retryable or final attempt
      const errBody = await res.text().catch(() => "");
      console.error(`Sheets API error (${res.status}):`, errBody);

      // Return 503 for retryable errors so client knows to retry
      if (res.status === 429 || res.status >= 500) {
        return NextResponse.json(
          { success: false, message: "Server sibuk, coba lagi.", retryable: true },
          { status: 503 }
        );
      }

      throw new Error(`Sheets API ${res.status}: ${errBody}`);
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