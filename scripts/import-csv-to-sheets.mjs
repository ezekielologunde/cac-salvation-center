/**
 * Reads the old Formspree CSV export and POSTs each row to the
 * SHEETS_WEBHOOK so they land in Google Sheets in the same format
 * as live contact-form submissions.
 *
 * Usage:
 *   node scripts/import-csv-to-sheets.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CSV_PATH = resolve(ROOT, 'responses-e5C5UBjm-01KVRASTJFJYZKK2VW6RN2BVNR-ZJS8Z5V2FW8HXT5WVK8QKS68.csv');
const DELAY_MS = 350; // pause between posts to avoid Apps Script rate limits

// ---------------------------------------------------------------------------
// Read SHEETS_WEBHOOK from .env.local
// ---------------------------------------------------------------------------
function getWebhookUrl() {
  try {
    const env = readFileSync(resolve(ROOT, '.env.local'), 'utf8');
    const match = env.match(/^SHEETS_WEBHOOK="?([^"\n]+)"?/m);
    if (match?.[1]) return match[1].trim();
  } catch { /* no .env.local */ }
  return process.env.SHEETS_WEBHOOK ?? null;
}

// ---------------------------------------------------------------------------
// Minimal RFC 4180 CSV parser (handles quoted fields + embedded commas)
// ---------------------------------------------------------------------------
function parseCsvLine(line) {
  const fields = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"' && !inQ) { inQ = true; continue; }
    if (c === '"' && inQ && line[i + 1] === '"') { cur += '"'; i++; continue; }
    if (c === '"' && inQ) { inQ = false; continue; }
    if (c === ',' && !inQ) { fields.push(cur); cur = ''; continue; }
    cur += c;
  }
  fields.push(cur);
  return fields;
}

function parseCsv(text) {
  const lines = text.replace(/\r\n/g, '\n').trim().split('\n');
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const vals = parseCsvLine(line);
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (vals[i] ?? '').trim()]));
  });
}

// ---------------------------------------------------------------------------
// Map a CSV row → webhook payload
// ---------------------------------------------------------------------------
function toPayload(row) {
  const firstName = row['First name'] ?? '';
  const lastName  = row['Last name']  ?? '';
  const name = [firstName, lastName].filter(Boolean).join(' ');

  const addressParts = [
    row['Address'],
    row['Address line 2'],
    row['City/Town'],
    row['State/Region/Province'],
    row['Zip/Post Code'],
    row['Country'],
  ].map(s => s?.trim()).filter(Boolean);

  const payload = {
    formName: 'Historical Contact Form',
    name,
    email:   row['Email'],
    phone:   row['Phone number'],
    address: addressParts.join(', '),
    date:    row['Submit Date (UTC)'],
    groups:  row['Groups'],
    note:    row['Other'],
  };

  // Drop empty keys so the sheet stays tidy
  for (const k of Object.keys(payload)) {
    if (!payload[k]) delete payload[k];
  }

  return payload;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) {
    console.error('Error: SHEETS_WEBHOOK not found in .env.local or environment.');
    process.exit(1);
  }

  let csv;
  try {
    csv = readFileSync(CSV_PATH, 'utf8');
  } catch {
    console.error(`Error: CSV file not found at:\n  ${CSV_PATH}`);
    process.exit(1);
  }

  const rows = parseCsv(csv);
  console.log(`Importing ${rows.length} rows → ${webhookUrl}\n`);

  let ok = 0, fail = 0;

  for (let i = 0; i < rows.length; i++) {
    const payload = toPayload(rows[i]);
    const label = payload.name || `row ${i + 1}`;

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok) {
        ok++;
        console.log(`  ✓ [${i + 1}/${rows.length}] ${label}`);
      } else {
        fail++;
        console.error(`  ✗ [${i + 1}/${rows.length}] ${label} — HTTP ${res.status}`);
      }
    } catch (err) {
      fail++;
      console.error(`  ✗ [${i + 1}/${rows.length}] ${label} — ${err.message}`);
    }

    if (i < rows.length - 1) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  console.log(`\nDone — ${ok} imported, ${fail} failed`);
}

main();
