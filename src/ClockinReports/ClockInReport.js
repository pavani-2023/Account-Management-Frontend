import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClockinReports.css'
import DailyReport from './DailyReport.js';
import WeeklyReport from './WeeklyReport.js';
import MonthlyReports from './MonthlyReports.js';

const ClockInReports = () => {
  const [viewMode, setViewMode] = useState('daily');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/employees'); 
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setError(error);
  //     }
  //   };
    
  //   fetchData();
  // }, []);


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
        <button
          className={`tab-btn ${viewMode === 'monthly' ? 'active' : ''}`}
          onClick={() => setViewMode('monthly')}
        >
          Monthly
        </button>
      </div>

      {viewMode === 'daily' ? <DailyReport data={data} /> : (viewMode === 'weekly' ? <WeeklyReport data={data} /> : <MonthlyReports data={data} />)}
      </div>
      
    </div>
  );
};

export default ClockInReports;