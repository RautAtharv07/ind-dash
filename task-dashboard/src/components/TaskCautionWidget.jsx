
// src/components/TaskCautionWidget.jsx
import React from 'react';
import Widget from './Widget';
import styles from './TaskCautionWidget.module.css';

const TaskCautionWidget = ({ onMoreClick, onTaskClick }) => {
  const tasks = [
    { id: 1, title: 'Finalize Q3 Report', due: 'Oct 15' },
    { id: 2, title: 'Update Security Protocols', due: 'Oct 18' },
    { id: 3, title: 'Review Client Feedback', due: 'Oct 20' },
    { id: 4, title: 'Prepare Board Meeting', due: 'Oct 22' },
  ];

  return (
    <Widget title="Task at Caution" onMoreClick={onMoreClick}>
      <div className={styles.taskList}>
        {tasks.map(task => (
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
    </Widget>
  );
};

export default TaskCautionWidget;