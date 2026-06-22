/**
 * Reads the old Formspree CSV export and POSTs each row to the
 * SHEETS_WEBHOOK so they land in Google Sheets in the same format
 * as live contact-form submissions.
 *
 * Usage:
 *   node scripts/import-csv-to-sheets.mjs
 *
 * Note: Google Apps Script exec URLs respond with a 302 redirect.
 * Node's fetch() changes POST → GET on a 302, silently dropping the body.
 * postToGAS() follows the redirect manually to keep the POST method + body.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CSV_PATH = resolve(ROOT, 'responses-e5C5UBjm-01KVRASTJFJYZKK2VW6RN2BVNR-ZJS8Z5V2FW8HXT5WVK8QKS68.csv');
const DELAY_MS = 400;

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
// POST to a Google Apps Script URL, handling the 302 redirect manually
// so the body isn't silently dropped.
// ---------------------------------------------------------------------------
async function postToGAS(url, payload) {
  const body = JSON.stringify(payload);
  const headers = { 'Content-Type': 'application/json' };

  // Step 1 — send POST, don't auto-follow redirects
  const res1 = await fetch(url, {
    method: 'POST',
    headers,
    body,
    redirect: 'manual',
    signal: AbortSignal.timeout(12_000),
  });

  // Step 2 — if GAS redirected (it always does), re-POST to the new URL
  if (res1.status === 301 || res1.status === 302 ||
      res1.status === 307 || res1.status === 308) {
    const location = res1.headers.get('location');
    if (!location) throw new Error(`Redirect with no Location header (HTTP ${res1.status})`);

    const res2 = await fetch(location, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(12_000),
    });
    return res2;
  }

  return res1;
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
      const res = await postToGAS(webhookUrl, payload);
      const text = await res.text().catch(() => '');

      if (res.ok) {
        ok++;
        console.log(`  ✓ [${i + 1}/${rows.length}] ${label}`);
      } else {
        fail++;
        console.error(`  ✗ [${i + 1}/${rows.length}] ${label} — HTTP ${res.status} — ${text.slice(0, 120)}`);
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
