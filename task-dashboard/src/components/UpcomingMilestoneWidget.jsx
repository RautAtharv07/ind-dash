// src/components/UpcomingMilestoneWidget.jsx
import React from 'react';
import Widget from './Widget';
import styles from './UpcomingMilestoneWidget.module.css';

const UpcomingMilestoneWidget = () => {
  const milestones = [
    { id: 1, title: 'Product Launch', date: 'Oct 30', dependencies: ['Finalize marketing', 'Complete QA testing', 'Prepare launch event'] },
    { id: 2, title: 'Q4 Planning', date: 'Nov 15', dependencies: ['Gather team inputs', 'Create roadmap', 'Budget approval'] },
    { id: 3, title: 'Annual Review', date: 'Dec 5', dependencies: ['Collect performance data', 'Prepare reports', 'Schedule meetings'] },
  ];

  return (
    <Widget title="Upcoming milestone and dependent work">
      <div className={styles.milestoneList}>
        {milestones.map(milestone => (
          <div key={milestone.id} className={styles.milestoneItem}>
            <div className={styles.milestoneHeader}>
              <div>
                <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
                <span className={styles.milestoneDate}>{milestone.date}</span>
              </div>
              <span className={styles.dependencyCount}>
                {milestone.dependencies.length} dependencies
              </span>
            </div>
            
            <ul className={styles.dependenciesList}>
              {milestone.dependencies.map((dep, index) => (
                <li key={index} className={styles.dependencyItem}>
                  <span className={styles.dependencyBullet}>•</span>
                  {dep}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default UpcomingMilestoneWidget;