/**
 * SyncBrochures.gs — Scans the Google Drive /pdfs folder for PDF files
 * and commits an updated brochures.json to the GitHub repository.
 *
 * Filename convention:  <title>_<language>.pdf
 *   e.g. "breastfeeding_basics_en.pdf" → title: "breastfeeding basics", language: "en"
 *   e.g. "stillberatung_de.pdf"        → title: "stillberatung", language: "de"
 *
 * If no language suffix is found, defaults to "en".
 */

function syncBrochures() {
  const config = getConfig();
  const folder = DriveApp.getFolderById(config.DRIVE_FOLDER_ID);
  const files = folder.getFilesByType(MimeType.PDF);

  const brochures = [];
  let idx = 0;

  while (files.hasNext()) {
    const file = files.next();
    const filename = file.getName();
    const parsed = parseFilename(filename);

    // Make the file publicly accessible via link
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {
      Logger.log(`Could not set sharing for ${filename}: ${e.message}`);
    }

    brochures.push({
      id: `brochure-${idx}`,
      filename: filename,
      title: parsed.title,
      language: parsed.language,
      pdfUrl: `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`,
      size: formatBytes(file.getSize()),
      lastUpdated: file.getLastUpdated().toISOString(),
    });
    idx++;
  }

  // Get existing languages from brochures.json to preserve them
  const path = 'public/data/brochures.json';
  let languages = ['en', 'de'];
  try {
    const currentContent = getFileFromGitHub(config, path);
    if (currentContent) {
      const existing = JSON.parse(currentContent);
      if (existing.languages && existing.languages.length > 0) {
        languages = existing.languages;
      }
    }
  } catch (e) {
    // Use defaults
  }

  const content = JSON.stringify({ languages: languages, brochures: brochures }, null, 2);
  const sha = getFileShaFromGitHub(config, path);
  commitFileToGitHub(config, path, content, `chore: sync brochures (${brochures.length} files)`);

  Logger.log(`Synced ${brochures.length} brochures`);
  return brochures.length;
}

/**
 * Parse filename into title and language.
 * Convention: <words>_<lang>.pdf  (lang is a 2-letter code)
 */
function parseFilename(filename) {
  const name = filename.replace(/\.pdf$/i, '');
  const parts = name.split('_');

  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1].toLowerCase();
    // Check if last part looks like a language code (2-3 letters)
    if (/^[a-z]{2,3}$/.test(lastPart)) {
      return {
        title: parts.slice(0, -1).join(' '),
        language: lastPart,
      };
    }
  }

  return {
    title: name.replace(/_/g, ' '),
    language: 'en',
  };
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
