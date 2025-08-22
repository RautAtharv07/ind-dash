// src/components/TodaysTaskWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import TodayTaskDetailPopup from './TodayTaskDetailPopup';
import styles from './TodaysTaskWidget.module.css';

const TodaysTaskWidget = ({ onMoreClick }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  
  const tasks = [
    { 
      id: 1, 
      title: 'Team Standup Meeting', 
      time: '10:00 AM',
      description: 'Daily team standup meeting to discuss progress and blockers',
      completion: 0
    },
    { 
      id: 2, 
      title: 'Client Presentation', 
      time: '2:30 PM',
      description: 'Prepare and deliver quarterly review presentation to client',
      completion: 25
    },
    { 
      id: 3, 
      title: 'Code Review', 
      time: '4:00 PM',
      description: 'Review pull requests from development team',
      completion: 50
    },
    { 
      id: 4, 
      title: 'Documentation Update', 
      time: '5:30 PM',
      description: 'Update project documentation with latest changes',
      completion: 75
    },
  ];

  return (
    <>
      <Widget title="Today's Task" onMoreClick={onMoreClick}>
        <div className={styles.taskList}>
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={styles.taskItem}
              onClick={() => setSelectedTask(task)}
            >
              <div className={styles.taskTime}>{task.time}</div>
              <div className={styles.taskButton}>
                {task.title}
                <div className={styles.completionBadge}>
                  {task.completion}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Widget>
      
      {selectedTask && (
        <TodayTaskDetailPopup 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </>
  );
};

export default TodaysTaskWidget;