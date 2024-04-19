import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUsers,faCircleUser,faList ,faClipboardUser,faGauge,faUserTie,faCalendarWeek,faCalendarCheck,faUsersGear,faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import { IdContext } from '../Registration/Contextapi';

import { useContext } from 'react';

export default function AdminSidebar() {
  const { uuid } = useContext(IdContext);
  return (
    <div className='sidebar'>
      {/* <Link to='/employee-list'>Employee List </Link>
      <Link to="/client"> 
      <div className='sidebars'><FontAwesomeIcon icon={faUser} className='icon' /> Client List</div>
      </Link>
      <Link to='/leave-list'>Leave List</Link> */}

      <NavLink to={`/admin-dashboard/${uuid}`} className='items' activeclassname="active">
      <FontAwesomeIcon icon={faGauge} className='icon'/> Dashboard
      </NavLink>

      <NavLink to={`/employee/${uuid}`} className='items' activeclassname="active">
        <div className='sidebars'><FontAwesomeIcon icon={faCircleUser} className='icon' />Profile</div>
      </NavLink>

      <NavLink to='/employee-list' className='items' activeclassname="active">
        <FontAwesomeIcon icon={faUsers} className='icon'/>Employees 
      </NavLink>

      <NavLink to="/client" className='items' activeclassname="active"> 
        <div className='sidebars' ><FontAwesomeIcon icon={faUsersGear} className='icon'/> Clients </div>
      </NavLink>

      <NavLink to='/leave-list' className='items' activeclassname="active">
    <FontAwesomeIcon icon={faCalendarCheck}  className='icon' />Leaves</NavLink>

      <NavLink to={`/client-list/${uuid}`} className='items' activeclassname="active"> 
        <div className='sidebars'><FontAwesomeIcon icon={faUserTie} className='icon' /> Client </div>
      </NavLink>

      <NavLink to={`/leave/${uuid}`} className='items' activeclassname="active">
      <FontAwesomeIcon icon={faCalendarWeek} className='icon' />Leave Request</NavLink>

      {/* <NavLink to='/leave-list' className='items' activeClassName="active">
     <img src={approval} style={{width:'25px'}} className='icon' /><FontAwesomeIcon icon={faCalendarCheck} />Leaves</NavLink> */}
    

      {/* <Link to='/Example'>Example</Link> */}

      <NavLink to={`/todo-list/${uuid}`} className='items' activeclassname="active">
      <FontAwesomeIcon icon={faList} className='icon' />To Do</NavLink>

      <NavLink to={`/reports/${uuid}`} className='items' activeclassname="active"> 
      <FontAwesomeIcon icon={faClipboardCheck} className='icon' />Task Reports</NavLink>

      <NavLink to={`/clockin-reports/${uuid}`} className='items' activeclassname="active">
      <FontAwesomeIcon icon={faClipboardUser} className='icon' />Attendance</NavLink>

    </div>
  )
}
