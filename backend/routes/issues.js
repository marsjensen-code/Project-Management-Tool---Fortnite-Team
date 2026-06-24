const express = require('express');
const router = express.Router();
const IssueSync = require('../services/issueSync');
const { validateAuth } = require('../middleware/auth');

const issueSync = new IssueSync();

// Sync GitHub issue to Jira
router.post('/sync/github-to-jira', validateAuth, async (req, res) => {
  try {
    const { githubIssueUrl } = req.body;
    const result = await issueSync.syncGitHubToJira(githubIssueUrl);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync Jira issue to GitHub
router.post('/sync/jira-to-github', validateAuth, async (req, res) => {
  try {
    const { jiraIssueKey } = req.body;
    const result = await issueSync.syncJiraToGithub(jiraIssueKey);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sync status
router.get('/sync/status/:id', validateAuth, async (req, res) => {
  try {
    const status = await issueSync.getSyncStatus(req.params.id);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all synced issues
router.get('/sync/list', validateAuth, async (req, res) => {
  try {
    const syncedIssues = await issueSync.listSyncedIssues();
    res.json(syncedIssues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
