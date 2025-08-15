// src/components/PieChartWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './PieChartWidget.module.css';

const PieChartWidget = () => {
  const [timePeriod, setTimePeriod] = useState('current');
  
  const data = {
    current: [
      { name: 'To Do', value: 25, color: '#4CAF50' },
      { name: 'In Progress', value: 35, color: '#2196F3' },
      { name: 'Completed', value: 30, color: '#9C27B0' },
      { name: 'Blocked', value: 10, color: '#FF9800' },
    ],
    week1: [
      { name: 'To Do', value: 40, color: '#4CAF50' },
      { name: 'In Progress', value: 25, color: '#2196F3' },
      { name: 'Completed', value: 20, color: '#9C27B0' },
      { name: 'Blocked', value: 15, color: '#FF9800' },
    ],
    week2: [
      { name: 'To Do', value: 20, color: '#4CAF50' },
      { name: 'In Progress', value: 30, color: '#2196F3' },
      { name: 'Completed', value: 40, color: '#9C27B0' },
      { name: 'Blocked', value: 10, color: '#FF9800' },
    ]
  };

  const currentData = data[timePeriod] || data.current;

  return (
    <Widget title="Task Distribution">
      <div className={styles.filterBar}>
        <select 
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="current">Current</option>
          <option value="week1">Week 1</option>
          <option value="week2">Week 2</option>
        </select>
      </div>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className={styles.legend}>
          {currentData.map((item, index) => (
            <div key={index} className={styles.legendItem}>
              <div 
                className={styles.colorBox} 
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.name} ({item.value}%)</span>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
};

export default PieChartWidget;