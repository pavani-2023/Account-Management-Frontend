import React, { useState,useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';
const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})
const WeeklyReport = () => {
  const { uuid } = useParams();
  // console.log('uuid',uuid)
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
      const response = await api.get(`/getemployeeDetails/${uuid}`);
      const data = response.data
      // console.log('response',response.data)
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

      const response = await api.get(`/weekly-report/${employeeId}/${fromDate}/${toDate}`);
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
      <div id="employeeInfo" className="employee-info-row">
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
      </div>
      <div>
        <button onClick={fetchData} disabled={loading}>{loading ? 'Fetching Data...' : 'Fetch Data'}</button>
        <button onClick={convertToPDF} disabled={!timeReports.length}>Convert to PDF</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <table id="weeklyDataTable"  className='clockin-table' style={{width:'95%'}}>
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
              <td>{report.totalHours}</td>
              <td>{report.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyReport;