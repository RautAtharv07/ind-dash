// src/components/AtMentionsWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import styles from './AtMentionsWidget.module.css';

const AtMentionsWidget = ({ onMoreClick }) => {
  const [sourceFilter, setSourceFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  const mentions = [
    { id: 1, user: 'Sarah Johnson', message: 'Need your input on the design specs', time: '2h ago', source: 'task', resolved: false },
    { id: 2, user: 'Michael Chen', message: 'Can you review the PR?', time: '4h ago', source: 'file', resolved: false },
    { id: 3, user: 'Emma Rodriguez', message: 'Meeting notes from today', time: '1d ago', source: 'chat', resolved: true },
    { id: 4, user: 'David Kim', message: 'Budget approval needed', time: '1d ago', source: 'task', resolved: false },
  ];

  const filteredMentions = sourceFilter === 'all' 
    ? mentions 
    : mentions.filter(m => m.source === sourceFilter);

  const handleReply = (mention) => {
    setReplyingTo(mention);
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply and mark as resolved
      // For demo, we'll just remove it from the list
      setReplyingTo(null);
      setReplyText('');
    }
  };

  return (
    <Widget title="At mentions" onMoreClick={onMoreClick}>
      <div className={styles.filterBar}>
        <select 
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Sources</option>
          <option value="task">Task Mentions</option>
          <option value="file">File Mentions</option>
          <option value="chat">Chat Mentions</option>
        </select>
      </div>
      
      {replyingTo ? (
        <div className={styles.replyContainer}>
          <div className={styles.replyHeader}>
            Replying to {replyingTo.user}
            <button 
              className={styles.cancelReply}
              onClick={() => setReplyingTo(null)}
            >
              ×
            </button>
          </div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className={styles.replyTextarea}
            autoFocus
          />
          <div className={styles.replyActions}>
            <button 
              className={styles.submitReply}
              onClick={handleSubmitReply}
            >
              Send Reply
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.mentionsGrid}>
          {filteredMentions.filter(m => !m.resolved).map(mention => (
            <div 
              key={mention.id} 
              className={`${styles.mentionCard} ${mention.source === 'task' ? styles.taskMention : ''}`}
            >
              <div className={styles.mentionHeader}>
                <span className={styles.userName}>{mention.user}</span>
                <span className={styles.mentionSource}>{mention.source}</span>
              </div>
              <p className={styles.message}>{mention.message}</p>
              <div className={styles.mentionFooter}>
                <span className={styles.time}>{mention.time}</span>
                <button 
                  className={styles.replyButton}
                  onClick={() => handleReply(mention)}
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Widget>
  );
};

export default AtMentionsWidget;