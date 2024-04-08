import React from 'react'
import  './Sidebar.css'
import { Link ,NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IdContext } from '../Registration/Contextapi';
import { useContext } from 'react';

export default function UserSidebar() {
  const { uuid } = useContext(IdContext);
  return (
    <div className='sidebar'>
      <NavLink to={`/employee/${uuid}`} className='items' activeClassName="active">
        <div className='sidebars'><FontAwesomeIcon icon={faUsers} className='icon'/> Employee</div>
      </NavLink>
      <NavLink to={`/client-list/${uuid}`}  className='items' activeClassName="active"> 
      <div className='sidebars'><FontAwesomeIcon icon={faUser} className='icon' /> Client </div>
      </NavLink>
      <NavLink to={`/leave/${uuid}`} className='items' activeClassName="active">Leave</NavLink>
      <NavLink to={`/todo-list/${uuid}`}  className='items' activeClassName="active">To Do</NavLink>
      <NavLink to={`/reports/${uuid}`}  className='items' activeClassName="active">Reports</NavLink>
      <NavLink to={`/clockin-reports/${uuid}`}  className='items' activeClassName="active">Clock-In Reports</NavLink>
    </div>
  )
}
