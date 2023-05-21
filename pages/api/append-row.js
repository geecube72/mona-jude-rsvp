import { google } from "googleapis";
import { authorize, SHEET_ID } from "../../helpers/google-setup";
import credentials from "../../credentials.json";
import { SHEET_NAME } from "../../helpers/constants";

const appendRow = (req, res) => (auth) => {
  const sheets = google.sheets({ version: "v4", auth });

  sheets.spreadsheets.values.append(
    {
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:B2`,
      resource: {
        values: req.body.guestData,
      },
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "USER_ENTERED",
    },
    (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(result.data);
    }
  );
};

export default function AppendRow(req, res) {
  authorize(credentials, appendRow(req, res));
}
