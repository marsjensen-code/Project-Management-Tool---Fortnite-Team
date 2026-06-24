const express = require('express');
const router = express.Router();
const GitHubService = require('../services/githubService');
const { validateAuth } = require('../middleware/auth');

const githubService = new GitHubService();

// Get all repositories
router.get('/repos', validateAuth, async (req, res) => {
  try {
    const repos = await githubService.listRepositories();
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get repository details
router.get('/repos/:owner/:repo', validateAuth, async (req, res) => {
  try {
    const repo = await githubService.getRepository(req.params.owner, req.params.repo);
    res.json(repo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get GitHub issues
router.get('/repos/:owner/:repo/issues', validateAuth, async (req, res) => {
  try {
    const { state, labels } = req.query;
    const issues = await githubService.getIssues(req.params.owner, req.params.repo, { state, labels });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create GitHub issue
router.post('/repos/:owner/:repo/issues', validateAuth, async (req, res) => {
  try {
    const { title, body, labels } = req.body;
    const issue = await githubService.createIssue(req.params.owner, req.params.repo, {
      title,
      body,
      labels
    });
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pull requests
router.get('/repos/:owner/:repo/pulls', validateAuth, async (req, res) => {
  try {
    const { state } = req.query;
    const prs = await githubService.getPullRequests(req.params.owner, req.params.repo, { state });
    res.json(prs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
