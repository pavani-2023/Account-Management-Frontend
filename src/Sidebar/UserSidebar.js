import React from 'react'
import  './Sidebar.css'
import { Link ,NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie,faCircleUser,faCalendarWeek,faList,faClipboardCheck,faClipboardUser} from '@fortawesome/free-solid-svg-icons';
import { IdContext } from '../Registration/Contextapi';
import { useContext } from 'react';

export default function UserSidebar() {
  const { uuid } = useContext(IdContext);
  return (
    <div className='sidebar'>
      
      <NavLink to={`/employee/${uuid}`} className='items' activeClassName="active">
        <div className='sidebars'><FontAwesomeIcon icon={faCircleUser} className='icon' />Profile</div>
      </NavLink>
      <NavLink to={`/client-list/${uuid}`}  className='items' activeClassName="active"> 
      <div className='sidebars'><FontAwesomeIcon icon={faUserTie}  className='icon' /> Client </div>
      </NavLink>
      <NavLink to={`/leave/${uuid}`} className='items' activeClassName="active">
        <FontAwesomeIcon icon={faCalendarWeek} className='icon' />Leave
      </NavLink>
      <NavLink to={`/todo-list/${uuid}`}  className='items' activeClassName="active">
        <FontAwesomeIcon icon={faList} className='icon' />To Do
      </NavLink>
      <NavLink to={`/reports/${uuid}`}  className='items' activeClassName="active">
        <FontAwesomeIcon icon={faClipboardCheck} className='icon' />Task Reports</NavLink>
      <NavLink to={`/clockin-reports/${uuid}`}  className='items' activeClassName="active">
        <FontAwesomeIcon icon={faClipboardUser} className='icon' />Attendance
      </NavLink>
    </div>
  )
}
