// src/components/AtMentionsWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import styles from './AtMentionsWidget.module.css';

const mentionsData = [
  { id: 1, user: 'Sarah Johnson', message: 'Need your input on the design specs', time: '2h ago', source: 'task', resolved: false },
  { id: 2, user: 'Michael Chen', message: 'Can you review the PR?', time: '4h ago', source: 'file', resolved: false },
  { id: 3, user: 'Emma Rodriguez', message: 'Meeting notes from today', time: '1d ago', source: 'chat', resolved: true },
  { id: 4, user: 'David Kim', message: 'Budget approval needed', time: '1d ago', source: 'task', resolved: false },
];

const commentsData = [
  { id: 1, user: 'Alex Morgan', text: 'Great progress on the design!', time: '1h ago', resolved: true },
  { id: 2, user: 'Taylor Swift', text: 'Need your feedback on the new layout', time: '3h ago', resolved: false },
  { id: 3, user: 'Chris Evans', text: 'When can we schedule the review?', time: '5h ago', resolved: false },
];

const AtMentionsWidget = ({ onMoreClick }) => {
  const [view, setView] = useState('mentions'); // 'mentions' or 'comments'
  const [sourceFilter, setSourceFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (item) => setReplyingTo(item);
  const handleSubmitReply = () => {
    if (replyText.trim()) {
      setReplyingTo(null);
      setReplyText('');
    }
  };

  const filteredMentions = sourceFilter === 'all'
    ? mentionsData
    : mentionsData.filter(m => m.source === sourceFilter);

  return (
    <Widget title="Mentions & Comments" onMoreClick={onMoreClick}>
      <div className={styles.controls}>
        <div className={styles.toggleContainer}>
          <button 
            className={`${styles.toggleButton} ${view === 'mentions' ? styles.active : ''}`}
            onClick={() => setView('mentions')}
          >
            Mentions
          </button>
          <button 
            className={`${styles.toggleButton} ${view === 'comments' ? styles.active : ''}`}
            onClick={() => setView('comments')}
          >
            Comments
          </button>
        </div>

        {view === 'mentions' && (
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
        )}
      </div>

      {replyingTo && (
        <div className={styles.replyContainer}>
          <div className={styles.replyHeader}>
            Replying to {replyingTo.user}
            <button className={styles.cancelReply} onClick={() => setReplyingTo(null)}>×</button>
          </div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className={styles.replyTextarea}
            autoFocus
          />
          <div className={styles.replyActions}>
            <button className={styles.submitReply} onClick={handleSubmitReply}>Send Reply</button>
          </div>
        </div>
      )}

      {!replyingTo && (
        <div className={styles.mentionsGrid}>
          {view === 'mentions'
            ? filteredMentions.filter(m => !m.resolved).map(mention => (
                <div key={mention.id} className={`${styles.mentionCard} ${mention.source === 'task' ? styles.taskMention : ''}`}>
                  <div className={styles.mentionHeader}>
                    <span className={styles.userName}>{mention.user}</span>
                    <span className={styles.mentionSource}>{mention.source}</span>
                  </div>
                  <p className={styles.message}>{mention.message}</p>
                  <div className={styles.mentionFooter}>
                    <span className={styles.time}>{mention.time}</span>
                    <button className={styles.replyButton} onClick={() => handleReply(mention)}>Reply</button>
                  </div>
                </div>
              ))
            : commentsData.filter(c => !c.resolved).map(comment => (
                <div key={comment.id} className={styles.mentionCard}>
                  <div className={styles.mentionHeader}>
                    <span className={styles.userName}>{comment.user}</span>
                  </div>
                  <p className={styles.message}>{comment.text}</p>
                  <div className={styles.mentionFooter}>
                    <span className={styles.time}>{comment.time}</span>
                    <button className={styles.replyButton} onClick={() => handleReply(comment)}>Reply</button>
                  </div>
                </div>
              ))
          }

          {view === 'mentions' && filteredMentions.filter(m => !m.resolved).length === 0 && (
            <p className={styles.empty}>No mentions to display</p>
          )}
          {view === 'comments' && commentsData.filter(c => !c.resolved).length === 0 && (
            <p className={styles.empty}>No comments to display</p>
          )}
        </div>
      )}
    </Widget>
  );
};

export default AtMentionsWidget;
