// src/components/Widget.jsx
import React from 'react';
import styles from './Widget.module.css';

const Widget = ({ title, children, onMoreClick }) => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>{title}</h3>
        {onMoreClick && (
          <button className={styles.moreButton} onClick={onMoreClick}>
            ⋮
          </button>
        )}
      </div>
      <div className={styles.widgetContent}>
        {children}
      </div>
    </div>
  );
};

export default Widget;