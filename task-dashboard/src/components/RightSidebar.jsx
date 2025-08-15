// src/components/RightSidebar.jsx
import React from 'react';
import styles from './RightSidebar.module.css';

const RightSidebar = ({ type, data, onClose, onTaskClick }) => {
  let title = '';
  let content = null;
  
  switch(type) {
    case 'caution':
      title = 'All Tasks at Caution';
      content = (
        <div className={styles.taskList}>
          {data.map(task => (
            <div 
              key={task.id} 
              className={styles.taskItem}
              onClick={() => onTaskClick(task)}
            >
              <div className={styles.taskTitle}>{task.title}</div>
              <div className={styles.taskDue}>Due: {task.due}</div>
            </div>
          ))}
        </div>
      );
      break;
      
    case 'today':
      title = "All Today's Tasks";
      content = (
        <div className={styles.taskList}>
          {data.map(task => (
            <div 
              key={task.id} 
              className={styles.taskItem}
              onClick={() => onTaskClick(task)}
            >
              <div className={styles.taskTime}>{task.time}</div>
              <div className={styles.taskTitle}>{task.title}</div>
            </div>
          ))}
        </div>
      );
      break;
      
    case 'mentions':
      title = 'All Mentions';
      content = (
        <div className={styles.mentionsList}>
          {data.map(mention => (
            <div key={mention.id} className={styles.mentionItem}>
              <div className={styles.mentionHeader}>
                <span className={styles.userName}>{mention.user}</span>
                <span className={styles.time}>{mention.time}</span>
              </div>
              <p className={styles.message}>{mention.message}</p>
              <button className={styles.replyButton}>Reply</button>
            </div>
          ))}
        </div>
      );
      break;
  }

  return (
    <div className={styles.sidebarOverlay} onClick={onClose}>
      <div className={styles.sidebar} onClick={e => e.stopPropagation()}>
        <div className={styles.sidebarHeader}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.sidebarContent}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;