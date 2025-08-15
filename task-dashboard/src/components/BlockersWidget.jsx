// src/components/BlockersWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import styles from './BlockersWidget.module.css';

const BlockersWidget = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newBlocker, setNewBlocker] = useState({ title: '', description: '' });
  
  const [blockers, setBlockers] = useState([
    { id: 1, title: 'API service down', status: 'unresolved', created: '2 days ago' },
    { id: 2, title: 'Missing design assets', status: 'resolved', created: '1 day ago' },
    { id: 3, title: 'Dependency conflict', status: 'in-progress', created: '5 hours ago' },
  ]);
  
  const filteredBlockers = statusFilter === 'all' 
    ? blockers 
    : blockers.filter(b => b.status === statusFilter);

  const handleAddBlocker = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBlocker.title.trim()) {
      setBlockers([
        ...blockers,
        {
          id: Date.now(),
          title: newBlocker.title,
          description: newBlocker.description,
          status: 'unresolved',
          created: 'Just now'
        }
      ]);
      setNewBlocker({ title: '', description: '' });
      setShowForm(false);
    }
  };

  const updateBlockerStatus = (id, newStatus) => {
    setBlockers(blockers.map(blocker => 
      blocker.id === id ? { ...blocker, status: newStatus } : blocker
    ));
  };

  return (
    <Widget title="Blockers">
      <div className={styles.filterBar}>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Statuses</option>
          <option value="unresolved">Unresolved</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      
      {showForm ? (
        <form onSubmit={handleSubmit} className={styles.blockerForm}>
          <input
            type="text"
            placeholder="Blocker title"
            value={newBlocker.title}
            onChange={(e) => setNewBlocker({...newBlocker, title: e.target.value})}
            className={styles.formInput}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={newBlocker.description}
            onChange={(e) => setNewBlocker({...newBlocker, description: e.target.value})}
            className={styles.formTextarea}
            rows="3"
          />
          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
            >
              Add Blocker
            </button>
          </div>
        </form>
      ) : (
        <button 
          className={styles.addButton}
          onClick={handleAddBlocker}
        >
          + Add Blocker
        </button>
      )}
      
      <div className={styles.blockersList}>
        {filteredBlockers.map(blocker => (
          <div key={blocker.id} className={styles.blockerItem}>
            <div className={styles.blockerHeader}>
              <h4 className={styles.blockerTitle}>{blocker.title}</h4>
              <select
                value={blocker.status}
                onChange={(e) => updateBlockerStatus(blocker.id, e.target.value)}
                className={styles.statusSelect}
              >
                <option value="unresolved">Unresolved</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            {blocker.description && (
              <p className={styles.blockerDescription}>{blocker.description}</p>
            )}
            <div className={styles.blockerMeta}>
              <span>{blocker.created}</span>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default BlockersWidget;