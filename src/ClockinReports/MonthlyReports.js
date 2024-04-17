// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from 'react-router-dom';

// const MonthlyReports = () => {
//   const { uuid } = useParams();
//   console.log('uuid',uuid)
//   const [employeeId, setEmployeeId] = useState(uuid);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [employeeInfo, setEmployeeInfo] = useState({
//     firstName: "",
//     lastName: "",
//     employeename:'',
//     department: "",
//     designation: "",
//   });
//   const [timeReports, setTimeReports] = useState([]);


//   useEffect(()=>{
//     getemployeeDetails();
//   },[])
//   const getemployeeDetails=async()=>{
//     try {
//       const response = await axios.get(`http://localhost:5000/getemployeeDetails/${uuid}`);
//       const data = response.data
//       console.log('response',response.data)
//       setEmployeeInfo(prevState => ({
//         ...prevState,
//         employeename: data.EmployeeName,
//         department: data.dep,
//         designation: data.Designation,
//       }));
         
//     }catch(error){
//       console.log('error fetching employeedetails',error)
//     }
//   }

//   useEffect(() => {
//     const currentDate = new Date();
//     const defaultMonth = currentDate.getMonth() + 1; 
//     const defaultYear = currentDate.getFullYear();

//     setSelectedMonth(defaultMonth.toString());
//     setSelectedYear(defaultYear.toString());
//   }, []);

//   const fetchData = async () => {
//     try {
//       disableInputFields();

//       if (employeeId === "") {
//         console.error('Employee ID is required.');
//         return;
//       }

//       // const employeeInfoResponse = await axios.get(`http://localhost:8000/employee/${employeeId}`);
//       // const employeeInfo = employeeInfoResponse.data;

//       // const fullName = `${employeeInfo.firstName} ${employeeInfo.lastName}`;
//       // setEmployeeInfo({ ...employeeInfo, fullName });

//       const response = await axios.get(`http://localhost:8000/timereport/${employeeId}?selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`);
//       const apiData = response.data;

//       if (apiData.timereports && apiData.timereports.length > 0) {
//         setTimeReports(apiData.timereports);
//       } else {
//         console.error('No timereport data available for the specified range.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       enableInputFields();
//     }
//   };

//   const disableInputFields = () => {
//     document.getElementById("eid").disabled = true;
//     document.getElementById("selectedMonth").disabled = true;
//     document.getElementById("selectedYear").disabled = true;
//   };

//   const enableInputFields = () => {
//     document.getElementById("eid").disabled = false;
//     document.getElementById("selectedMonth").disabled = false;
//     document.getElementById("selectedYear").disabled = false;
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

//     return "Invalid Date";
//   };

//   return (
//     <div>
//       <div id="header-container">
//         <div id="title">
//           <h2>Monthly Check-In/Check-Out Data</h2>
//         </div>
//         {/* <div id="menu-bar" className="topnav">
//           <ul>
//             <li><a href="dailyclockin.html">Daily</a></li>
//             <li><a href="weeklyclockin.html">Weekly</a></li>
//             <li><a className="active" href="monthlyclockin.html">Monthly</a></li>
//           </ul>
//         </div> */}
//       </div>
//       <div id="employeeInfo">
//         <div>
//           <label htmlFor="eid">Employee Id:</label>
//           <div style={{ position: "relative" }}>
//             <input
//               type="text"
//               id="eid"
//               name="eid"
//               placeholder="Enter Employee ID"
//               required
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value.trim())}
//             />
//             <div id="eidError" className="error-message">
//               {!employeeId && "Employee ID is required."}
//             </div>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="selectedMonth">Select Month:</label>
//           <select
//             id="selectedMonth"
//             name="selectedMonth"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             enabled={!employeeId}
//           >
//             <option value="">Select a month</option>
//             <option value="1">January</option>
//             <option value="2">February</option>
//             <option value="3">March</option>
//             <option value="4">April</option>
//             <option value="5">May</option>
//             <option value="6">June</option>
//             <option value="7">July</option>
//             <option value="8">August</option>
//             <option value="9">September</option>
//             <option value="10">October</option>
//             <option value="11">November</option>
//             <option value="12">December</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="selectedYear">Select Year:</label>
//           <select
//             id="selectedYear"
//             name="selectedYear"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             enabled={!employeeId}
//           >
//             <option value="">Select a year</option>
//             <option value="2023">2023</option>
//             <option value="2024">2024</option>
//             <option value="2025">2025</option>
//             <option value="2026">2026</option>
//             <option value="2027">2027</option>
//             <option value="2028">2028</option>
//             <option value="2029">2029</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="ename">Employee Name:</label>
//           <input type="text" id="ename" name="fname" value={employeeInfo.employeename} placeholder="Enter Employee Name" readOnly className="disabled-input" />
//         </div>
//         <div>
//           <label htmlFor="department">Department:</label>
//           <input type="text" id="department" name="department" value={employeeInfo.department}placeholder="Enter Department" readOnly className="disabled-input" />
//         </div>
//         <div>
//           <label htmlFor="designation">Designation:</label>
//           <input type="text" id="designation" name="designation" value={employeeInfo.designation}placeholder="Enter Designation" readOnly className="disabled-input" />
//         </div>
//       </div>
//       <button onClick={fetchData}>Fetch Data</button>
//       <table id="monthlyDataTable">
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
//             <React.Fragment key={index}>
//               {report.clockinoutReport.map((entry, subIndex) => {
//                 const date = new Date(report.date);
//                 const day = getDayOfWeek(date.getDay());
//                 const clockIn = entry.clockIn;
//                 const clockOut = entry.clockOut;
//                 const totalHours = entry.totalHours;
//                 const comments = entry.comments;

//                 return (
//                   <tr key={subIndex}>
//                     <td>{formatDate(date)}</td>
//                     <td>{day}</td>
//                     <td>{formatTime(clockIn)}</td>
//                     <td>{formatTime(clockOut)}</td>
//                     <td>{totalHours}</td>
//                     <td>{comments}</td>
//                   </tr>
//                 );
//               })}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MonthlyReports;
import React, { useState, useEffect } from "react";
import axios from "axios";
// import './monthlyclockin.css';
import { useParams } from 'react-router-dom';

const MonthlyReports = () => {
  const { uuid } = useParams();
  console.log('uuid',uuid)
  const [employeeId, setEmployeeId] = useState(uuid);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState({ firstName: "", lastName: "", department: "", designation: "",});
  const [timeReports, setTimeReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const defaultMonth = currentDate.getMonth() + 1; 
    const defaultYear = currentDate.getFullYear();

    setSelectedMonth(defaultMonth.toString());
    setSelectedYear(defaultYear.toString());
  }, []);

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
      disableInputFields();
      setError('');
  
      if (!employeeId || !selectedMonth || !selectedYear) {
        setError('Employee ID, Month, and Year are required.');
        return;
      }
  
      const response = await axios.get(`http://localhost:4000/api/reports/monthly-report/${employeeId}/${selectedMonth}/${selectedYear}`);
      const apiData = response.data.map(report => ({
        ...report,
        weekday: getDayOfWeek(new Date(report.date).getDay()) // Update weekday field
      }));
      setTimeReports(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      enableInputFields();
    }
  };
  
  const convertToPDF = () => {
    // Logic to convert fetched data to PDF format
    // You can use libraries like pdfmake or jsPDF for PDF generation
  };

  const disableInputFields = () => {
    document.getElementById("eid").disabled = true;
    document.getElementById("selectedMonth").disabled = true;
    document.getElementById("selectedYear").disabled = true;
  };

  const enableInputFields = () => {
    document.getElementById("eid").disabled = false;
    document.getElementById("selectedMonth").disabled = false;
    document.getElementById("selectedYear").disabled = false;
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

    return "Invalid Date";
  };

  return (
    <div>
      <div id="header-container">
        <div id="title">
          <h2>Monthly Check-In/Check-Out Data</h2>
        </div>
      </div>
      <div id="employeeInfo" className="employee-info-row">
        {/* <div>
          <label htmlFor="eid">Employee Id:</label>
          <div style={{ position: "relative" }}>
            <input type="text" id="eid" name="eid" placeholder="Enter Employee ID" required value={employeeId}/>
          </div>
        </div> */}
        {/* <div>
          <label>Date:</label>
          <input type='date'/>
        </div> */}
        <div>
          <label htmlFor="selectedMonth">Select Month:</label>
          <select id="selectedMonth" name="selectedMonth" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} enabled={!employeeId}>
            <option value="">Select a month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div>
          <label htmlFor="selectedYear">Select Year:</label>
          <select
            id="selectedYear"
            name="selectedYear"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            enabled={!employeeId}
          >
            <option value="">Select a year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
          </select>
        </div>
        {/* <div>
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
        </div> */}
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={convertToPDF}>Convert to PDF</button>
      {error && <div className="error-message">{error}</div>}
      <table id="monthlyDataTable"  className='clockin-table'>
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
              <td>{report.weekday}</td>
              <td>{report.clockInTime}</td>
              <td>{report.clockOutTime}</td>
              <td>{report.totalHours}</td>
              <td>{report.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyReports;