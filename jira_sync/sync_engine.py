import logging
from datetime import datetime
from typing import Dict, Any

logger = logging.getLogger(__name__)


class SyncEngine:
    def __init__(self, jira_client, github_client):
        self.jira_client = jira_client
        self.github_client = github_client
        self.sync_log = []

    def sync_github_to_jira(self, github_issue: Dict[str, Any]) -> bool:
        """Sync a GitHub issue to Jira"""
        try:
            title = github_issue['title']
            body = github_issue['body'] or ''
            gh_url = github_issue['html_url']
            gh_number = github_issue['number']

            description = f"GitHub Issue #{gh_number}\n{body}\n\nSource: {gh_url}"
            jira_issue = self.jira_client.create_issue(
                summary=title,
                description=description,
                issue_type='Bug'
            )

            logger.info(f"Synced GitHub issue #{gh_number} to Jira issue {jira_issue['key']}")
            self._log_sync('github->jira', gh_number, jira_issue['key'], 'success')
            return True
        except Exception as e:
            logger.error(f"Failed to sync GitHub issue: {str(e)}")
            self._log_sync('github->jira', github_issue.get('number'), None, 'failed', str(e))
            return False

    def sync_jira_to_github(self, jira_issue: Dict[str, Any]) -> bool:
        """Sync a Jira issue to GitHub"""
        try:
            key = jira_issue['key']
            summary = jira_issue['fields']['summary']
            description = jira_issue['fields'].get('description', '')
            status = jira_issue['fields']['status']['name']

            body = f"Jira Issue: {key}\n{description}\n\nStatus: {status}"
            github_issue = self.github_client.create_issue(
                title=summary,
                body=body,
                labels=['sync-from-jira']
            )

            logger.info(f"Synced Jira issue {key} to GitHub issue #{github_issue['number']}")
            self._log_sync('jira->github', key, github_issue['number'], 'success')
            return True
        except Exception as e:
            logger.error(f"Failed to sync Jira issue: {str(e)}")
            self._log_sync('jira->github', jira_issue.get('key'), None, 'failed', str(e))
            return False

    def _log_sync(self, sync_type: str, source_id: str, target_id: str, status: str, error: str = None):
        """Log a sync operation"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'type': sync_type,
            'source': source_id,
            'target': target_id,
            'status': status,
            'error': error
        }
        self.sync_log.append(log_entry)
