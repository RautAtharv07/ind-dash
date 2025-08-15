// src/components/MyTasksWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import TaskDetailPopup from './TaskDetailPopup';
import styles from './MyTasksWidget.module.css';

const MyTasksWidget = () => {
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  
  const tasks = [
    { id: 1, title: 'Implement authentication', status: 'In Progress', priority: 'High', due: 'Oct 15', assignee: 'You' },
    { id: 2, title: 'Fix dashboard layout', status: 'To Do', priority: 'High', due: 'Oct 16', assignee: 'You' },
    { id: 3, title: 'Write documentation', status: 'To Do', priority: 'Medium', due: 'Oct 18', assignee: 'You' },
    { id: 4, title: 'Review pull requests', status: 'Completed', priority: 'Low', due: 'Oct 12', assignee: 'You' },
    { id: 5, title: 'Prepare demo', status: 'In Progress', priority: 'Medium', due: 'Oct 20', assignee: 'You' },
  ];

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <Widget title="Total task to user">
      <div className={styles.filterBar}>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <div className={styles.filterGroup}>
          <label>Priority:</label>
          <select className={styles.filterSelect}>
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label>Due Date:</label>
          <select className={styles.filterSelect}>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>
      
      <div className={styles.taskTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Task</div>
          <div className={styles.headerCell}>Status</div>
          <div className={styles.headerCell}>Priority</div>
          <div className={styles.headerCell}>Due</div>
          <div className={styles.headerCell}>Assignee</div>
        </div>
        
        <div className={styles.tableBody}>
          {filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={styles.tableRow}
              onClick={() => setSelectedTask(task)}
            >
              <div className={styles.tableCell}>{task.title}</div>
              <div className={styles.tableCell}>
                <span className={`${styles.statusBadge} ${styles[task.status.replace(/\s+/g, '')]}`}>
                  {task.status}
                </span>
              </div>
              <div className={styles.tableCell}>
                <span className={`${styles.priorityBadge} ${styles[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
              <div className={styles.tableCell}>{task.due}</div>
              <div className={styles.tableCell}>{task.assignee}</div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedTask && (
        <TaskDetailPopup task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </Widget>
  );
};

export default MyTasksWidget;