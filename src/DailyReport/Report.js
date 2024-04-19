import React from 'react'
import './DailyReport.css'
import WeeklyReport from './WeeklyReport';
import DailyReport from './DailyReport';
import { useState } from 'react';

export default function Report() {
  const [viewMode, setViewMode] = useState('daily');
  const [data, setData] = useState([]);


  return (
    <div className='Main-Container'>
      <div className='container'>
      <div className="tabs">
        <button
          className={`tab-btn ${viewMode === 'daily' ? 'active' : ''}`}
          onClick={() => setViewMode('daily')}
        >
          Daily
        </button>
        <button
          className={`tab-btn ${viewMode === 'weekly' ? 'active' : ''}`}
          onClick={() => setViewMode('weekly')}
        >
          Weekly
        </button>
      </div>
      {viewMode === 'daily' ? <DailyReport data={data} /> : <WeeklyReport data={data} />}
      </div>
      
    </div>
  );
}