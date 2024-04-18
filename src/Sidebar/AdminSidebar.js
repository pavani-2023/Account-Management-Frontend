import React from 'react'
import './Sidebar.css'
import { Link ,NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers,faCircleUser,faList ,faClipboardUser,faGauge,faUserTie,faCalendarWeek,faCalendarCheck,faUsersGear,faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import { IdContext } from '../Registration/Contextapi';
import icon from  './icons/to-do-list.png'
// import icon2 from './icons/todo.svg'
import approval from './icons/approval2.svg'

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

      <NavLink to={`/admin-dashboard/${uuid}`} className='items' activeClassName="active">
      <FontAwesomeIcon icon={faGauge} className='icon'/> Dashboard
      </NavLink>

      <NavLink to={`/employee/${uuid}`} className='items' activeClassName="active">
        <div className='sidebars'><FontAwesomeIcon icon={faCircleUser} className='icon' />Profile</div>
      </NavLink>

      <NavLink to='/employee-list' className='items' activeClassName="active">
        <FontAwesomeIcon icon={faUsers} className='icon'/>Employees 
      </NavLink>

      <NavLink to="/client" className='items' activeClassName="active"> 
        <div className='sidebars' ><FontAwesomeIcon icon={faUsersGear} className='icon'/> Clients </div>
      </NavLink>

      <NavLink to='/leave-list' className='items' activeClassName="active">
    <FontAwesomeIcon icon={faCalendarCheck}  className='icon' />Leaves</NavLink>

      <NavLink to={`/client-list/${uuid}`} className='items' activeClassName="active"> 
        <div className='sidebars'><FontAwesomeIcon icon={faUserTie} className='icon' /> Client </div>
      </NavLink>

      <NavLink to={`/leave/${uuid}`} className='items' activeClassName="active">
      <FontAwesomeIcon icon={faCalendarWeek} className='icon' />Leave Request</NavLink>

      {/* <NavLink to='/leave-list' className='items' activeClassName="active">
     <img src={approval} style={{width:'25px'}} className='icon' /><FontAwesomeIcon icon={faCalendarCheck} />Leaves</NavLink> */}
    

      {/* <Link to='/Example'>Example</Link> */}

      <NavLink to={`/todo-list/${uuid}`} className='items' activeClassName="active">
      <FontAwesomeIcon icon={faList} className='icon' />To Do</NavLink>

      <NavLink to={`/reports/${uuid}`} className='items' activeClassName="active"> 
      <FontAwesomeIcon icon={faClipboardCheck} className='icon' />Task Reports</NavLink>

      <NavLink to={`/clockin-reports/${uuid}`} className='items' activeClassName="active">
      <FontAwesomeIcon icon={faClipboardUser} className='icon' />Attendance</NavLink>

    </div>
  )
}
