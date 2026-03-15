/**
 * SyncLocales.gs — Reads the localization Google Sheet and commits per-language
 * JSON files to the GitHub repository.
 *
 * Expected sheet layout:
 *   Row 1 (header):  key | en | de | fr | ...
 *   Row 2+:          translation keys and their values per language
 */

function syncLocales() {
  const config = getConfig();
  const sheet = SpreadsheetApp.openById(config.SHEET_ID).getSheetByName('Localization');
  if (!sheet) {
    Logger.log('ERROR: "Localization" sheet not found');
    return;
  }

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    Logger.log('Sheet is empty or has no data rows');
    return;
  }

  const headers = data[0]; // [key, en, de, fr, ...]
  const languages = headers.slice(1).filter(h => h.toString().trim() !== '');

  // Build per-language JSON objects
  const locales = {};
  languages.forEach(lang => { locales[lang] = {}; });

  for (let row = 1; row < data.length; row++) {
    const key = data[row][0];
    if (!key || key.toString().trim() === '') continue;

    for (let col = 1; col < headers.length; col++) {
      const lang = headers[col];
      if (!lang || lang.toString().trim() === '') continue;
      const value = data[row][col] || '';
      locales[lang][key] = value.toString();
    }
  }

  // Commit each locale file to GitHub
  languages.forEach(lang => {
    const path = `public/locales/${lang}/common.json`;
    const content = JSON.stringify(locales[lang], null, 2);
    commitFileToGitHub(config, path, content, `chore: update ${lang} locale from Google Sheet`);
  });

  // Also update brochures.json languages array
  updateBrochuresLanguages(config, languages);

  Logger.log(`Synced locales for: ${languages.join(', ')}`);
}

/**
 * Updates just the languages array in brochures.json
 */
function updateBrochuresLanguages(config, languages) {
  const path = 'public/data/brochures.json';

  // Get existing brochures.json
  let existing = { languages: [], brochures: [] };
  try {
    const currentContent = getFileFromGitHub(config, path);
    if (currentContent) {
      existing = JSON.parse(currentContent);
    }
  } catch (e) {
    Logger.log('No existing brochures.json, creating new');
  }

  existing.languages = languages;
  const content = JSON.stringify(existing, null, 2);
  commitFileToGitHub(config, path, content, 'chore: update available languages');
}
