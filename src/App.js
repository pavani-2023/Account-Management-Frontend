// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { useContext,useEffect } from 'react';
// import { Audio } from 'react-loader-spinner'
// // import { supabase } from './Registration/supabase';
// import './App.css'
// import Sidebar from './Sidebar/Sidebar';
// import Header from './Header/Header';
// import Employee from './Employee/Employee';
// import Client from './Client/Client';
// import Signup from './Registration/Signup';
// import Signin from './Registration/Signin';
// import Example from './Client/Example';
// import TodoList from './TODO/TodoList';
// import EmployeeList from './Employee List/EmployeeList';
// import{ IdProvider,IdContext } from './Registration/Contextapi';
// import { useState } from 'react';
// import AllEmployees from './Employee List/AllEmployees';


// import Leave from './Leave/Leave';
// function App() {

//   // const { uuid } = useContext(IdContext);
//   const [loading, setLoading] = useState(true);
//   // const [data, setData] = useState([]);
//   useEffect(() => {
//     setTimeout(()=>{
//       setLoading(false);
//     },2000)
//   }, []);
  
//   return (

//     <BrowserRouter>
      
//       <IdProvider>
       
//         <div className="App">
        
        
//         <Routes>
//           {/* <Route path="/" element={<Signup/>} /> */}
//           <Route path='/' element={<Signin/>}/>
//         </Routes>
        
        
//           <div className="content">
//           <Header />
          
//             <Sidebar />
//             {loading?(
//           <Audio type="Puff" height="80"
//   width="80"
//   radius="9"
//   color="green"
//   ariaLabel="loading"
//   wrapperStyle
//   wrapperClass />
//         ):(
        
//             <div>
//             <Routes>
//                 <Route path= "/employee/:uuid" element={[<Employee/>]} />
//                 {/* <Route path={`/employee/:uuid`} element={[<Employee/>]} /> */}
//                 <Route path="/client" element={<Client/>} />
//                 <Route path="/leave" element={<Leave/>} />
//                 <Route path="/Example" element={<Example/>} />
//                 <Route path="/todo-list" element={<TodoList/>} />
//                 <Route path="/employee-list" element={<EmployeeList/>}/>
//                 <Route path="/employee-lists" element={<AllEmployees/>}/>
//             </Routes>

//             </div>)}
            
            
//           </div>
//         </div>
//       </IdProvider>
     
//     </BrowserRouter>
    
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useContext,useState, } from 'react';
import { useEffect } from 'react';
// import { supabase } from './Registration/supabase';
import{ IdProvider,IdContext } from './Registration/Contextapi';
import './App.css'
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Employee from './Employee/Employee';
import Client from './Client/Client';
import Signup from './Registration/Signup';
import Signin from './Registration/Signin';
import Example from './Client/Example';
import TodoList from './TODO/TodoList';
import EmployeeList from './Employee List/EmployeeList';
import ClientListTable from './Client/ClientLIst';
import Report from './DailyReport/Report';
import ClockInReports from './ClockinReports/ClockInReport';
import Unauthorized from './Registration/RoleBase/Unauthorized';
import { ROLES } from './Registration/RoleBase/Roles';
import ProtectedRoute from './Registration/RoleBase/ProtectedRoutes';


import Leave from './Leave/Leave';
import AdminPage from './Registration/RoleBase/AdminPage';
import UserPage from './Registration/RoleBase/UserPage';
import LeaveAdmin from './Leave/LeaveAdmin';
import UserSidebar from './Sidebar/UserSidebar';
import AdminSidebar from './Sidebar/AdminSidebar';

import Loader from './Registration/RoleBase/Loader';
import ClientDashboard from './Client-Dashboard/ClientDashboard';
// function App() {

//   // const { uuid } = useContext(IdContext);
//   const userRole = sessionStorage.getItem('role');
//   console.log('userRole',userRole === 'User' ? true : false)
//   console.log('userrole',userRole)
//   return (

//     <BrowserRouter>
      
//       <IdProvider>
//       <div className="App">
        
        
//         <Routes>
//           <Route path="/signup" element={<Signup/>} />
//           <Route path='/' element={<Signin/>}/>
//           <Route path='/unauthorized' element={<Unauthorized/>}/>
//         </Routes>
        
           
        
//           <div className="content">
//           <Header />
//          {/* <Sidebar/> */}
//           {/* {userRole === 'User' ? <UserSidebar /> : <AdminSidebar />} */}
//           {userRole === 'User' ? <UserSidebar /> : 
//               userRole === 'Admin' ? <AdminSidebar /> : null
//             }
//             <Routes>
           
//             <Route path= "/employee/:uuid" element={[<Employee/>]} />
//               {/* <Route path={`/employee/:uuid`} element={[<Employee/>]} /> */}
//               <Route path="/client" element={<Client/>} />
//               <Route path="/client-list/:uuid" element={<ClientListTable/>} />
//               <Route path="/leave/:uuid" element={<Leave/>} />
//               <Route path="/Example" element={<Example/>} />
//               <Route path="/todo-list/:uuid" element={<TodoList/>} />
//               <Route path="/employee-list" element={<EmployeeList/>}/>
//               <Route path='/reports/:uuid' element={<Report/>}/>
//               <Route path='/clockin-reports/:uuid' element={<ClockInReports/>}/>
//               <Route path='/leave-list' element={<LeaveAdmin/>}/>
//               <Route element={<ProtectedRoute allowedRoles={['Admin']}/>}>
//               <Route  path="/admin-page" element={<AdminPage/>}/>
//             </Route>
            
//             <Route element={<ProtectedRoute allowedRoles={['User']}/>}>
//               <Route  path="/employee/:uuid" element={<Employee/>}/>
//             </Route>
//             </Routes>
            
//           </div>
//         </div>
//       </IdProvider>
     
//     </BrowserRouter>


    
//   );
// }
function App() {
  const [userRole, setUserRole] = useState(null);

  // Fetch user role from session storage
  useEffect(() => {
    const role = sessionStorage.getItem('role');
    setUserRole(role);
  }, []);



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
             {/* <Sidebar/> */}
             {userRole === 'User' ? <UserSidebar /> : 
               userRole === 'Admin' ? <AdminSidebar /> : 
               userRole === 'Client' ? null :null
              }
            <Routes>
              <Route path="/employee/:uuid" element={<Employee />} />
              <Route path="/client" element={<Client />} />
              <Route path="/client-list/:uuid" element={<ClientListTable />} />
              <Route path="/leave/:uuid" element={<Leave />} />
              <Route path="/Example" element={<Example />} />
              <Route path="/todo-list/:uuid" element={<TodoList />} />
              <Route path="/employee-list" element={<EmployeeList />} />
              <Route path='/reports/:uuid' element={<Report />} />
              <Route path='/clockin-reports/:uuid' element={<ClockInReports />} />
              <Route path='/leave-list' element={<LeaveAdmin />} />
              <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                <Route path="/admin-page" element={<AdminPage />} />
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


    // <BrowserRouter>
    //   <IdProvider>
    //     <div className="App">
    //       <Routes>
    //         <Route path="/signup" element={<Signup />} />
    //         <Route path='/' element={<Signin />} />
    //         <Route path='/unauthorized' element={<Unauthorized />} />
    //       </Routes>

    //       <div className='main-component'>
    //         <div className='menu-sidebar'>
    //         {userRole === 'User' ? <UserSidebar /> : 
    //            userRole === 'Admin' ? <AdminSidebar /> : null
    //          }
    //         </div>
    //         <div className="content sub-component">
           
           
    //          <Header />
    //         <Routes>
    //           <Route path="/employee/:uuid" element={<Employee />} />
    //           <Route path="/client" element={<Client />} />
    //           <Route path="/client-list/:uuid" element={<ClientListTable />} />
    //           <Route path="/leave/:uuid" element={<Leave />} />
    //           <Route path="/Example" element={<Example />} />
    //           <Route path="/todo-list/:uuid" element={<TodoList />} />
    //           <Route path="/employee-list" element={<EmployeeList />} />
    //           <Route path='/reports/:uuid' element={<Report />} />
    //           <Route path='/clockin-reports/:uuid' element={<ClockInReports />} />
    //           <Route path='/leave-list' element={<LeaveAdmin />} />
    //           <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
    //             <Route path="/admin-page" element={<AdminPage />} />
    //           </Route>
    //           <Route element={<ProtectedRoute allowedRoles={['User']} />}>
    //             <Route path="/employee/:uuid" element={<Employee />} />
    //           </Route>
    //         </Routes>
    //       </div>
    //       </div>
          
          
    //     </div>
    //   </IdProvider>
    // </BrowserRouter> 
  );
}

export default App;