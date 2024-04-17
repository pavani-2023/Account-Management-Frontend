import React from 'react'
import './Sidebar.css'
import { Link ,NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers,faCircleUser } from '@fortawesome/free-solid-svg-icons';
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

      <NavLink to={`/employee/${uuid}`} className='items' activeClassName="active">
        <div className='sidebars'><FontAwesomeIcon icon={faCircleUser} className='icon' />Profile</div>
      </NavLink>

      <NavLink to='/employee-list' className='items' activeClassName="active">
        <FontAwesomeIcon icon={faUsers} className='icon'/>Employee List 
      </NavLink>

      <NavLink to="/client" className='items' activeClassName="active"> 
        <div className='sidebars' ><FontAwesomeIcon icon={faUser} className='icon' /> Client List</div>
      </NavLink>

      <NavLink to={`/client-list/${uuid}`} className='items' activeClassName="active"> 
        <div className='sidebars'><FontAwesomeIcon icon={faUser} className='icon' /> Client </div>
      </NavLink>

      <NavLink to={`/leave/${uuid}`} className='items' activeClassName="active">Leave</NavLink>

      <NavLink to='/leave-list' className='items' activeClassName="active">Leave List</NavLink>

      {/* <Link to='/Example'>Example</Link> */}

      <NavLink to={`/todo-list/${uuid}`} className='items' activeClassName="active">To Do</NavLink>

      <NavLink to={`/reports/${uuid}`} className='items' activeClassName="active">Reports</NavLink>

      <NavLink to={`/clockin-reports/${uuid}`} className='items' activeClassName="active">Attendance</NavLink>

    </div>
  )
}
