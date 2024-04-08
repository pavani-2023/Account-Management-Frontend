import React from 'react'
import './DailyReport.css'
import WeeklyReport from './WeeklyReport';
import DailyReport from './DailyReport';
import axios from 'axios';
import { useEffect,useState } from 'react';

export default function Report() {
  const [viewMode, setViewMode] = useState('daily');
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/employees'); 
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='Main-Container'>
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
  );
}