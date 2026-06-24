#!/usr/bin/env python3
"""
Jira-GitHub Sync Service
Continuously syncs issues between GitHub and Jira instances
"""

import os
import time
import logging
from datetime import datetime
from dotenv import load_dotenv
from sync_engine import SyncEngine
from jira_client import JiraClient
from github_client import GitHubClient

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class SyncService:
    def __init__(self):
        self.jira_client = JiraClient(
            host=os.getenv('JIRA_HOST'),
            email=os.getenv('JIRA_EMAIL'),
            api_token=os.getenv('JIRA_API_TOKEN')
        )
        self.github_client = GitHubClient(
            token=os.getenv('GITHUB_TOKEN'),
            repo=os.getenv('GITHUB_REPO')
        )
        self.sync_engine = SyncEngine(self.jira_client, self.github_client)
        self.sync_interval = int(os.getenv('SYNC_INTERVAL', 300))

    def run(self):
        """Start the sync service"""
        logger.info("Starting Jira-GitHub Sync Service")
        logger.info(f"Sync interval: {self.sync_interval} seconds")

        try:
            while True:
                try:
                    self.sync()
                except Exception as e:
                    logger.error(f"Sync cycle failed: {str(e)}", exc_info=True)

                time.sleep(self.sync_interval)
        except KeyboardInterrupt:
            logger.info("Sync service stopped")

    def sync(self):
        """Execute a sync cycle"""
        logger.info(f"Starting sync cycle at {datetime.now()}")

        logger.info("Syncing GitHub issues to Jira...")
        github_issues = self.github_client.get_issues()
        for issue in github_issues:
            try:
                self.sync_engine.sync_github_to_jira(issue)
            except Exception as e:
                logger.warning(f"Failed to sync GitHub issue {issue['number']}: {str(e)}")

        logger.info("Syncing Jira issues to GitHub...")
        jira_issues = self.jira_client.get_issues()
        for issue in jira_issues:
            try:
                self.sync_engine.sync_jira_to_github(issue)
            except Exception as e:
                logger.warning(f"Failed to sync Jira issue {issue['key']}: {str(e)}")

        logger.info("Sync cycle completed")


if __name__ == '__main__':
    service = SyncService()
    service.run()
