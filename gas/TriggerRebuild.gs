/**
 * TriggerRebuild.gs — Triggers a GitHub Actions workflow_dispatch to rebuild
 * and deploy the GitHub Pages site.
 */

function triggerRebuild() {
  const config = getConfig();
  const url = `https://api.github.com/repos/${config.GITHUB_OWNER}/${config.GITHUB_REPO}/actions/workflows/deploy.yml/dispatches`;

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    contentType: 'application/json',
    payload: JSON.stringify({ ref: 'main' }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();

  if (code === 204) {
    Logger.log('✅ GitHub Pages rebuild triggered');
  } else {
    Logger.log(`❌ Failed to trigger rebuild: ${code} - ${response.getContentText()}`);
  }

  return code;
}
