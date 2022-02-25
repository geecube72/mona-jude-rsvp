import fs from 'fs'
import { google } from 'googleapis';
import { authorize, SHEET_ID } from '../../helpers/google-setup';

const updateRow = (req, res) => (auth) => {
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

  sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `Sheet1!B${column}`,
    resource: {
      values: [
        [req.body.going === '1' ? 'Yes' : 'No']
      ]
    },
    valueInputOption: 'USER_ENTERED'
  }, (err, result) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(result.data)
  });
}

export default (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status(403).json({
      error: true,
      message: 'Invalid method.'
    })
  }

  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), updateRow(req, res));
  });
}