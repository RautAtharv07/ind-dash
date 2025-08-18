// src/components/Dashboard.jsx
import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import TaskCautionWidget from './TaskCautionWidget';
import TodaysTaskWidget from './TodaysTaskWidget';
import AtMentionsWidget from './AtMentionsWidget';
import UpcomingMilestoneWidget from './UpcomingMilestoneWidget';
import PieChartWidget from './PieChartWidget';
import BarGraphWidget from './BarGraphWidget';
import MyTasksWidget from './MyTasksWidget';
import BlockersWidget from './BlockersWidget';
import RightSidebar from './RightSidebar';
import TaskDetailPopup from './TaskDetailPopup';

const Dashboard = () => {
  const [sidebar, setSidebar] = useState({ open: false, type: '', data: [] });
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock data
  const cautionTasks = [
    { id: 1, title: 'Finalize Q3 Report', due: 'Oct 15' },
    { id: 2, title: 'Update Security Protocols', due: 'Oct 18' },
    // ... more tasks
  ];
  
  const todaysTasks = [
    { id: 1, title: 'Team Standup Meeting', time: '10:00 AM' },
    // ... more tasks
  ];
  
  const mentions = [
    { id: 1, user: 'Sarah Johnson', message: 'Need your input', time: '2h ago' },
    // ... more mentions
  ];

  const handleMoreClick = (type) => {
    let data = [];
    switch(type) {
      case 'caution': data = cautionTasks; break;
      case 'today': data = todaysTasks; break;
      case 'mentions': data = mentions; break;
      default: data = [];
    }
    
    setSidebar({
      open: true,
      type,
      data
    });
  };

  const closeSidebar = () => {
    setSidebar({ open: false, type: '', data: [] });
  };

  const handleTaskClick = (task) => {
    // Add any missing properties that TaskDetailPopup expects
    const fullTask = {
      ...task,
      priority: task.priority || 'High',
      assignee: task.assignee || 'You',
      description: task.description || 'Task description goes here'
    };
    setSelectedTask(fullTask);
  };

  return (
     <div className={styles.dashboard}>
    {/* Top Section - Reorganized */}
    <div className={styles.topSection}>
      <TodaysTaskWidget onMoreClick={() => handleMoreClick('today')} />
      <TaskCautionWidget 
        onMoreClick={() => handleMoreClick('caution')}
        onTaskClick={handleTaskClick}
      />
      <AtMentionsWidget onMoreClick={() => handleMoreClick('mentions')} />
    </div>

      {/* Middle Section */}
      <div className={styles.middleSection}>
        <UpcomingMilestoneWidget />
        <PieChartWidget />
        <BarGraphWidget />
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <MyTasksWidget />
        <BlockersWidget />
      </div>

      {/* Right Sidebar */}
      {sidebar.open && (
        <RightSidebar 
          type={sidebar.type} 
          data={sidebar.data} 
          onClose={closeSidebar}
          onTaskClick={handleTaskClick}
        />
      )}
      
      {/* Task Detail Popup */}
      {selectedTask && (
        <TaskDetailPopup 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;