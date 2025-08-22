// src/components/TodayTaskDetailPopup.jsx
import React, { useState } from 'react';
import styles from './TodayTaskDetailPopup.module.css';

const TodayTaskDetailPopup = ({ task, onClose }) => {
  const [completion, setCompletion] = useState(task.completion || 0);
  const [comments, setComments] = useState(task.comments || []);
  const [newComment, setNewComment] = useState('');
  const [resourceLink, setResourceLink] = useState(task.resourceLink || '');
  const [dependencies, setDependencies] = useState(task.dependencies || []);
  const [newDependency, setNewDependency] = useState('');
  const [mentionedUsers, setMentionedUsers] = useState([]);

  const completionOptions = [0, 25, 30, 50, 65, 75, 90, 100];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const updatedComments = [
        ...comments,
        {
          id: Date.now(),
          user: 'You',
          text: newComment,
          time: 'Just now',
          mentions: mentionedUsers
        }
      ];
      setComments(updatedComments);
      setNewComment('');
      setMentionedUsers([]);
    }
  };

  const handleAddDependency = () => {
    if (newDependency.trim()) {
      setDependencies([...dependencies, newDependency]);
      setNewDependency('');
    }
  };

  const handleMention = (e) => {
    if (e.key === '@') {
      // This would typically open a user selector
      const user = prompt('Enter username to mention:');
      if (user) {
        setMentionedUsers([...mentionedUsers, user]);
        setNewComment(newComment + `@${user} `);
      }
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.popupHeader}>
          <h2 className={styles.taskTitle}>{task.title}</h2>
          <div className={styles.taskMeta}>
            <span className={styles.taskTime}>{task.time}</span>
            <span className={styles.taskDate}>Today</span>
          </div>
        </div>
        
        <div className={styles.taskDetails}>
          <div className={styles.detailSection}>
            <h4>Description</h4>
            <p>{task.description || 'No description available'}</p>
          </div>
          
          <div className={styles.detailSection}>
            <h4>Completion Status</h4>
            <div className={styles.completionSection}>
              <select 
                value={completion} 
                onChange={(e) => setCompletion(parseInt(e.target.value))}
                className={styles.completionSelect}
              >
                {completionOptions.map(option => (
                  <option key={option} value={option}>{option}%</option>
                ))}
              </select>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${completion}%`, backgroundColor: getProgressColor(completion) }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className={styles.detailSection}>
            <h4>Resource Links</h4>
            <div className={styles.resourceSection}>
              <input
                type="url"
                placeholder="Add meeting link, doc link, or other resource"
                value={resourceLink}
                onChange={(e) => setResourceLink(e.target.value)}
                className={styles.resourceInput}
              />
              {resourceLink && (
                <a href={resourceLink} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                  Open Resource
                </a>
              )}
            </div>
          </div>
          
          <div className={styles.detailSection}>
            <h4>Dependencies</h4>
            <div className={styles.dependencySection}>
              <div className={styles.dependencyInput}>
                <input
                  type="text"
                  placeholder="Add dependent task"
                  value={newDependency}
                  onChange={(e) => setNewDependency(e.target.value)}
                  className={styles.dependencyField}
                />
                <button onClick={handleAddDependency} className={styles.addDependencyButton}>
                  Add
                </button>
              </div>
              <ul className={styles.dependenciesList}>
                {dependencies.map((dep, index) => (
                  <li key={index} className={styles.dependencyItem}>
                    <span className={styles.dependencyBullet}>•</span>
                    {dep}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={styles.detailSection}>
            <h4>Comments & Mentions</h4>
            <div className={styles.commentsList}>
              {comments.map(comment => (
                <div key={comment.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentUser}>{comment.user}</span>
                    <span className={styles.commentTime}>{comment.time}</span>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                  {comment.mentions && comment.mentions.length > 0 && (
                    <div className={styles.mentions}>
                      Mentions: {comment.mentions.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleMention}
                placeholder="Add a comment (type @ to mention someone)..."
                className={styles.commentInput}
                rows="3"
              />
              <div className={styles.commentActions}>
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

// Helper function to get progress bar color based on completion percentage
const getProgressColor = (percentage) => {
  if (percentage <= 25) return '#ff4757';
  if (percentage <= 50) return '#ffa502';
  if (percentage <= 75) return '#2ed573';
  return '#1e90ff';
};

export default TodayTaskDetailPopup;