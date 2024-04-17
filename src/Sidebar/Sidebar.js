import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IdContext } from '../Registration/Contextapi';
import { useContext } from 'react';

export default function Sidebar() {
  const { uuid } = useContext(IdContext);
  // const uuid = sessionStorage.getItem('uuid');
  return (
    <div className='sidebar'>
       <Link to={`/employee/${uuid}`}>
        <div className='sidebars'><FontAwesomeIcon icon={faUsers} className='icon'/> Employee</div>
      </Link>
      <Link to='/employee-list'>Employee List </Link>
      <Link to="/client"> 
      <div className='sidebars'><FontAwesomeIcon icon={faUser} className='icon' /> Client List</div></Link>
      <Link to={`/client-list/${uuid}`}> 
      <div className='sidebars'><FontAwesomeIcon icon={faUser} className='icon' /> Client </div></Link>
      <Link to={`/leave/${uuid}`}>Leave</Link>
      <Link to='/leave-list'>Leave List</Link>
      <Link to='/Example'>Example</Link>
      <Link to={`/todo-list/${uuid}`}>To Do</Link>
      <Link to={`/reports/${uuid}`}>Task Reports</Link>
      <Link to={`/clockin-reports/${uuid}`}>Clock-In Reports</Link>
      
    </div>
  )
}



