/**
 * Triggers.gs — Installable triggers for the Stillhilfe automation.
 *
 * Run setupTriggers() once manually to install:
 *   1. onEdit trigger for the Localization sheet → sync locales + rebuild
 *   2. Daily time-driven trigger → scan /pdfs folder for new uploads + rebuild
 */

/**
 * Run this function ONCE manually to set up triggers.
 */
function setupTriggers() {
  // Clear existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));

  const config = getConfig();

  // 1. onEdit trigger for the localization spreadsheet
  ScriptApp.newTrigger('onSheetEdit')
    .forSpreadsheet(config.SHEET_ID)
    .onEdit()
    .create();

  // 2. Daily time-driven trigger for scanning /pdfs folder
  ScriptApp.newTrigger('onDailySync')
    .timeBased()
    .everyDays(1)
    .atHour(3)  // Run at 3 AM
    .create();

  Logger.log('✅ Triggers set up successfully');
  Logger.log('   - onSheetEdit: fires on spreadsheet edits');
  Logger.log('   - onDailySync: fires daily at 3 AM');
}

/**
 * Triggered when the localization spreadsheet is edited.
 * Syncs locale files and triggers a rebuild.
 */
function onSheetEdit(e) {
  // Debounce: only run if the edit was on the "Localization" sheet
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== 'Localization') return;

  Logger.log('Sheet edit detected on Localization sheet');

  try {
    syncLocales();
    triggerRebuild();
    Logger.log('✅ Locale sync + rebuild triggered after sheet edit');
  } catch (err) {
    Logger.log(`❌ Error in onSheetEdit: ${err.message}`);
  }
}

/**
 * Daily trigger: scans the /pdfs folder for changes and syncs.
 */
function onDailySync() {
  Logger.log('Daily sync started');

  try {
    const brochureCount = syncBrochures();
    syncLocales();  // Also sync locales to ensure consistency
    triggerRebuild();
    Logger.log(`✅ Daily sync complete: ${brochureCount} brochures`);
  } catch (err) {
    Logger.log(`❌ Error in onDailySync: ${err.message}`);
  }
}

/**
 * Manual trigger: run full sync (useful for testing)
 */
function runFullSync() {
  Logger.log('=== Full Sync Started ===');
  syncLocales();
  syncBrochures();
  triggerRebuild();
  Logger.log('=== Full Sync Complete ===');
}
