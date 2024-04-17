import React, { useState } from 'react'
import { useEffect } from 'react'
import './ClientDasboard.css'
import ClockInTable from './ClockInTable'
import LeaveAdmin from '../Leave/LeaveAdmin'
import LeaveStatus from './Leaves/LeaveStatus'
import Reports from './Reports'

export default function ClientDashboard() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleFormOpen = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };
 
  return (
    <div className='client-container'>
      <div className='clockin-status'>
         <ClockInTable/>

      </div>
      <div className='leave-status'>
        <div className='leave-status-container'>
        <LeaveStatus/>
        </div>
         {/* <LeaveAdmin/> */}
         
      </div>
      <div className='clockin-reports'>
      <button onClick={handleFormOpen}>View Reports Here</button>

          {showOverlay && (
            <div className="overlay">
              <div className="overlay-content">
              <span className="close-btn" onClick={handleOverlayClose}>&times;</span>
                {/* <button className="close-btn" onClick={handleOverlayClose}>Close</button> */}
                <Reports/>
              </div>
            </div>
          )}

     
      </div>
     
    </div>
  )
}
