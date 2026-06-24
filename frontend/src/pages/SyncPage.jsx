import React, { useState } from 'react';
import api from '../services/api';

function SyncPage() {
  const [syncFrom, setSyncFrom] = useState('github');
  const [issueUrl, setIssueUrl] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async (e) => {
    e.preventDefault();
    setSyncing(true);
    setMessage('');

    try {
      let response;
      if (syncFrom === 'github') {
        response = await api.post('/issues/sync/github-to-jira', {
          githubIssueUrl: issueUrl
        });
        setMessage('Successfully synced GitHub issue to Jira!');
      } else {
        response = await api.post('/issues/sync/jira-to-github', {
          jiraIssueKey: issueUrl
        });
        setMessage('Successfully synced Jira issue to GitHub!');
      }
      setIssueUrl('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="sync-page">
      <h1>Sync Issues</h1>
      <form onSubmit={handleSync} className="sync-form">
        <div className="form-group">
          <label>Sync from:</label>
          <select value={syncFrom} onChange={(e) => setSyncFrom(e.target.value)}>
            <option value="github">GitHub to Jira</option>
            <option value="jira">Jira to GitHub</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            {syncFrom === 'github' ? 'GitHub Issue URL' : 'Jira Issue Key'}
          </label>
          <input
            type="text"
            value={issueUrl}
            onChange={(e) => setIssueUrl(e.target.value)}
            placeholder={syncFrom === 'github' ? 'https://github.com/...' : 'PROJ-123'}
            required
          />
        </div>
        <button type="submit" disabled={syncing}>
          {syncing ? 'Syncing...' : 'Sync'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default SyncPage;
