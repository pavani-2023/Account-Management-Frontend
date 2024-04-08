// Dashboard.js

import React, { useContext } from 'react';
import { IdContext } from '../Contextapi';
import { ROLES } from './Roles';

const Dashboard = () => {
  const { user } = useContext(IdContext);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user.role === ROLES.ADMIN && (
        <div>
          {/* Admin-specific UI */}
        </div>
      )}
      {user.role === ROLES.USER && (
        <div>
          {/* User-specific UI */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
