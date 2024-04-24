import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';

const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})


const YourComponent = () => {
  const { uuid } = useParams();
  // console.log('uuid',uuid)
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
      const response = await api.get(`/getemployeeDetails/${uuid}`);
      const data = response.data
      // console.log('response',response.data)
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



  const fetchTaskReports = async () => {
  try {
    if (!employeeId.trim() || !startDate || !endDate || !selectedClient) {
      setError('Please provide employee ID, start date, end date, and select a client.');
      return;
    }
    const response = await api.get(`/taskreports`, {
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