

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, } from 'react';
import { useEffect } from 'react';
// import { supabase } from './Registration/supabase';
import{ IdProvider } from './Registration/Contextapi';
import './App.css'
// import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Employee from './Employee/Employee';
import Client from './Client/Client';
import Signup from './Registration/Signup';
import Signin from './Registration/Signin';
import TodoList from './TODO/TodoList';
import EmployeeList from './Employee List/EmployeeList';
import ClientListTable from './Client/ClientLIst';
import Report from './DailyReport/Report';
import ClockInReports from './ClockinReports/ClockInReport';
import Unauthorized from './Registration/RoleBase/Unauthorized';
import ProtectedRoute from './Registration/RoleBase/ProtectedRoutes';


import Leave from './Leave/Leave';
import AdminPage from './Registration/RoleBase/AdminPage';
import LeaveAdmin from './Leave/LeaveAdmin';
import UserSidebar from './Sidebar/UserSidebar';
import AdminSidebar from './Sidebar/AdminSidebar';


import ClientDashboard from './Dashboard/Client-Dashboard/ClientDashboard';
import AdminDashboard from './Dashboard/Admin-Dashboard/AdminDashboard';


function App() {
  const [userRole, setUserRole] = useState(null);

  // Fetch user role from session storage
  useEffect(() => {
    const role = sessionStorage.getItem('role');
    setUserRole(role);
  }, [userRole]);



  return (
    <BrowserRouter>
      <IdProvider>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path='/' element={<Signin />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
          </Routes>

          <div>
            
          </div>
          <div className="content">
           
           
             <Header />
       
             {userRole === 'User' ? <UserSidebar /> : 
               userRole === 'Admin' ? <AdminSidebar /> : 
               userRole === 'Client' ? null :null
              }
            <Routes>
              <Route path="/employee/:uuid" element={<Employee />} />
              <Route path="/client" element={<Client />} />
              <Route path="/client-list/:uuid" element={<ClientListTable />} />
              <Route path="/leave/:uuid" element={<Leave />} />
              <Route path="/todo-list/:uuid" element={<TodoList />} />
              <Route path="/employee-list" element={<EmployeeList />} />
              <Route path='/reports/:uuid' element={<Report />} />
              <Route path='/clockin-reports/:uuid' element={<ClockInReports />} />
              <Route path='/leave-list' element={<LeaveAdmin />} />
              <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                <Route path="/admin-page" element={<AdminPage />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                <Route path="/admin-dashboard/:uuid" element={<AdminDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['User']} />}>
                <Route path="/employee/:uuid" element={<Employee />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['Client']} />}>
                <Route path='/client-dashboard/:uuid' element={<ClientDashboard/>}/>
              </Route>
            </Routes>
          </div>
          <Routes>
          
          </Routes>
        </div>
      </IdProvider>
    </BrowserRouter>

  );
}

export default App;