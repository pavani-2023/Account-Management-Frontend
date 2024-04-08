import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IdContext } from '../Registration/Contextapi';
import { useContext } from 'react';

export default function AdminSidebar() {
  return (
    <div className='sidebar'>
      <Link to='/employee-list'>Employee List </Link>
      <Link to="/client"> 
      <div className='sidebars'><FontAwesomeIcon icon={faUser} className='icon' /> Client List</div>
      </Link>
      <Link to='/leave-list'>Leave List</Link>
    </div>
  )
}
