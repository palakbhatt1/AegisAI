import { google } from "googleapis";
import fs from "fs";

let sheets: any = null;
try {
  let credentials;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  } else {
    credentials = JSON.parse(
      fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE!, "utf-8")
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheets = google.sheets({
    version: "v4",
    auth,
  });
} catch (e) {
  console.warn("Google Sheets integration disabled: missing or invalid service account key file.");
}

export async function logToSheets(incident: any) {
  if (!sheets) return;
  const values = [[
    incident.incident_id ?? "",
    new Date().toISOString(),
    incident.severity ?? "",
    incident.failure_type ?? "",
    incident.root_cause ?? "",
    incident.evidence ? JSON.stringify(incident.evidence) : "None",
    typeof incident.suggested_fix === 'object' ? incident.suggested_fix.description : (incident.suggested_fix ?? ""),
    incident.status ?? "Open",
  ]];

  return sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Sheet1!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

export async function getIncidentsFromSheets() {
  if (!sheets) return [];
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Sheet1!A:H",
  });

  return response.data.values ?? [];
}

export async function updateIncidentInSheets(incident: any) {
  if (!sheets) return;
  const rows = await getIncidentsFromSheets();

  const rowIndex = rows.findIndex(
    (row: string[]) => row[0] === incident.incident_id
  );

  if (rowIndex === -1) {
    return logToSheets(incident);
  }

  return sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `Sheet1!H${rowIndex + 1}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[incident.status ?? "Open"]],
    },
  });
}

export const updateSheets = updateIncidentInSheets;
