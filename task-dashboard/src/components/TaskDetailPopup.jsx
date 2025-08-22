import React, { useState } from 'react';
import styles from './TaskDetailPopup.module.css';

const TaskDetailPopup = ({ task, onClose }) => {
  const [status, setStatus] = useState(task.status || '0%');
  const [comments, setComments] = useState([
    { id: 1, user: 'You', text: 'Started working on this task', time: '2 hours ago' },
    { id: 2, user: 'Sarah Johnson', text: 'Please include the latest metrics', time: '1 hour ago' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setNewComment(`@${comment.user} `);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          user: 'You',
          text: newComment,
          time: 'Just now'
        }
      ]);
      setNewComment('');
      setReplyingTo(null);
    }
  };

  // Map status to progress value and color
  const statusOptions = [
    { value: '0%', color: '#9e9e9e' },
    { value: '10%', color: '#ff7043' },
    { value: '25%', color: '#ff9800' },
    { value: '35%', color: '#fbc02d' },
    { value: '50%', color: '#64b5f6' },
    { value: '65%', color: '#1976d2' },
    { value: '75%', color: '#388e3c' },
    { value: '100%', color: '#2e7d32' },
  ];

  const currentOption = statusOptions.find(opt => opt.value === status) || statusOptions[0];

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.popupHeader}>
          <h2 className={styles.taskTitle}>{task.title}</h2>
          <div className={styles.taskMeta}>
            <span className={styles.taskDue}>Due: {task.due}</span>
            <span className={styles.taskPriority}>Priority: {task.priority}</span>
          </div>
        </div>
        
        <div className={styles.taskDetails}>
          <div className={styles.detailSection}>
            <h4>Description</h4>
            <p>{task.description || 'No description available'}</p>
          </div>
          
          <div className={styles.detailSection}>
            <h4>Update Status</h4>
            <select 
              value={status} 
              onChange={handleStatusChange}
              className={styles.statusSelect}
              style={{ color: currentOption.color, fontWeight: 600 }}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))}
            </select>

            {/* Progress bar */}
            <div className={styles.progressWrapper}>
              <div 
                className={styles.progressFill} 
                style={{ width: status, background: currentOption.color }}
              />
            </div>
          </div>
          
          <div className={styles.detailSection}>
            <h4>Task History</h4>
            <div className={styles.historyList}>
              <div className={styles.historyItem}>
                <span className={styles.historyTime}>Today, 10:30 AM</span>
                <span>Status changed to "In Progress" by You</span>
              </div>
              <div className={styles.historyItem}>
                <span className={styles.historyTime}>Yesterday, 3:45 PM</span>
                <span>Task created by Sarah Johnson</span>
              </div>
            </div>
          </div>
          
          {/* Comments Section with Reply Feature */}
          <div className={styles.detailSection}>
            <h4>Comments</h4>
            <div className={styles.commentsList}>
              {comments.map(comment => (
                <div key={comment.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentUser}>{comment.user}</span>
                    <span className={styles.commentTime}>{comment.time}</span>
                    <button 
                      className={styles.replyToButton}
                      onClick={() => handleReply(comment)}
                    >
                      Reply
                    </button>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                </div>
              ))}
            </div>

            {replyingTo && (
              <div className={styles.replyingTo}>
                Replying to {replyingTo.user}
                <button 
                  className={styles.cancelReply}
                  onClick={() => setReplyingTo(null)}
                >
                  ×
                </button>
              </div>
            )}
            
            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className={styles.commentInput}
                rows="3"
              />
              <div className={styles.commentActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => {
                    setNewComment('');
                    setReplyingTo(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.commentButton}>
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPopup;
