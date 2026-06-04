# 🔧 Google Sheets Integration - Troubleshooting & Debugging Guide

## ⚠️ Debugging: How to Check Errors

### 1. View Server Logs
Your Next.js development server (run with `npm run dev`) will now show **detailed step-by-step logs** when form is submitted.

**Look for these patterns in terminal:**
```
[Survey API] ✓ Environment variables validated
[Survey API] ✓ Private key parsed successfully
[Survey API] ✓ JWT created successfully
[Survey API] ✓ Spreadsheet loaded
[Survey API] ✅ Survey submitted successfully!
```

**If you see ❌ instead of ✓, read the error message immediately below it.**

### 2. Common Error Messages & Fixes

#### Error: `❌ GOOGLE_SERVICE_ACCOUNT_EMAIL is not set`
**Problem:** Environment variable not found  
**Fix:**
- ✅ Check `.env.local` file exists in project root
- ✅ Line format: `GOOGLE_SERVICE_ACCOUNT_EMAIL=cerita-survey-bot@cerita-survey.iam.gserviceaccount.com`
- ✅ No quotes needed
- ✅ Restart `npm run dev` after editing `.env.local`

#### Error: `❌ GOOGLE_PRIVATE_KEY is not set`
**Problem:** Private key environment variable not found  
**Fix:** See section "3️⃣ .env.local Format" below for exact formatting

#### Error: `❌ Private key format invalid. Missing PEM markers`
**Problem:** Private key wasn't properly copied from JSON  
**Fix:**
- ✅ Private key MUST start with `-----BEGIN PRIVATE KEY-----`
- ✅ Private key MUST end with `-----END PRIVATE KEY-----`
- ✅ Must have literal `\n` in the string (NOT real newlines)

#### Error: `🔐 403 Forbidden - Permission issue`
**Problem:** Service account can't access spreadsheet  
**Fix:**
- ✅ Go to your Google Sheet
- ✅ Click "Share" (top right)
- ✅ Add email: `cerita-survey-bot@cerita-survey.iam.gserviceaccount.com`
- ✅ Set role to **"Editor"** (not "Viewer")
- ✅ Click "Share"

#### Error: `📋 404 Not Found - Spreadsheet not found`
**Problem:** GOOGLE_SHEET_ID is wrong or sheet deleted  
**Fix:**
- ✅ Open your Google Sheet
- ✅ Copy ID from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
- ✅ Update `.env.local` with correct ID
- ✅ Restart dev server

---

## 3️⃣ .env.local Format (CRITICAL)

### Location
Place `.env.local` **in the project root directory** (same level as `package.json`)

```
cerita-app/
├── .env.local              ← HERE
├── package.json
├── src/
│   ├── app/
│   │   └── api/
│   │       └── submit-survey/
│   │           └── route.ts
├── tsconfig.json
└── ...
```

### Exact Format

**From JSON file, you have:**
```json
{
  "client_email": "cerita-survey-bot@cerita-survey.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG...\n-----END PRIVATE KEY-----\n",
  ...
}
```

**Copy to `.env.local` like this:**

```env
# Google Sheets Integration (Survey Form)
GOOGLE_SERVICE_ACCOUNT_EMAIL=cerita-survey-bot@cerita-survey.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+TqFifumjBUux\nriV32RWmNskW3SIa0iHNWv7mRVIX87n0W7DPSRKKS0fMy0zhQae1POuLVf4b2GqT\nTqJBwokW14MPDthKRBQEKlDgH1ryL6MYc10Z1xQYhY4/mQ2QZIT3MxI4+viNaiyi\nj/QtG2DEsGNTDz+pOBHC+1HGHhcN51YysvhBLlOCIe1z7cUiFp9aARBRO+D9UH4j\ncuu2KxGTSuFQTMN2DgU7PJc237TGdqxQkqmiVPlu1NYNZjg08zMiTnAZlgeL/jdi\nufXs/OYzLRTrjm0Fsh//QtQEoT8M58WmtLw6s2W547W4oq7XxWABnGPuuDqLSZcg\nE3ZpsL//AgMBAAECggEAAabCBlsU+onehpV8+r8pNAhWrC2edz6EKSy7q7jfRcwi\n79vNB+EM8zx3zFWmGAno6cA0SEDzRwxhasZsaKCtB6ppsNUPcgZVz1SkrGucb1L6\nTQlQ15tC4xTJnFCryilGvbRopiwhwWxlJCkwOvH5X+Uqv3sRS0EfmlVyKx0L7l49\nmkeVVtXgi5oQDeNGPuB5vvvrjrSO2C7cpJpuAD/qfJIBD9SvtGpPLWZOTOem9cfB\n8kof/Po7mj8zQUwUeRg9YvisLunUjdxubFuTvc0YrzvMIxAK0foBAn66bKVHrSeY\nWnsrf4JkTTKD0v/mIOx0ABaOKlLLFHQFiNFXcq5tSQKBgQDsuM/PwlK2rFC1Nt/p\nid23yE1/ZNNOyzIdeWqbPtBk2Zh+pf1QKFewbIit7BPti22Z5GDCa7HVJxcuyIOj\nA/W4zqZ1Nkc4rVOz/wAe2yhGt2PXP4flVBK2zAdHg2dqVoH+p5wS7nLZ9bt5f3Ss\nooPWtZBa1l7FTrSmsvHkg++cSQKBgQDNzilffs4080DgZD/PMUN5B9X73hY3YdTm\nx4eR1lP/BNS3o0QuP/nych1WFqUgTPGEYRbQb003mc1F0Bm9T6O5+Q84P+XB/9k+\n7T8VsfoJb2pFyupEs/9jkt9N8h8VBfOpKYjwHZ8HBaWAjKwJq5vHzePbr0IX/WFQ\nBTPQ/4OqBwKBgB/1k5jpE2G2Qe81SWWuR1DYqh3Y7u5kYI+6JLpw8JGtDvmKT3jS\n+YPII2vXw5j+if2M58NX5tpwPKEEUUFg93vL6o1IlrUAMZzLgKipzfY+LCyTVzWO\n9DfZs+Hjy8J/i21mE5w6tSbYFkeA/a+RAVurh6G772+UAK/A2QeRCHiBAoGBAKWX\nOqzOf6YVD1886iaQccShLGhSYje/bKkfZBJQjBcF0Q3MvOAls7uCW95XrBcYMb+c\nytl8pHmXM5X3ga5TtN2+6qMMrpXwgODjzT1sjU0oKy7qvKH43gVFOI0jwiSNPGcg\nt0DT5I+m2GpdRVMmk9oo7CxnkFtzEOhstytzW4HjAoGBAMIB+I59V1496PIAvjJ2\nVudCHsSAiuqm0Gp7H2HuBxwcYIDm7RNeUxFkL2wyLBzzrbQum2XgyZX/iIV/VBC8\nsDa5EfGe1RaL76S7vMt4TxqjR9ftW4FhCgxPWAzsLegHNBJSQ78ufCyYedr2/9Fr\nJNOAxkThUb28yiVAlR5kAa68\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
```

### Key Rules:
- ✅ **Line 1**: `GOOGLE_SERVICE_ACCOUNT_EMAIL=` + email (no quotes)
- ✅ **Line 2**: `GOOGLE_PRIVATE_KEY="` + full key + `"`
- ✅ **Line 3**: `GOOGLE_SHEET_ID=` + ID (no quotes)
- ✅ **Keep literal `\n` in the private key** (do NOT replace with real newlines!)
- ✅ **Use double quotes** around private key value
- ✅ **No spaces** around `=`

### How to Copy Private Key Without Mistakes:

**Step 1:** Open JSON file (`cerita-survey-0c8ef6d95658.json`)  
**Step 2:** Find the `"private_key"` field  
**Step 3:** Copy the **entire value** (including quotes) from JSON  
**Step 4:** In `.env.local`, paste between `GOOGLE_PRIVATE_KEY=` and newline  
**Step 5:** Make sure it starts with `"-----BEGIN` and ends with `-----\n"`

---

## ✅ Pre-Flight Checklist

Before submitting form, run through this:

### 1. Environment Setup ✓
- [ ] `.env.local` file exists in project root
- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` is set (check by: `cat .env.local`)
- [ ] `GOOGLE_PRIVATE_KEY` contains full private key starting with `-----BEGIN`
- [ ] `GOOGLE_SHEET_ID` is set
- [ ] No quotes around `GOOGLE_SERVICE_ACCOUNT_EMAIL` or `GOOGLE_SHEET_ID`
- [ ] Private key IS wrapped in double quotes

### 2. Google Cloud Setup ✓
- [ ] Service Account created in Google Cloud Console
- [ ] Google Sheets API enabled (APIs & Services → Library)
- [ ] Service Account has JSON key downloaded

### 3. Google Sheets Setup ✓
- [ ] Spreadsheet created with name like "CERITA Survey Responses"
- [ ] Spreadsheet shared with service account email
- [ ] Service account role is "Editor" (NOT "Viewer")
- [ ] Sheet ID copied correctly from URL

### 4. Code Setup ✓
- [ ] Backend route exists: `src/app/api/submit-survey/route.ts`
- [ ] Frontend has submit handler that calls `/api/submit-survey`
- [ ] Dev server restarted after `.env.local` changes: `Ctrl+C` then `npm run dev`

### 5. Test Submission ✓
- [ ] Fill out all form fields
- [ ] Click "Kirim Jawaban"
- [ ] Check terminal for `[Survey API]` logs
- [ ] Look for `✅ Survey submitted successfully!`
- [ ] Check Google Sheet - new row should appear

---

## 🔍 Debug Mode: Advanced

To see full error details even in production:

**Temporarily set:**
```env
NODE_ENV=development
```

This will show more detailed error messages in API responses.

---

## 📞 Quick Reference: Common Fixes

| Issue | Fix |
|-------|-----|
| 401/403 Auth Error | Share sheet with service account as Editor |
| Private key error | Check quotes and `\n` (not real newlines) |
| Sheet not found | Copy correct GOOGLE_SHEET_ID from URL |
| Server config error | Restart dev server: `Ctrl+C` then `npm run dev` |
| Form says "Mengirim..." forever | Check browser console (F12) for errors |
| No logs in terminal | Make sure dev server is running with `npm run dev` |

---

## 🎯 Success Indicators

When everything works, you should see:

**Terminal Output:**
```
[Survey API] ✓ Environment variables validated
[Survey API] ✓ Private key parsed successfully
[Survey API] ✓ JWT created successfully
[Survey API] ✓ Spreadsheet loaded. Title: CERITA Survey Responses
[Survey API] ✓ Using existing sheet: Survey Responses
[Survey API] ✓ Sheet has existing data, row count: 5
[Survey API] ✓ Row added successfully
[Survey API] Timestamp: 30/5/2026, 14:32:45
[Survey API] ✅ Survey submitted successfully! Data saved to Google Sheets.
```

**Frontend:** Shows "Terima Kasih!" screen with animated checkmark

**Google Sheet:** New row with data appears
