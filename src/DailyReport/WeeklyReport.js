// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { IdContext } from '../Registration/Contextapi';
// import { useContext } from 'react';


// const WeeklyReport = () => {
//   const {uuid} =useContext(IdContext);
//   // const [activeTab, setActiveTab] = useState('weekly'); 
//   const [employeeId, setEmployeeId] = useState(uuid);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [ename, setEname] = useState('');
//   const [department, setDepartment] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [clients, setClients] = useState([]);
//   const [selectedClient, setSelectedClient] = useState('');
  

//   // useEffect(() => {
//   //   const fetchEmployeeDetails = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:8000/employee/details');
//   //       if (response.data) {
//   //         const { ename, department, designation } = response.data;
//   //         setEname(ename);
//   //         setDepartment(department);
//   //         setDesignation(designation);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching employee details:', error.message);
//   //     }
//   //   };

//   //   const fetchClients = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:8000/clients');
//   //       if (response.data) {
//   //         setClients(response.data);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching clients:', error.message);
//   //     }
//   //   };

//   //   fetchEmployeeDetails();
//   //   fetchClients();
//   // }, []);

//   useEffect(()=>{
//     fetchtimesheets();
//     fetchData();
//   },[])


//   const fetchtimesheets = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getTimesheet', {
//         params: { empID: employeeId }
//       });
//       if (response.data) {
//         setClients(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching timesheets:', error);
//     }
//   };
  

//   // const fetchtimesheets = async () => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:8000/timesheet/${employeeId}?fromDate=${startDate}&toDate=${endDate}`);
     
//   //   } catch (error) {
//   //     console.error('Error fetching timesheets:', error);
//   //   }
//   // };

//   const handleGetReports = () => {
//     // Implement functionality to get reports based on selected client
//     console.log("Get Reports for:", selectedClient);
//   };

// //   async function convertToPDF() {
// //     try {
// //         if (!searchPerformed) {
// //             alert("Please implement search first before converting to PDF.");
// //             return;
// //         }

// //         const empID = document.getElementById("eid").value.trim();
// //         const fromDate = document.getElementById("fromdate").value.trim();
// //         const toDate = document.getElementById("todate").value.trim();

// //         if (empID === "" || fromDate === "" || toDate === "") {
// //             displayErrorMessages(empID, fromDate, toDate);
// //             return;
// //         }

// //         await convert();
// //     } catch (error) {
// //         console.error('Error converting to PDF:', error);
// //     }
// // }
//         async function fetchData() {
//     try {
//         disableInputFields();

//         const empID = document.getElementById("eid").value.trim();
//         const fromDate = document.getElementById("fromdate").value.trim();
//         const toDate = document.getElementById("todate").value.trim();

//         if (empID === "" || fromDate === "" || toDate === "") {
//             console.error('Employee ID, From Date, and To Date are required.');
//             return;
//         }

//         const response = await axios.get(`http://localhost:8000/timesheet/${empID}?fromDate=${fromDate}&toDate=${toDate}`);
//         const apiData = response.data;

//         apiData.timesheets.sort((a, b) => new Date(a.date) - new Date(b.date));

//         populateTableWithApiData(apiData);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     } finally {
//         enableInputFields();
//     }
// }

// function disableInputFields() {
//   var inputs = document.querySelectorAll('input');
//   inputs.forEach(function (input) {
//       input.disabled = true;
//   });
// }
// function populateTableWithApiData(apiData) {
//   var table = document.getElementById("taskReport").getElementsByTagName('tbody')[0];
//   table.innerHTML = "";

//   try {
//       var timesheets = apiData.timesheets;

//       if (Array.isArray(timesheets) && timesheets.length > 0) {
//           var uniqueDates = new Set(); 
//           var sNoCounter = 1; 

//           timesheets.forEach(function (timesheet) {
//               var taskReports = timesheet.taskReport;

//               if (Array.isArray(taskReports) && taskReports.length > 0) {
//                   var previousDate = null;

//                   taskReports.forEach(function (rowData) {
//                       var newRow = table.insertRow(table.rows.length);

//                       var dayOfWeek = new Date(timesheet.date).toLocaleDateString('en-US', { weekday: 'long' });

//                       if (!uniqueDates.has(timesheet.date)) {
//                           var newCellDate = newRow.insertCell(0);
//                           newCellDate.contentEditable = false;
//                           newCellDate.textContent = new Date(timesheet.date).toISOString().split('T')[0];

//                           var newCellDay = newRow.insertCell(1);
//                           newCellDay.contentEditable = false;
//                           newCellDay.textContent = dayOfWeek;

//                           previousDate = timesheet.date;
//                           uniqueDates.add(timesheet.date);

                          
//                           sNoCounter = 1;
//                       } else {
//                           var emptyCellDate = newRow.insertCell(0);
//                           emptyCellDate.contentEditable = false;

//                           var emptyCellDay = newRow.insertCell(1);
//                           emptyCellDay.contentEditable = false;
//                       }

//                       var newCellSNo = newRow.insertCell(2);
//                       newCellSNo.contentEditable = false;
//                       newCellSNo.textContent = sNoCounter; 

//                       var fieldMappings = {
//                           Description: "description",
//                           Status: "status",
//                           Comments: "comments",
//                           Efforts: "efforts"
//                       };

//                       Object.keys(fieldMappings).forEach(function (apiField, columnIndex) {
//                           if (apiField !== 'id' && apiField !== 'date') {
//                               var tableColumn = fieldMappings[apiField];
//                               var cellValue = rowData[tableColumn];

//                               var newCell = newRow.insertCell(columnIndex + 3);
//                               newCell.contentEditable = false;

//                               newCell.textContent = tableColumn === "Efforts" ? cellValue + ' hours' : cellValue;
//                           }
//                       });

//                       sNoCounter++;
//                   });
//               } else {
//                   console.error('TaskReport array is empty or not as expected in the API response:', timesheet);
//               }
//           });
//       } else {
//           console.error('Timesheets array is empty or not as expected in the API response:', apiData);
//       }
//   } catch (error) {
//       console.error('Error populating table with API data:', error);
//   }
// }
// function enableInputFields() {
            
//   var inputs = document.querySelectorAll('input');
//   inputs.forEach(function (input) {
//       input.disabled = false;
//   });
// }




//   return (
//     <div>
//       <div className="form-container">
//         <div className="header">
//           <h1>Weekly Task Report</h1>
//           {/* <div className="tabs">
//             <button
//               className={activeTab === 'daily' ? 'tab-btn' : 'tab-btn active'}
//               onClick={() => setActiveTab('daily')}
//             >
//               Daily
//             </button>
//             <button
//               className={activeTab === 'weekly' ? 'tab-btn active' : 'tab-btn'}
//               onClick={() => setActiveTab('weekly')}
//             >
//               Weekly
//             </button>
//           </div> */}
//         </div>

//         <div className="employee-info-row">
//           <div className="form-group">
//             <label htmlFor="employeeId">Employee ID</label>
//             <input
//               type="text"
//               className="form-control"
//               id="employeeId"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="ename">Employee Name</label>
//             <input
//               type="text"
//               className="form-control grey-filled no-selection employee-info-input"
//               id="ename"
//               value={ename}
//               readOnly
//               disabled
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="department">Department</label>
//             <input
//               type="text"
//               className="form-control grey-filled no-selection employee-info-input"
//               id="department"
//               value={department}
//               readOnly
//               disabled
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="designation">Designation</label>
//             <input
//               type="text"
//               className="form-control grey-filled no-selection employee-info-input"
//               id="designation"
//               value={designation}
//               readOnly
//               disabled
//             />
//           </div>
//         </div>

//         <div className="client-info-row">
//           <div className="form-group">
//             {/* <label htmlFor="client">Client</label> */}
//             {/* <select
//               className="form-control"
//               id="client"
//               value={selectedClient}
//               onChange={(e) => setSelectedClient(e.target.value)}
//             >
//               <option value="">Select a client</option>
//               {clients.map((client) => (
//                 <option key={client.id} value={client.name}>
//                   {client.name}
//                 </option>
//               ))}
//             </select> */}
//           </div>
//           <div className="form-group">
//             <button className="btn" onClick={handleGetReports}>Get Reports</button>
//           </div>
//         </div>
//       </div>

//       <div className="table-container">
//         <table id="taskReport">
//           <thead>
//             <tr>
//               <th style={{ width: '5%' }}>S.No</th>
//               <th style={{ width: '25%' }}>Task Description</th>
//               <th style={{ width: '15%' }}>Status</th>
//               <th style={{ width: '20%' }}>Comments</th>
//               <th style={{ width: '15%' }}>No.of Hours of Efforts</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Task rows will be added here */}
//           </tbody>
//         </table>

//         <div className="button-container">
//           {/* Add button and Submit button will be added here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeeklyReport;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { IdContext } from '../Registration/Contextapi';
// import { useContext } from 'react';


// const WeeklyReport = () => {
//   const {uuid} =useContext(IdContext);
//   console.log('uuid',uuid)
//   const [employeeId, setEmployeeId] = useState(uuid);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [ename, setEname] = useState('');
//   const [department, setDepartment] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [clients, setClients] = useState([]);
//   const [selectedClient, setSelectedClient] = useState('');
//   const [taskReports, setTaskReports] = useState([]);
//   const [error, setError] = useState('');


//   // useEffect(() => {
//   //   const fetchEmployeeDetails = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:8000/employee/details');
//   //       if (response.data) {
//   //         const { ename, department, designation } = response.data;
//   //         setEname(ename);
//   //         setDepartment(department);
//   //         setDesignation(designation);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching employee details:', error.message);
//   //     }
//   //   };

//   //   const fetchClients = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:8000/clients');
//   //       if (response.data) {
//   //         setClients(response.data);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching clients:', error.message);
//   //     }
//   //   };

//   //   fetchEmployeeDetails();
//   //   fetchClients();
//   // }, []);

//   useEffect(()=>{
//     handleGetReports();
//   },[])
//   const handleGetReports = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/taskreports/${uuid}`);
//       console.log('weeklyreport',response.data)
//       if (response.data && response.data.taskReports && response.data.taskReports.length > 0) {
//         setTaskReports(response.data.taskReports);
//         setError('');
//       } else {
//         setTaskReports([]);
//         setError('No task report data available.');
//       }
//     } catch (error) {
//       console.error('Error fetching task reports:', error);
//       setError('Error fetching task reports. Please try again later.');
//     }
//   };

//   const handleConvertToPDF = () => {
//     // Placeholder for converting task reports to PDF
//     console.log('Converting task reports to PDF...');
//   };

//   return (
//     <div>
//       <div className="form-container">
//         <div className="header">
//           <h1>Weekly Task Report</h1>
//         </div>

//         <div className="employee-info-row">
//           <div className="form-group">
//             <label htmlFor="employeeId">Employee ID</label>
//             <input
//               type="text"
//               className="form-control"
//               id="employeeId"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="ename">Employee Name</label>
//             <input
//               type="text"
//               className="form-control grey-filled no-selection employee-info-input"
//               id="ename"
//               value={ename}
//               readOnly
//               disabled
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="department">Department</label>
//             <input
//               type="text"
//               className="form-control grey-filled no-selection employee-info-input"
//               id="department"
//               value={department}
//               readOnly
//               disabled
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="designation">Designation</label>
//             <input
//               type="text"
//               className="form-control grey-filled no-selection employee-info-input"
//               id="designation"
//               value={designation}
//               readOnly
//               disabled
//             />
//           </div>
//         </div>

//         <div className="client-info-row">
//           <div className="form-group">
//             <label htmlFor="client">Client</label>
//             <select
//               className="form-control"
//               id="client"
//               value={selectedClient}
//               onChange={(e) => setSelectedClient(e.target.value)}
//             >
//               <option value="">Select a client</option>
//               {clients.map((client) => (
//                 <option key={client.id} value={client.name}>
//                   {client.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <button className="btn" onClick={handleGetReports}>Get Reports</button>
//           </div>
//           <div className="form-group">
//             <button className="btn" onClick={handleConvertToPDF}>Convert to PDF</button>
//           </div>
//         </div>
//       </div>

//       <div className="table-container">
//         <table id="taskReport">
//           <thead>
//             <tr>
//               <th style={{ width: '5%' }}>S.No</th>
//               <th style={{ width: '25%' }}>Task Description</th>
//               <th style={{ width: '15%' }}>Status</th>
//               <th style={{ width: '20%' }}>Comments</th>
//               <th style={{ width: '15%' }}>No.of Hours of Efforts</th>
//             </tr>
//           </thead>
//           <tbody>
//             {taskReports.map((report, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{report.taskDescription}</td>
//                 <td>{report.status}</td>
//                 <td>{report.comments}</td>
//                 <td>{report.hoursOfEfforts}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>
//     </div>
//   );
// };

// export default WeeklyReport;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import './weeklyrep.css';
import { useParams } from 'react-router-dom';
const YourComponent = () => {
  const { uuid } = useParams();
  console.log('uuid',uuid)
  const [employeeId, setEmployeeId] = useState(uuid);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ename, setEname] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [taskReports, setTaskReports] = useState([]);
  const [error, setError] = useState('');
  const [reportsFetched, setReportsFetched] = useState(false); 


  useEffect(()=>{
    getemployeeDetails();
  },[])
  const getemployeeDetails=async()=>{
    try {
      const response = await axios.get(`http://localhost:5000/getemployeeDetails/${uuid}`);
      const data = response.data
      console.log('response',response.data)
      setEname(data.EmployeeName);
          setDepartment(data.dep);
          setDesignation(data.Designation);
          setClients(data.fetchclients)
    }catch(error){
      console.log('error fetching employeedetails',error)
    }
  }
 
  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // const fetchTaskReports = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/taskreports`, {
  //       params: {
  //         empID: employeeId,
  //         startDate: startDate,
  //         endDate: endDate
  //       }
  //     });

  //     if (response.data && response.data.length > 0) {
  //       const sortedReports = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
  //       setTaskReports(sortedReports);
  //       setError('');
  //       setReportsFetched(true); 
  //     } else {
  //       setTaskReports([]);
  //       setError('No task report data available.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching task reports:', error);
  //     setError('');
  //   }
  // };



  const fetchTaskReports = async () => {
  try {
    if (!employeeId.trim() || !startDate || !endDate || !selectedClient) {
      setError('Please provide employee ID, start date, end date, and select a client.');
      return;
    }
    const response = await axios.get(`http://localhost:5000/taskreports`, {
      params: {
        empID: employeeId,
        startDate: startDate,
        endDate: endDate,
        client: selectedClient
      }
    });
    if (response.data && response.data.length > 0) {
      const sortedReports = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setTaskReports(sortedReports);
      setError('');
      setReportsFetched(true);
    } else {
      setTaskReports([]);
      setError('No task report data available.');
    }
  } catch (error) {
    console.error('Error fetching task reports:', error);
    setError('');
  }
};
  const groupTasksByDate = () => {
    let groupedReports = [];
    let currentSNo = 1;
    let previousDate = null;

    taskReports.forEach((report) => {
      const formattedDate = formatDate(report.date);
      const tasks = report.taskReport.map(task => ({
        ...task,
        date: formattedDate,
        dayOfWeek: getDayOfWeek(new Date(report.date))
      }));

      if (formattedDate !== previousDate) {
        groupedReports.push({
          sNo: currentSNo++,
          date: formattedDate,
          dayOfWeek: getDayOfWeek(new Date(report.date)),
          tasks: tasks
        });
      } else {
        groupedReports[groupedReports.length - 1].tasks.push(...tasks);
      }

      previousDate = formattedDate;
    });

    return groupedReports;
  };


  const groupedTaskReports = groupTasksByDate();

  useEffect(() => {
  fetchTaskReports();
    
  }, []);

  const handleConvertToPDF = () => {
   if (!reportsFetched) {
      alert('Please fetch task reports first.');
      return;
    }

    try {
      if (groupedTaskReports.length === 0) {
        alert('No task reports available. Please fetch task reports first.');
        return;
      }
  
      const pdf = new jsPDF();
      pdf.autoTable({
        html: '#taskReport',
        startY: 20,
        styles: {
          cellPadding: 1,
          fontSize: 10,
          cellWidth: 'wrap',
          rowHeight: 15  
        },
        columnStyles: {
          0: { cellWidth: 10, fontStyle: 'bold' }, 
          1: { cellWidth: 20 },
          2: { cellWidth: 20 },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 'auto' },
          5: { cellWidth: 'auto' },
          6: { cellWidth: 20 }
        },
        margin: { top: 20, bottom: 20, left: 10, right: 10 }
      });
  
      pdf.save('task_report.pdf');
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <div className="header">
          <h1>Weekly Task Report</h1>
        </div>

        <div className="employee-info-row">
          {/* <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              className="form-control"
              id="employeeId"
              value={employeeId}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="ename">Employee Name</label>
            <input
              type="text"
              className="form-control grey-filled no-selection employee-info-input"
              id="ename"
              value={ename}
              readOnly
              disabled
            />
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control grey-filled no-selection employee-info-input"
              id="department"
              value={department}
              readOnly
              disabled
            />
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              className="form-control grey-filled no-selection employee-info-input"
              id="designation"
              value={designation}
              readOnly
              disabled
            />
          </div> */}
          
        <div className="client-info-row">
          <div className="form-group">
            <label htmlFor="client">Client</label><br></br>
            <select
              className="form-control"
              id="client"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.clientId} value={client.clientName}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>
         
        </div>
        </div>

      </div>

      <div style={{display:'flex'}}>
        <div className="form-group">
          <button className="btn" onClick={fetchTaskReports}>Get Reports</button>
        </div>
        <div className="form-group">
          <button className="btn" onClick={handleConvertToPDF} disabled={!reportsFetched}>
              Convert to PDF
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table id="taskReport">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>S.No</th>
              <th style={{ width: '10%' }}>Date</th>
              <th style={{ width: '10%' }}>Day</th>
              <th style={{ width: '25%' }}>Task Description</th>
              <th style={{ width: '15%' }}>Status</th>
              <th style={{ width: '20%' }}>Comments</th>
              <th style={{ width: '15%' }}>No. of Hours of Efforts</th>
            </tr>
          </thead>
          <tbody>
          
{groupedTaskReports.length > 0 ? (
  groupedTaskReports.map((report, index) => (
    report.tasks.map((task, i) => (
      <tr key={`${index}-${i}`}>
        {i === 0 ? (
          <>
            <td rowSpan={report.tasks.length}>{report.sNo}</td>
            <td rowSpan={report.tasks.length}>{report.date}</td>
            <td rowSpan={report.tasks.length}>{report.dayOfWeek}</td>
          </>
        ) : null}
        <td>{task.description}</td>
        <td>{task.status}</td>
        <td>{task.comments}</td>
        <td>{task.efforts}</td>
      </tr>
    ))
  ))
) : (
  <tr>
    <td colSpan="7">{error || 'No task reports available'}</td>
  </tr>
)}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourComponent;