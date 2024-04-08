// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const DailyReport = () => {
//   const [clockedIn, setClockedIn] = useState(false);
//   const [employeeId, setEmployeeId] = useState('');
//   const [employeeName, setEmployeeName] = useState('');
//   const [department, setDepartment] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [date, setDate] = useState('');
//   const [weekday, setWeekday] = useState('');

//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = formatDate(currentDate);
//     const dayOfWeek = getDayOfWeek(currentDate.getDay());

//     setDate(formattedDate);
//     setWeekday(dayOfWeek);
//   }, []);

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const getDayOfWeek = (dayIndex) => {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     return days[dayIndex];
//   };

//   const clockInOut = () => {
//     const currentDate = new Date();
//     const hours = currentDate.getHours();
//     const minutes = currentDate.getMinutes();
//     const seconds = currentDate.getSeconds();
//     const formattedTime = padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);

//     if (!clockedIn) {
//       // Implement check-in functionality here
//     } else {
//       // Implement check-out functionality here
//     }
//   };

//   const padZero = (number) => {
//     return (number < 10 ? '0' : '') + number;
//   };

//   const searchEmployeeInfo = () => {
//     const empId = employeeId.trim();

//     if (empId.substring(0, 5) === "RTE00") {
//       axios.get(`http://localhost:8000/employee/${empId}`)
//         .then((response) => {
//           const fullName = `${response.data.firstName} ${response.data.lastName}`;
//           setEmployeeName(fullName);
//           setDepartment(response.data.department);
//           setDesignation(response.data.designation);
//         })
//         .catch((error) => {
//           console.error('Error searching for employee information:', error);
//           alert('Failed to search for employee information. Please check the console for details.');
//         });
//     } else {
//       showPopupWithEmoji();
//     }
//   };

//   const showPopupWithEmoji = () => {
//     // Implement popup functionality here
//   };

//   return (
//     <div>
//       <div id="header-container">
//         <div id="title">
//           <h2>Daily Clock-In/Clock-Out</h2>
//         </div>
//         {/* <div id="menu-bar" className="topnav">
//           <ul>
//             <li><a className="active" href="dailyclockin.html">Daily</a></li>
//             <li><a href="weeklyclockin.html">Weekly</a></li>
//             <li><a href="monthlyclockin.html">Monthly</a></li>
//           </ul>
//         </div> */}
//       </div>
//       <div id="employeeInfo">
//         <div>
//           <label htmlFor="eid">Employee Id:</label>
//           <div style={{ position: 'relative' }}>
//             <input
//               type="text"
//               id="eid"
//               name="eid"
//               placeholder="Enter Employee ID"
//               required
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//             />
//             <div className="search-icon" onClick={searchEmployeeInfo}>
//               <i className="fas fa-search"></i>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="date">Date:</label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="weekday">Week Day:</label>
//           <input
//             type="text"
//             id="weekday"
//             name="weekday"
//             placeholder="Enter week day"
//             readOnly
//           />
//         </div>
//         <div>
//           <label htmlFor="ename">Employee Name:</label>
//           <input
//             type="text"
//             id="ename"
//             name="fname"
//             placeholder="Enter Employee Name"
//             value={employeeName}
//             readOnly
//             className="disabled-input"
//           />
//         </div>
//         <div>
//           <label htmlFor="department">Department:</label>
//           <input
//             type="text"
//             id="department"
//             name="department"
//             placeholder="Enter Department"
//             value={department}
//             readOnly
//             className="disabled-input"
//           />
//         </div>
//         <div>
//           <label htmlFor="designation">Designation:</label>
//           <input
//             type="text"
//             id="designation"
//             name="designation"
//             placeholder="Enter Designation"
//             value={designation}
//             readOnly
//             className="disabled-input"
//           />
//         </div>
//       </div>
//       <button onClick={clockInOut}>{clockedIn ? "Clock out" : "Clock in"}</button>
//       <table>
//         <thead>
//           <tr>
//             <th style={{ width: '15%' }}>Date</th>
//             <th style={{ width: '15%' }}>Day</th>
//             <th style={{ width: '10%' }}>Clock-In</th>
//             <th style={{ width: '10%' }}>Clock-Out</th>
//             <th style={{ width: '20%' }}>Total No.of Hours</th>
//             <th style={{ width: '30%' }}>Comments</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Table rows will be added here */}
//         </tbody>
//       </table>
//     </div>
//   );
// };



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import './dailyclockin.css';
// import { useParams } from 'react-router-dom';
// function DailyReport() {
//   const { uuid } = useParams();
//     const [clockData, setClockData] = useState({ employeeId: uuid, employeeName: '', department: '', designation: '', date: '', weekday: '', clockInTime: '', clockOutTime: '', totalHours: 0, totalMinutes: 0, comments: '' });
//     const [clockedIn, setClockedIn] = useState(false);

//     console.log(clockData);


//     useEffect(()=>{
//       getemployeeDetails();
//     },[])
//     const getemployeeDetails=async()=>{
//       try {
//         const response = await axios.get(`http://localhost:5000/getemployeeDetails/${uuid}`);
//         const data = response.data
//         console.log('response',response.data)
//         setClockData(prevState => ({
//           ...prevState,
//           employeeName: data.EmployeeName,
//           department: data.dep,
//           designation: data.Designation,
         
//         }));
           
//       }catch(error){
//         console.log('error fetching employeedetails',error)
//       }
//     }
//     useEffect(() => {
//         const currentDate = new Date();
//         const formattedDate = formatDate(currentDate);
//         const currentWeekday = getDayOfWeek(currentDate.getDay());

//         setClockData(prevState => ({
//             ...prevState,
//             date: formattedDate,
//             weekday: currentWeekday,
//         }));
//     }, []);

//     const formatDate = (date) => {
//         const year = date.getFullYear();
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const day = date.getDate().toString().padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     };

//     const getDayOfWeek = (dayIndex) => {
//         const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//         return days[dayIndex];
//     };

//     const padZero = (number) => {
//         return (number < 10 ? '0' : '') + number;
//     };

//     const searchEmployeeInfo = () => {
//         console.log("Search Function")
//     };

// const clockInOut = () => {
//     if (clockData.employeeId.trim() === '') {
//         return;
//     }

//     const currentTime = new Date();
//     const formattedTime = `${padZero(currentTime.getHours())}:${padZero(currentTime.getMinutes())}`;

//     if (!clockedIn) {
//         const clockInTime = new Date(`2000-01-01T${formattedTime}`);
//         const defaultClockInTime = new Date(`2000-01-01T04:00`);
//         const timeDifference = clockInTime - defaultClockInTime;
//         const lateOrEarly = timeDifference >= 0 ? 'late' : 'early';
//         const totalHours = Math.abs(Math.floor(timeDifference / (1000 * 60 * 60)));
//         const totalMinutes = Math.abs(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));

//         const clockInComment = `You clocked in by ${totalHours} hour${totalHours !== 1 ? 's' : ''} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''} ${lateOrEarly}`;

//         setClockData(prevState => {
//             const updatedComments = prevState.comments ? `${prevState.comments} | ${clockInComment}` : clockInComment;
//             return {
//                 ...prevState,
//                 clockInTime: formattedTime,
//                 comments: updatedComments
//             };
//         });

//         setClockedIn(true);

//         axios.post('http://localhost:5000/dailyclockin-clockout', {
//             ...clockData,
//             employeeId:clockData.employeeId,
//             clockInTime: formattedTime,
//             comments: clockInComment
//         })
//         .then(response => {
//             console.log('Clock in data sent successfully:', response.data);
//         })
//         .catch(error => {
//             console.error('Error sending clock in data:', error);
//         });
//     } else {
//         const clockOutTime = new Date(`2000-01-01T${formattedTime}`);
//         const defaultClockOutTime = new Date(`2000-01-01T13:00`);
//         const timeDifference = clockOutTime - defaultClockOutTime;
//         const lateOrEarly = timeDifference >= 0 ? 'early' : 'late';
//         const totalHours = Math.abs(Math.floor(timeDifference / (1000 * 60 * 60)));
//         const totalMinutes = Math.abs(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));

//         const clockOutComment = `You clocked out by ${totalHours} hour${totalHours !== 1 ? 's' : ''} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''} ${lateOrEarly}`;

//         setClockData(prevState => {
//             const updatedComments = prevState.comments ? `${prevState.comments} | ${clockOutComment}` : clockOutComment;
//             return {
//                 ...prevState,
//                 clockOutTime: formattedTime,
//                 comments: updatedComments
//             };
//         });

//         setClockedIn(false);

//         axios.post('http://localhost:5000/dailyclockin-clockout', {
//             ...clockData,
//             clockOutTime: formattedTime,
//             comments: clockOutComment
//         })
//         .then(response => {
//             console.log('Clock out data sent successfully:', response.data);
//         })
//         .catch(error => {
//             console.error('Error sending clock out data:', error);
//         });
//     }
// };


//     const calculateTotalHours = () => {
//         if (!clockData.clockInTime || !clockData.clockOutTime) {
//             return '';
//         }

//         const clockIn = new Date(`2000-01-01T${clockData.clockInTime}`);
//         const clockOut = new Date(`2000-01-01T${clockData.clockOutTime}`);

//         const timeDifference = clockOut - clockIn;
//         const totalHours = Math.floor(timeDifference / (1000 * 60 * 60));
//         const totalMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

//         return `${totalHours} hour${totalHours !== 1 ? 's' : ''} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
//     };

//     return (
//         <div>
//             <div id='header-container'>
//                 <div id='title'>
//                     <h2>Daily Clock-In / Clock-out</h2>
//                 </div>
//             </div>
//             <div id='employeeInfo'>
//                 <div>
//                     <label htmlFor="eid">Employee Id:</label>
//                     <div style={{ position: 'relative' }}>
//                         <input type="text" id='eid' name='eid' placeholder='Enter Employee ID' required value={clockData.employeeId} onChange={(e) => setClockData(prevState => ({ ...prevState, employeeId: e.target.value }))} />
//                         <div className='search-icon' onClick={searchEmployeeInfo}>
//                             <i className='fas fa-search'></i>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="date">Date:</label>
//                     <input type="date" id="date" name="date" value={clockData.date} onChange={(e) => setClockData(prevState => ({ ...prevState, date: e.target.value }))} required />
//                 </div>
//                 <div>
//                     <label htmlFor="weekday">Week Day:</label>
//                     <input type="text" id="weekday" name="weekday" value={clockData.weekday} readOnly />
//                 </div>
//                 <div>
//                     <label htmlFor="ename">Employee Name:</label>
//                     <input type="text" id="ename" name="fname" placeholder="Enter Employee Name" value={clockData.employeeName} readOnly className="disabled-input" />
//                 </div>
//                 <div>
//                     <label htmlFor="department">Department:</label>
//                     <input type="text" id="department" name="department" placeholder="Enter Department" value={clockData.department} readOnly className="disabled-input" />
//                 </div>
//                 <div>
//                     <label htmlFor="designation">Designation:</label>
//                     <input type="text" id="designation" name="designation" placeholder="Enter Designation" value={clockData.designation} readOnly className="disabled-input" />
//                 </div>
//             </div>
//             <button onClick={clockInOut}>{clockedIn ? 'Clock Out' : 'Clock In'}</button>
//             <table>
//                 <thead>
//                     <tr>
//                         <th style={{ width: '15%' }}>Date</th>
//                         <th style={{ width: '15%' }}>Day</th>
//                         <th style={{ width: '15%' }}>Clock-In</th>
//                         <th style={{ width: '15%' }}>Clock-Out</th>
//                         <th style={{ width: '15%' }}>Total No.of Hours</th>
//                         <th style={{ width: '15%' }}>Comments</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{clockData.date}</td>
//                         <td>{clockData.weekday}</td>
//                         <td>{clockData.clockInTime}</td>
//                         <td>{clockData.clockOutTime}</td>
//                         <td>{calculateTotalHours()}</td>
//                         <td>{clockData.comments}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default DailyReport;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './dailyclockin.css';
import { useParams } from 'react-router-dom';

function DailyReport() {
    const { uuid } = useParams();
    console.log('uuid',uuid)
    const [clockData, setClockData] = useState({ employeeId: uuid, employeeName: '', department: '', designation: '', date: '', weekday: '', clockInTime: '', clockOutTime: '', totalHours: 0, totalMinutes: 0, comments: '' });
    const [clockedIn, setClockedIn] = useState(false);

    console.log(clockData);
    useEffect(()=>{
      getemployeeDetails();
    },[])
    const getemployeeDetails=async()=>{
      try {
        const response = await axios.get(`http://localhost:5000/getemployeeDetails/${uuid}`);
        const data = response.data
        console.log('response',response.data)
        setClockData(prevState => ({
          ...prevState,
          employeeName: data.EmployeeName,
          department: data.dep,
          designation: data.Designation,
         
        }));
           
      }catch(error){
        console.log('error fetching employeedetails',error)
      }
    }
    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const currentWeekday = getDayOfWeek(currentDate.getDay());

        setClockData(prevState => ({
            ...prevState,
            date: formattedDate,
            weekday: currentWeekday,
        }));
    }, []);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getDayOfWeek = (dayIndex) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayIndex];
    };

    const padZero = (number) => {
        return (number < 10 ? '0' : '') + number;
    };

    const searchEmployeeInfo = () => {
        console.log("Search Function")
    };

const clockInOut = () => {
    if (clockData.employeeId.trim() === '') {
        return;
    }

    const currentTime = new Date();
    const formattedTime = `${padZero(currentTime.getHours())}:${padZero(currentTime.getMinutes())}`;

    if (!clockedIn) {
        const clockInTime = new Date(`2000-01-01T${formattedTime}`);
        const defaultClockInTime = new Date(`2000-01-01T04:00`);
        const timeDifference = clockInTime - defaultClockInTime;
        const lateOrEarly = timeDifference >= 0 ? 'late' : 'early';
        const totalHours = Math.abs(Math.floor(timeDifference / (1000 * 60 * 60)));
        const totalMinutes = Math.abs(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));

        const clockInComment = `You clocked in by ${totalHours} hour${totalHours !== 1 ? 's' : ''} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''} ${lateOrEarly}`;

        setClockData(prevState => {
            const updatedComments = prevState.comments ? `${prevState.comments} | ${clockInComment}` : clockInComment;
            return {
                ...prevState,
                clockInTime: formattedTime,
                comments: updatedComments
            };
        });

        setClockedIn(true);

        axios.post('http://localhost:4000/api/reports/dailyclockin-clockout', {
            ...clockData,
            clockInTime: formattedTime,
            comments: clockInComment
        })
        .then(response => {
            console.log('Clock in data sent successfully:', response.data);
        })
        .catch(error => {
            console.error('Error sending clock in data:', error);
        });
    } else {
        const clockOutTime = new Date(`2000-01-01T${formattedTime}`);
        const defaultClockOutTime = new Date(`2000-01-01T13:00`);
        const timeDifference = clockOutTime - defaultClockOutTime;
        const lateOrEarly = timeDifference >= 0 ? 'early' : 'late';
        const totalHours = Math.abs(Math.floor(timeDifference / (1000 * 60 * 60)));
        const totalMinutes = Math.abs(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));

        const clockOutComment = `You clocked out by ${totalHours} hour${totalHours !== 1 ? 's' : ''} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''} ${lateOrEarly}`;

        setClockData(prevState => {
            const updatedComments = prevState.comments ? `${prevState.comments} | ${clockOutComment}` : clockOutComment;
            return {
                ...prevState,
                clockOutTime: formattedTime,
                comments: updatedComments
            };
        });

        setClockedIn(false);

        axios.post('http://localhost:4000/api/reports/dailyclockin-clockout', {
            ...clockData,
            clockOutTime: formattedTime,
            comments: clockOutComment
        })
        .then(response => {
            console.log('Clock out data sent successfully:', response.data);
        })
        .catch(error => {
            console.error('Error sending clock out data:', error);
        });
    }
};


    const calculateTotalHours = () => {
        if (!clockData.clockInTime || !clockData.clockOutTime) {
            return '';
        }

        const clockIn = new Date(`2000-01-01T${clockData.clockInTime}`);
        const clockOut = new Date(`2000-01-01T${clockData.clockOutTime}`);

        const timeDifference = clockOut - clockIn;
        const totalHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const totalMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return `${totalHours} hour${totalHours !== 1 ? 's' : ''} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
    };

    return (
        <div>
            <div id='header-container'>
                <div id='title'>
                    <h2>Daily Clock-In / Clock-out</h2>
                </div>
            </div>
            <div id='employeeInfo'>
                <div>
                    <label htmlFor="eid">Employee Id:</label>
                    <div style={{ position: 'relative' }}>
                        <input type="text" id='eid' name='eid' placeholder='Enter Employee ID' required value={clockData.employeeId} onChange={(e) => setClockData(prevState => ({ ...prevState, employeeId: e.target.value }))} />
                        <div className='search-icon' onClick={searchEmployeeInfo}>
                            <i className='fas fa-search'></i>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={clockData.date} onChange={(e) => setClockData(prevState => ({ ...prevState, date: e.target.value }))} required />
                </div>
                <div>
                    <label htmlFor="weekday">Week Day:</label>
                    <input type="text" id="weekday" name="weekday" value={clockData.weekday} readOnly />
                </div>
                <div>
                    <label htmlFor="ename">Employee Name:</label>
                    <input type="text" id="ename" name="fname" placeholder="Enter Employee Name" value={clockData.employeeName} readOnly className="disabled-input" />
                </div>
                <div>
                    <label htmlFor="department">Department:</label>
                    <input type="text" id="department" name="department" placeholder="Enter Department" value={clockData.department} readOnly className="disabled-input" />
                </div>
                <div>
                    <label htmlFor="designation">Designation:</label>
                    <input type="text" id="designation" name="designation" placeholder="Enter Designation" value={clockData.designation} readOnly className="disabled-input" />
                </div>
            </div>
            <button onClick={clockInOut}>{clockedIn ? 'Clock Out' : 'Clock In'}</button>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '15%' }}>Date</th>
                        <th style={{ width: '15%' }}>Day</th>
                        <th style={{ width: '15%' }}>Clock-In</th>
                        <th style={{ width: '15%' }}>Clock-Out</th>
                        <th style={{ width: '15%' }}>Total No.of Hours</th>
                        <th style={{ width: '15%' }}>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{clockData.date}</td>
                        <td>{clockData.weekday}</td>
                        <td>{clockData.clockInTime}</td>
                        <td>{clockData.clockOutTime}</td>
                        <td>{calculateTotalHours()}</td>
                        <td>{clockData.comments}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DailyReport;