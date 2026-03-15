/**
 * GitHubAPI.gs — Helper functions for interacting with the GitHub Contents API
 */

/**
 * Get file content from GitHub
 */
function getFileFromGitHub(config, path) {
  const url = `https://api.github.com/repos/${config.GITHUB_OWNER}/${config.GITHUB_REPO}/contents/${path}`;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() === 200) {
    const data = JSON.parse(response.getContentText());
    return Utilities.newBlob(Utilities.base64Decode(data.content)).getDataAsString();
  }
  return null;
}

/**
 * Get file SHA from GitHub (needed for updates)
 */
function getFileShaFromGitHub(config, path) {
  const url = `https://api.github.com/repos/${config.GITHUB_OWNER}/${config.GITHUB_REPO}/contents/${path}`;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() === 200) {
    const data = JSON.parse(response.getContentText());
    return data.sha;
  }
  return null;
}

/**
 * Commit (create or update) a file to the GitHub repository
 */
function commitFileToGitHub(config, path, content, message) {
  const url = `https://api.github.com/repos/${config.GITHUB_OWNER}/${config.GITHUB_REPO}/contents/${path}`;

  // Get existing file SHA (required for updates)
  const sha = getFileShaFromGitHub(config, path);

  const payload = {
    message: message || `chore: update ${path}`,
    content: Utilities.base64Encode(content),
    branch: 'main',
  };

  if (sha) {
    payload.sha = sha;
  }

  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${config.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();

  if (code === 200 || code === 201) {
    Logger.log(`✅ Committed: ${path}`);
  } else {
    Logger.log(`❌ Failed to commit ${path}: ${code} - ${response.getContentText()}`);
  }

  return code;
}
