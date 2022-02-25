import { google } from 'googleapis';
import { authorize, SHEET_ID } from '../../helpers/google-setup';
import credentials from '../../credentials.json'

const getRow = (req, res) => (auth) => {
  const sheets = google.sheets({ version: 'v4', auth });
  let column;

  switch (req.query.column) {
    case 'B2':
      column = '2';
      break;
    case 'B3':
      column = '3';
      break
    default:
      column = req.query.column
      break;
  }

  sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `Sheet1!A${column}:B${column}`,
  }, (err, result) => {
    if (err) return res.status(500).json(err);

    if (req.query.names !== result.data.values[0][0]) {
      return res.status(400).json({ error: true, message: 'Not in the list.' })
    }

    return res.status(200).json(result.data)
  });
}

export default function GetRow(req, res) {
  authorize(credentials, getRow(req, res));
}