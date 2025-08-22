// src/components/TaskCautionWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import styles from './TaskCautionWidget.module.css';
import { FiAlertTriangle } from 'react-icons/fi'; 
import CautionTaskDetail from './CautionTaskDetail'; // 👈 import the caution detail popup

const TaskCautionWidget = ({ onMoreClick }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = [
    { id: 1, title: 'Finalize Q3 Report', due: 'Oct 15', priority: 'High', description: 'Need to compile metrics and finalize slides for Q3 report.' },
    { id: 2, title: 'Update Security Protocols', due: 'Oct 18', priority: 'Medium', description: 'Revise company-wide security policies.' },
    { id: 3, title: 'Review Client Feedback', due: 'Oct 20', priority: 'High', description: 'Analyze survey data from client responses.' },
    { id: 4, title: 'Prepare Board Meeting', due: 'Oct 22', priority: 'Low', description: 'Organize agenda, presentations, and board materials.' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return styles.high;
      case 'Medium': return styles.medium;
      case 'Low': return styles.low;
      default: return '';
    }
  };

  return (
    <>
      <Widget title="⚠️ Tasks Required Attention" onMoreClick={onMoreClick}>
        <div className={styles.taskList}>
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={styles.taskItem}
              onClick={() => setSelectedTask(task)} // 👈 open detail popup
            >
              <div className={styles.taskHeader}>
                <FiAlertTriangle className={styles.icon} />
                <span className={styles.taskTitle}>{task.title}</span>
              </div>
              <div className={styles.taskMeta}>
                <span className={`${styles.priority} ${getPriorityColor(task.priority)}`}>
                  {task.priority} Priority
                </span>
                <span className={styles.taskDue}>Due: {task.due}</span>
              </div>
            </div>
          ))}
        </div>
      </Widget>

      {/* Render Caution Task Detail Popup */}
      {selectedTask && (
        <CautionTaskDetail 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </>
  );
};

export default TaskCautionWidget;
