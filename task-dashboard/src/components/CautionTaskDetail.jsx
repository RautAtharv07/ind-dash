import React, { useState } from 'react';
import styles from './TaskDetailPopup.module.css'; // reuse same styling

const STATUS_COLORS = {
  0: "#d3d3d3",      // Gray - Not started
  10: "#ff9999",     // Light red - Barely started
  25: "#ffcc66",     // Orange - Early progress
  35: "#ffb347",     // Deeper orange
  50: "#ffd700",     // Yellow - Midway
  65: "#7ec8e3",     // Light blue - Good progress
  75: "#4db6ac",     // Teal - Almost done
  100: "#4caf50",    // Green - Completed
};

const CautionTaskDetail = ({ task, onClose }) => {
  const [status, setStatus] = useState(task.status || 0);
  const [comments, setComments] = useState([
    { id: 1, user: 'You', text: 'This is blocked by API delay.', time: '2 hours ago' },
    { id: 2, user: 'Sarah Johnson', text: 'We need design assets ASAP.', time: '1 hour ago' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleStatusChange = (e) => setStatus(Number(e.target.value));

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setNewComment(`@${comment.user} `);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), user: 'You', text: newComment, time: 'Just now' }
      ]);
      setNewComment('');
      setReplyingTo(null);
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        {/* Header */}
        <div className={styles.popupHeader}>
          <h2 className={styles.taskTitle}>{task.title}</h2>
          <div className={styles.taskMeta}>
            <span className={styles.taskDue}>Due: {task.due}</span>
            <span className={styles.taskPriority}>Priority: {task.priority}</span>
            <span style={{ color: "red", fontWeight: "600" }}>
              🚨 At Risk
            </span>
          </div>
        </div>
        
        {/* Details */}
        <div className={styles.taskDetails}>
          
          <div className={styles.detailSection}>
            <h4>Description</h4>
            <p>{task.description || 'No description available'}</p>
          </div>

          <div className={styles.detailSection}>
            <h4>Why at Risk</h4>
            <p>{task.riskReason || 'Delays due to external dependencies'}</p>
          </div>

          <div className={styles.detailSection}>
            <h4>Blocked By</h4>
            <p>{task.blockedBy || 'Not specified'}</p>
          </div>

          <div className={styles.detailSection}>
            <h4>Assignee</h4>
            <p>{task.assignee || 'Unassigned'}</p>
          </div>

          <div className={styles.detailSection}>
            <h4>Dependencies</h4>
            {task.dependencies && task.dependencies.length > 0 ? (
              <ul>
                {task.dependencies.map((dep, idx) => (
                  <li key={idx}>{dep}</li>
                ))}
              </ul>
            ) : (
              <p>No dependencies listed</p>
            )}
          </div>

          <div className={styles.detailSection}>
            <h4>Confidence Level</h4>
            <p>{task.confidence || '70% chance to complete on time'}</p>
          </div>

          {/* 🔥 Percentage Status with Colors */}
          <div className={styles.detailSection}>
            <h4>Update Status</h4>
            <select 
              value={status} 
              onChange={handleStatusChange}
              className={styles.statusSelect}
              style={{ 
                backgroundColor: STATUS_COLORS[status] || "#fff",
                color: status === 0 ? "#000" : "#fff",
                fontWeight: "600"
              }}
            >
              <option value={0}>0%</option>
              <option value={10}>10%</option>
              <option value={25}>25%</option>
              <option value={35}>35%</option>
              <option value={50}>50%</option>
              <option value={65}>65%</option>
              <option value={75}>75%</option>
              <option value={100}>100%</option>
            </select>
          </div>

          <div className={styles.detailSection}>
            <h4>Task History</h4>
            <div className={styles.historyList}>
              <div className={styles.historyItem}>
                <span className={styles.historyTime}>Today, 10:30 AM</span>
                <span>Status changed to {status}% by You</span>
              </div>
              <div className={styles.historyItem}>
                <span className={styles.historyTime}>Yesterday, 3:45 PM</span>
                <span>Task created by Sarah Johnson</span>
              </div>
            </div>
          </div>

          {/* Comments with reply feature */}
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

export default CautionTaskDetail;
