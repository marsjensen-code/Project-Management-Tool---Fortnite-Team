import React, { useState, useEffect } from 'react';
import api from '../services/api';

function JiraPage() {
  const [jiraIssues, setJiraIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJiraIssues = async () => {
      try {
        const response = await api.get('/jira/issues');
        setJiraIssues(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJiraIssues();
  }, []);

  if (loading) return <div>Loading Jira issues...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="jira-page">
      <h1>Jira Issues</h1>
      <div className="jira-issues-grid">
        {jiraIssues.length > 0 ? (
          jiraIssues.map((issue) => (
            <div key={issue.key} className="jira-issue-card">
              <h3>{issue.key}</h3>
              <p className="summary">{issue.fields?.summary}</p>
              <div className="meta">
                <span className="status">{issue.fields?.status?.name}</span>
                <span className="priority">{issue.fields?.priority?.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No Jira issues found</p>
        )}
      </div>
    </div>
  );
}

export default JiraPage;
