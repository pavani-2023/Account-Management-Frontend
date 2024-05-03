
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})
const MonthlyReports = () => {
  const { uuid } = useParams();
  // console.log('uuid',uuid)
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
      disableInputFields();
      setError('');
  
      if (!employeeId || !selectedMonth || !selectedYear) {
        setError('Employee ID, Month, and Year are required.');
        return;
      }
  
      const response = await api.get(`/monthly-report/${employeeId}/${selectedMonth}/${selectedYear}`);
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
    console.log("Disabling input fields");
    console.log(document.getElementById("eid")); // Check if this returns null
    console.log(document.getElementById("selectedMonth"));
    console.log(document.getElementById("selectedYear"));
    
    // Disable input fields...
  };
  
  // const disableInputFields = () => {
  //   document.getElementById("eid").disabled = true;
  //   document.getElementById("selectedMonth").disabled = true;
  //   document.getElementById("selectedYear").disabled = true;
  // };

  // const enableInputFields = () => {
  //   document.getElementById("eid").disabled = false;
  //   document.getElementById("selectedMonth").disabled = false;
  //   document.getElementById("selectedYear").disabled = false;
  // };



  const enableInputFields = () => {
    const eidInput = document.getElementById("eid");
    const selectedMonthInput = document.getElementById("selectedMonth");
    const selectedYearInput = document.getElementById("selectedYear");
  
    if (eidInput) {
      eidInput.disabled = false;
    } else {
      console.error("Element with ID 'eid' not found.");
    }
  
    if (selectedMonthInput) {
      selectedMonthInput.disabled = false;
    } else {
      console.error("Element with ID 'selectedMonth' not found.");
    }
  
    if (selectedYearInput) {
      selectedYearInput.disabled = false;
    } else {
      console.error("Element with ID 'selectedYear' not found.");
    }
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
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={convertToPDF}>Convert to PDF</button>
      {error && <div className="error-message">{error}</div>}
      <table id="monthlyDataTable"  className='clockin-table' style={{width:'95%'}}>
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