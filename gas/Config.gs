/**
 * Stillhilfe — Google Apps Script Configuration
 *
 * Store these values in Script Properties (File → Project properties → Script properties):
 *   GITHUB_TOKEN      – GitHub PAT with repo scope
 *   GITHUB_OWNER      – GitHub username (e.g. "samuosa")
 *   GITHUB_REPO       – Repository name (e.g. "stillhilfe")
 *   SHEET_ID          – Google Sheet ID for localization
 *   DRIVE_FOLDER_ID   – Google Drive folder ID containing PDFs
 */

function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    GITHUB_TOKEN: props.getProperty('GITHUB_TOKEN'),
    GITHUB_OWNER: props.getProperty('GITHUB_OWNER') || 'samuosa',
    GITHUB_REPO: props.getProperty('GITHUB_REPO') || 'stillhilfe',
    SHEET_ID: props.getProperty('SHEET_ID') || '1kyXidRdkcOnS4hHZGo_HHwelbmyIuw8uI5oNCwTe7QA',
    DRIVE_FOLDER_ID: props.getProperty('DRIVE_FOLDER_ID') || '1TGG14H7u_uogxIscIQBVbxDVUi_1_mVG',
  };
}
