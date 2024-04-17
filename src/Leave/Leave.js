// import LeaveList from './Components/LeaveList';
import LeaveList from './LeaveList';
import LeaveApplication from './LeaveApplication';
import { useState } from 'react';
import './Leave.css'

function Leave() {

  const [showNewForm, setShowNewForm] = useState(false);

  const handleNewFormClick = () => {
    setShowNewForm(true);
  };

  const handleCloseForm = () => {
    setShowNewForm(false);
  };

  return (
    <>
      <div className='Main-Container'>
        <div className='container'>
        <button onClick={handleNewFormClick}>Leave Application Form</button>
        {showNewForm && (
          <div className='overlay'>
            <LeaveApplication 
              show={showNewForm} 
              onClose={handleCloseForm}
              className='modal-form'
              style={{ display: showNewForm ? 'block' : 'none' }}
              />
          </div>
        )}
      <LeaveList/>
        </div>
       
      </div>
      
    </>
  )
}

export default Leave