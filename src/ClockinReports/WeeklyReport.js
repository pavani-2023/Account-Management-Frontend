// import React, { useState } from 'react';
// import axios from 'axios';


// const WeeklyReport = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [employeeInfo, setEmployeeInfo] = useState({
//     firstName: '',
//     lastName: '',
//     department: '',
//     designation: '',
//   });
//   const [timeReports, setTimeReports] = useState([]);
//   const [error, setError] = useState('');

//   const fetchData = async () => {
//     try {
//       setError(''); 
//       disableInputFields(); 

//       if (!employeeId || !fromDate || !toDate) {
//         setError('Employee ID, From Date, and To Date are required.');
//         return;
//       }

//       const employeeInfoResponse = await axios.get(`http://localhost:8000/employee/${employeeId}`);
//       const employeeInfoData = employeeInfoResponse.data;
//       const fullName = `${employeeInfoData.firstName} ${employeeInfoData.lastName}`;

//       setEmployeeInfo({
//         firstName: employeeInfoData.firstName,
//         lastName: employeeInfoData.lastName,
//         department: employeeInfoData.department,
//         designation: employeeInfoData.designation,
//       });

//       const response = await axios.get(`http://localhost:8000/timereport/${employeeId}?fromDate=${fromDate}&toDate=${toDate}`);
//       const apiData = response.data;

//       if (apiData.timereports && apiData.timereports.length > 0) {
//         setTimeReports(apiData.timereports);
//       } else {
//         setError('No timereport data available for the specified range.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Error fetching data. Please try again later.');
//     } finally {
//       enableInputFields();
//     }
//   };

//   const disableInputFields = () => {
//     document.getElementById('eid').disabled = true;
//     document.getElementById('fromdate').disabled = true;
//     document.getElementById('todate').disabled = true;
//   };

//   const enableInputFields = () => {
//     document.getElementById('eid').disabled = false;
//     document.getElementById('fromdate').disabled = false;
//     document.getElementById('todate').disabled = false;
//   };

//   const getDayOfWeek = (dayIndex) => {
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return daysOfWeek[dayIndex];
//   };

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
//   };

//   const formatTime = (timestamp) => {
//     const timeComponents = timestamp.split(':');
//     if (timeComponents.length === 3) {
//       const hours = parseInt(timeComponents[0], 10);
//       const minutes = parseInt(timeComponents[1], 10);
//       const seconds = parseInt(timeComponents[2], 10);

//       if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
//         const time = new Date();
//         time.setHours(hours, minutes, seconds);
//         return time.toLocaleTimeString('en-US', { hour12: false });
//       }
//     }

//     return 'Invalid Date';
//   };

//   return (
//     <div>
//       <div id="header-container">
//         <div id="title">
//           <h2>Weekly Check-In/Check-Out Data</h2>
//         </div>

//         {/* <div id="menu-bar" className="topnav">
//           <ul>
//             <li><a href="dailyclockin.html">Daily</a></li>
//             <li><a className="active" href="weeklyclockin.html">Weekly</a></li>
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
//               onChange={(e) => setEmployeeId(e.target.value.trim())}
//             />
//             <div id="eidError"></div>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="fromdate">From Date:</label>
//           <input
//             type="date"
//             id="fromdate"
//             name="fromdate"
//             required
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//           <div id="fromDateError"></div>
//         </div>
//         <div>
//           <label htmlFor="todate">To Date:</label>
//           <input
//             type="date"
//             id="todate"
//             name="todate"
//             required
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//           <div id="toDateError"></div>
//         </div>
//         <div>
//           <label htmlFor="ename">Employee Name:</label>
//           <input type="text" id="ename" name="fname" placeholder="Enter Employee Name" readOnly className="disabled-input" value={`${employeeInfo.firstName} ${employeeInfo.lastName}`} />
//         </div>
//         <div>
//           <label htmlFor="department">Department:</label>
//           <input type="text" id="department" name="department" placeholder="Enter Department" readOnly className="disabled-input" value={employeeInfo.department} />
//         </div>
//         <div>
//           <label htmlFor="designation">Designation:</label>
//           <input type="text" id="designation" name="designation" placeholder="Enter Designation" readOnly className="disabled-input" value={employeeInfo.designation} />
//         </div>
//       </div>
//       <button onClick={fetchData}>Fetch Data</button>
//       {error && <div className="error-message">{error}</div>}
//       <table id="weeklyDataTable">
//         <thead>
//           <tr>
//             <th style={{ width: '15%' }}>Date</th>
//             <th style={{ width: '15%' }}>Day</th>
//             <th style={{ width: '10%' }}>Clock-In</th>
//             <th style={{ width: '10%' }}>Clock-Out</th>
//             <th style={{ width: '20%' }}>Total No.of Hours</th>
//             <th style={{ width: '30%' }} id="commentsCell">Comments</th>
//           </tr>
//         </thead>
//         <tbody>
//           {timeReports.map((report, index) => (
//             <tr key={index}>
//               <td>{formatDate(new Date(report.date))}</td>
//               <td>{getDayOfWeek(new Date(report.date).getDay())}</td>
//               <td>{formatTime(report.clockinoutReport[0].clockIn)}</td>
//               <td>{formatTime(report.clockinoutReport[0].clockOut)}</td>
//               <td>{report.clockinoutReport[0].totalHours}</td>
//               <td>{report.clockinoutReport[0].comments}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default WeeklyReport;
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import './weeklyclockin.css';
import { useParams } from 'react-router-dom';

const WeeklyReport = () => {
  const { uuid } = useParams();
  console.log('uuid',uuid)
  const [employeeId, setEmployeeId] = useState(uuid);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [employeeInfo, setEmployeeInfo] = useState({ employeename:'',firstName: '', lastName: '', department: '', designation: '' });
  const [timeReports, setTimeReports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getemployeeDetails();
  },[])
  const getemployeeDetails=async()=>{
    try {
      const response = await axios.get(`http://localhost:5000/getemployeeDetails/${uuid}`);
      const data = response.data
      console.log('response',response.data)
      setEmployeeInfo(prevState => ({
        ...prevState,
        employeename: data.EmployeeName,
        department: data.dep,
        designation: data.Designation,
      }));
         
    }catch(error){
      console.log('error fetching employeedetails',error)
    }
  }
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      if (!employeeId || !fromDate || !toDate) {
        setError('Employee ID, From Date, and To Date are required.');
        return;
      }

      const response = await axios.get(`http://localhost:4000/api/reports/weekly-report/${employeeId}/${fromDate}/${toDate}`);
      const apiData = response.data;
      setTimeReports(apiData);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const convertToPDF = () => {
    if (timeReports.length === 0) {
      setError('No data to generate PDF.');
      return;
    }

    const doc = new jsPDF();
    doc.autoTable({
      head: [['Date', 'Day', 'Clock-In', 'Clock-Out', 'Total No.of Hours', 'Comments']],
      body: timeReports.map(report => [
        formatDate(new Date(report.date)),
        getDayOfWeek(new Date(report.date).getDay()),
        report.clockInTime,
        report.clockOutTime,
        `${report.totalHours} and ${report.totalMinutes}`,
        report.comments
      ]),
      startY: 20
    });

    doc.save('weekly_report.pdf');
  };

  const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timestamp) => {
    const timeComponents = timestamp.split(':');
    if (timeComponents.length === 3) {
      const hours = parseInt(timeComponents[0], 10);
      const minutes = parseInt(timeComponents[1], 10);
      const seconds = parseInt(timeComponents[2], 10);

      if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
        const time = new Date();
        time.setHours(hours, minutes, seconds);
        return time.toLocaleTimeString('en-US', { hour12: false });
      }
    }

    return 'Invalid Date';
  };

  return (
    <div>
      <div id="header-container">
        <div id="title">
          <h2>Weekly Check-In/Check-Out Data</h2>
        </div>
      </div>
      <div id="employeeInfo">
        <div>
          <label htmlFor="eid">Employee Id:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="eid"
              name="eid"
              placeholder="Enter Employee ID"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value.trim())}
            />
          </div>
        </div>
        <div>
          <label htmlFor="fromdate">From Date:</label>
          <input
            type="date"
            id="fromdate"
            name="fromdate"
            required
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="todate">To Date:</label>
          <input
            type="date"
            id="todate"
            name="todate"
            required
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ename">Employee Name:</label>
          <input type="text" id="ename" name="fname" value={employeeInfo.employeename} placeholder="Enter Employee Name" readOnly className="disabled-input" />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" name="department" placeholder="Enter Department" readOnly className="disabled-input" value={employeeInfo.department} />
        </div>
        <div>
          <label htmlFor="designation">Designation:</label>
          <input type="text" id="designation" name="designation" placeholder="Enter Designation" readOnly className="disabled-input" value={employeeInfo.designation} />
        </div>
      </div>
      <div>
        <button onClick={fetchData} disabled={loading}>{loading ? 'Fetching Data...' : 'Fetch Data'}</button>
        <button onClick={convertToPDF} disabled={!timeReports.length}>Convert to PDF</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <table id="weeklyDataTable">
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Date</th>
            <th style={{ width: '15%' }}>Day</th>
            <th style={{ width: '10%' }}>Clock-In</th>
            <th style={{ width: '10%' }}>Clock-Out</th>
            <th style={{ width: '20%' }}>Total No.of Hours</th>
            <th style={{ width: '30%' }} id="commentsCell">Comments</th>
          </tr>
        </thead>
        <tbody>
          {timeReports.map((report, index) => (
            <tr key={index}>
              <td>{formatDate(new Date(report.date))}</td>
              <td>{getDayOfWeek(new Date(report.date).getDay())}</td>
              <td>{report.clockInTime}</td>
              <td>{report.clockOutTime}</td>
              <td>{`${report.totalHours} and ${report.totalMinutes}`}</td>
              <td>{report.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyReport;