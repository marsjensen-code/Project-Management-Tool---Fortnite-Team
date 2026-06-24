# Jira Integration Guide

## Overview

This project provides seamless bidirectional synchronization between GitHub Issues and Jira tickets. Issues created, updated, or closed in either system are automatically reflected in the other.

## Setup

### Prerequisites

- Jira Cloud instance
- GitHub repository with admin access
- API tokens for both services

### Jira Configuration

1. **Generate Jira API Token**
   - Log into your Jira instance
   - Navigate to Profile > Security > API Tokens
   - Click "Create API token"
   - Copy the token and store it securely

2. **Get Your Jira Host URL**
   - Your URL will be: `https://your-instance.atlassian.net`

### GitHub Configuration

1. **Generate GitHub Personal Access Token**
   - Go to Settings > Developer settings > Personal access tokens
   - Create a new token with `repo` and `admin:repo_hook` scopes
   - Copy the token and store it securely

### Environment Setup

Create a `.env` file with:

```
JIRA_HOST=https://your-instance.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your_token_here
JIRA_PROJECT_KEY=PROJ

GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO=owner/repo-name
```

## API Endpoints

### GitHub Endpoints

- `GET /api/github/repos` - List all repositories
- `GET /api/github/repos/:owner/:repo/issues` - List issues
- `POST /api/github/repos/:owner/:repo/issues` - Create issue
- `GET /api/github/repos/:owner/:repo/pulls` - List pull requests

### Jira Endpoints

- `GET /api/jira/issues` - List Jira issues
- `GET /api/jira/issues/:issueKey` - Get specific issue
- `POST /api/jira/issues` - Create issue
- `PUT /api/jira/issues/:issueKey` - Update issue
- `POST /api/jira/issues/:issueKey/comments` - Add comment

### Sync Endpoints

- `POST /api/issues/sync/github-to-jira` - Sync GitHub issue to Jira
- `POST /api/issues/sync/jira-to-github` - Sync Jira issue to GitHub
- `GET /api/issues/sync/list` - List all synced issues
- `GET /api/issues/sync/status/:id` - Get sync status

## Automatic Sync Service

The Python sync service (`jira_sync/main.py`) runs continuously and:

1. Fetches new/updated issues from both systems
2. Identifies issues that need syncing
3. Creates corresponding issues in the target system
4. Maintains sync history and logs

### Running the Sync Service

```bash
# Install dependencies
pip install -r requirements.txt

# Run sync service
python jira_sync/main.py
```

## Mapping

| GitHub | Jira |
|--------|------|
| Issue Title | Summary |
| Issue Body | Description |
| Labels | Jira Labels |
| Open/Closed | Status |
| Assignee | Assignee |

## Troubleshooting

### Authentication Failures

Verify your tokens are correct and have appropriate permissions.

### Sync Failures

Check logs in `logs/sync.log` for detailed error messages.

### Rate Limiting

Both GitHub and Jira have rate limits. The sync service includes backoff logic to handle this.

## Best Practices

1. **Use consistent naming** - Use similar titles in both systems
2. **Link issues** - Include references to the synced issue in comments
3. **Regular testing** - Test syncs with non-critical issues first
4. **Monitor logs** - Review sync logs regularly for issues
