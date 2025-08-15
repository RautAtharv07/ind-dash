// src/components/BarGraphWidget.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './BarGraphWidget.module.css';

const BarGraphWidget = () => {
  const [timePeriod, setTimePeriod] = useState('week');
  
  const data = {
    week: [
      { day: 'Mon', tasks: 23 },
      { day: 'Tue', tasks: 45 },
      { day: 'Wed', tasks: 38 },
      { day: 'Thu', tasks: 56 },
      { day: 'Fri', tasks: 42 },
    ],
    month: [
      { week: 'Week 1', tasks: 120 },
      { week: 'Week 2', tasks: 185 },
      { week: 'Week 3', tasks: 210 },
      { week: 'Week 4', tasks: 245 },
    ],
    weeks: [
      { period: 'Week 1-2', tasks: 305 },
      { period: 'Week 3-4', tasks: 455 },
      { period: 'Week 5-6', tasks: 520 },
    ]
  };

  const currentData = data[timePeriod] || data.week;

  return (
    <Widget title="Task trend Bar graph">
      <div className={styles.filterBar}>
        <select 
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="week">By Day (Week)</option>
          <option value="month">By Week (Month)</option>
          <option value="weeks">By Fortnight</option>
        </select>
      </div>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={timePeriod === 'week' ? 'day' : timePeriod === 'month' ? 'week' : 'period'} 
              stroke="#666" 
            />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }} 
              itemStyle={{ color: '#333' }}
            />
            <Bar 
              dataKey="tasks" 
              fill="var(--majar-purple)" 
              radius={[4, 4, 0, 0]} 
              barSize={timePeriod === 'week' ? 30 : 40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  );
};

export default BarGraphWidget;