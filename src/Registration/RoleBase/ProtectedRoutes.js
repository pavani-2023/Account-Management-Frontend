// ProtectedRoute.js

import React from 'react';
import { useContext } from 'react';
import {  useLocation,Route, Redirect, useNavigate, Outlet} from 'react-router-dom';
import { IdContext } from '../Contextapi';
import { ROLES } from './Roles';
import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
//   const { user } = useContext(IdContext)
//   const navigate = useNavigate();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user && user.role === requiredRole ? (
//           <Component {...props} />
//         ) : (
//           <navigate to="/unauthorized" />
//         )
//       }
//     />
//   );
// };
const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userRole = sessionStorage.getItem('role');

  const location = useLocation();

  if (!userRole) {
    // User is not authenticated
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // User role is not allowed
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // User is authenticated and has required role
  return <Outlet />;
};



export default ProtectedRoute;

