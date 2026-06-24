import React, { useState, useEffect } from 'react';
import api from '../services/api';

function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await api.get('/issues/sync/list');
        setIssues(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="issues-page">
      <h1>GitHub Issues</h1>
      <div className="filter-controls">
        <button 
          className={filter === 'open' ? 'active' : ''}
          onClick={() => setFilter('open')}
        >
          Open
        </button>
        <button 
          className={filter === 'closed' ? 'active' : ''}
          onClick={() => setFilter('closed')}
        >
          Closed
        </button>
      </div>
      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-item">
            <h3>{issue.sourceId}</h3>
            <p>Synced to: {issue.targetId}</p>
            <span className={`status ${issue.status}`}>{issue.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IssuesPage;
