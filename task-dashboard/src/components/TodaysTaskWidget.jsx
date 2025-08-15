// src/components/TodaysTaskWidget.jsx
import React from 'react';
import Widget from './Widget';
import styles from './TodaysTaskWidget.module.css';

const TodaysTaskWidget = ({ onMoreClick, onTaskClick }) => {
  const tasks = [
    { id: 1, title: 'Team Standup Meeting', time: '10:00 AM' },
    { id: 2, title: 'Client Presentation', time: '2:30 PM' },
    { id: 3, title: 'Code Review', time: '4:00 PM' },
    { id: 4, title: 'Documentation Update', time: '5:30 PM' },
  ];

  return (
    <Widget title="Today's Task" onMoreClick={onMoreClick}>
      <div className={styles.taskList}>
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={styles.taskItem}
            onClick={() => onTaskClick(task)}
          >
            <div className={styles.taskTime}>{task.time}</div>
            <div 
              className={styles.taskButton}
            >
              {task.title}
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default TodaysTaskWidget;