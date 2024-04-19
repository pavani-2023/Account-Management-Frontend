// ProtectedRoute.js

import React from 'react';
import {  useLocation, Outlet} from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userRole = sessionStorage.getItem('role');

  const location = useLocation();

  if (!userRole) {

    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {

    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }


  return <Outlet />;
};



export default ProtectedRoute;

