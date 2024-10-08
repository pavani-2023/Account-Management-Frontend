import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import { FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})

const DailyReport = () => {
  // const {uuid} =useContext(IdContext);
  const { uuid } = useParams();
  // console.log('uuid',uuid)
  // const [activeTab, setActiveTab] = useState('daily'); 
  const [employeeId, setEmployeeId] = useState(uuid);
  const [date, setDate] = useState('');
  const [weekday, setWeekday] = useState('');
  const [data,setData]=useState([{
    
  }])
  const [ename, setEname] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [taskReport, setTaskReport] = useState([{ sNo: 1, client: '', description: '', status: '', comments: '', efforts: '' }]);
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  console.log('clients',clients)
 const[selectedClient,setSelectedClient]=useState([])
console.log('selectedClient',selectedClient)
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
  useEffect(() => {
    const updateDateAndWeekday = () => {
      const today = new Date();
      const options = { weekday: 'long' };
      const dayName = new Intl.DateTimeFormat('en-US', options).format(today);
      setWeekday(dayName);
      setDate(today.toISOString().split('T')[0]);
    };

    updateDateAndWeekday();

    const intervalId = setInterval(updateDateAndWeekday, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (taskReport.length === 0) {
      setTaskReport([{ sNo: 1, description: '', status: '', comments: '', efforts: '' }]);
    }
  }, []);

  // useEffect(() => {
  //   const fetchClients = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/clients');
  //       setClients(response.data); 
  //     } catch (error) {
  //       console.error('Error fetching clients:', error.message);
  //     }
  //   };

  //   fetchClients();
  // }, []);

  const validateForm = () => {
    const errors = {};
    if (!employeeId.trim()) {
      errors.employeeId = 'Employee ID is required';
    }
    if (!date) {
      errors.date = 'Date is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // useEffect(()=>{
  //   handleEmployeeId();
  // },[uuid])
  const handleEmployeeId = async (e) => {
    const eid = e.target.value;
    setEmployeeId(eid);
    setErrors((prevErrors) => ({ ...prevErrors, employeeId: '' }));

    if (eid.trim() !== '') {
      try {
        const response = await api.get(`/getemployeeDetails/${uuid}`);
        console.log('responsereports',response.data)
        if (response.data) {
          const { ename, department, designation } = response.data;
          setEname(ename);
          setDepartment(department);
          setDesignation(designation);
        } else {
          setEname('');
          setDepartment('');
          setDesignation('');
        }
      } catch (error) {
        console.error('Error fetching employee details:', error.message);
      }
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);

    const selectedDate = new Date(newDate);
    const options = { weekday: 'long' };
    const dayName = new Intl.DateTimeFormat('en-US', options).format(selectedDate);
    setWeekday(dayName);
  };

  const handleTaskChange = (e, index, field) => {
    const updatedTaskReport = [...taskReport];
    updatedTaskReport[index][field] = e.target.textContent;

    setTaskReport(updatedTaskReport);
  };

  const addTask = () => {
    const lastTask = taskReport[taskReport.length - 1];

    if (
      lastTask &&
      // lastTask.client.trim() !== '' &&
      lastTask.description.trim() !== '' &&
      lastTask.status.trim() !== '' &&
      lastTask.efforts.trim() !== ''
    ) {
      setTaskReport((prevTaskReport) => [
        ...prevTaskReport,
        { sNo: prevTaskReport.length + 1, description: '', status: '', comments: '', efforts: '' },
      ]);
    } else {
      alert('Fill description, status, and no.of hours of efforts in the previous row before adding a new row.');
    }
  };

  const deleteTask = (index) => {
    const updatedTaskReport = [...taskReport];
    
    if (updatedTaskReport.length === 1) {
      updatedTaskReport[0] = { sNo: 1, client: '', description: '', status: '', comments: '', efforts: '' };
    } else {
      updatedTaskReport.splice(index, 1);
      updatedTaskReport.forEach((task, idx) => {
        task.sNo = idx + 1;
      });
    }
  
    setTaskReport(updatedTaskReport);
  };

  // const handleSubmit = async (e) => {
    

  //   if (validateForm()) {
  //     setEmployeeId('');
  //     setDate('');
  //     setEname('');
  //     setDepartment('');
  //     setDesignation('');
  //     setTaskReport([{ sNo: 1,  description: '', status: '', comments: '', efforts: '' }]);
  //   } else {
  //     alert('Please fix the errors before submitting.');
  //   }
  // };


  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const isValidTaskReport = taskReport.some(task => (
      task.description.trim() !== '' ||
      task.status.trim() !== '' ||
      task.comments.trim() !== '' ||
      task.efforts.trim() !== ''
    ));

    if (!isValidTaskReport) {
      alert('Please fill in at least one task before submitting.');
      return;
    }

    if (validateForm()) {
      try {
        const dataToSubmit = {
          empID: employeeId,
          date: date,
          taskReport: taskReport,
          client: selectedClient 
        };

        // console.log('Data to submit:', dataToSubmit);

        const response = await api.post('/createTimesheet', dataToSubmit);
        // console.log('Axios request:', response.config);
        // console.log('Task report submitted successfully:', response.data);
        alert('Task report submitted successfully');

        // Generate PDF after successful submission
        generatePDF();
      } catch (error) {
        console.error('Failed to submit task report:', error);
        alert('Failed to submit task report');
      }

   
      setEmployeeId('');
      setDate('');
      setTaskReport([{ sNo: 1, description: '', status: '', comments: '', efforts: '' }]);
      setSelectedClient('');
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  const generatePDF = () => {
   
    const pdf = new jsPDF();
  
    
    const pdfData = taskReport.map(({ sNo, description, status, comments, efforts }) => [sNo, description, status, comments, efforts]);
  
    pdfData.unshift(['S.No', 'Task Description', 'Status', 'Comments', 'No.of Hours of Efforts']);
  
    pdf.autoTable({
      head: pdfData.slice(0, 1), 
      body: pdfData.slice(1),     
      startY: 20,
      styles: {
        cellPadding: 1,
        fontSize: 10,
        cellWidth: 'wrap',
        rowHeight: 15 
      },
      columnStyles: {
        0: { cellWidth: 10, fontStyle: 'bold' }, 
        1: { cellWidth: 60 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
        4: { cellWidth: 35 },
      },
      margin: { top: 20, bottom: 20, left: 10, right: 10 } 
    });
  
 
    pdf.save('daily_task_report.pdf');
  };




  return (
    <div >
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h1>Daily Task Report</h1>
            {/* <div className="tabs">
              <button
                className={activeTab === 'daily' ? 'tab-btn active' : 'tab-btn'}
                onClick={() => setActiveTab('daily')}
              >
                Daily
              </button>
              <button
                className={activeTab === 'weekly' ? 'tab-btn active' : 'tab-btn'}
                onClick={() => setActiveTab('weekly')}
              >
                Weekly
              </button>
            </div> */}
          </div>

          <div className="employee-info-row">
            {/* <div className="form-group">
              <label htmlFor="employeeId">Employee ID</label>
              <input
                type="text"
                className={`form-control ${errors.employeeId ? 'error' : ''}`}
                id="employeeId"
                value={employeeId}
              />
              {errors.employeeId && <div className="error-message">{errors.employeeId}</div>}
           
              </div> */}
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className={`form-control ${errors.date ? 'error' : ''}`}
                id="date"
                value={date}
                onChange={handleDateChange}
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>
            {/* <div className="form-group">
              <label htmlFor="weekday">Weekday</label>
              <input type="text" className="form-control employee-info-input" id="weekday" value={weekday} readOnly />
            </div> */}
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
            
            <div>
            <label htmlFor="client">Client</label>
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
        </form>
      </div>

      <div className="table-container" style={{width:'98%'}}>
        <table id="taskReport">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>S.No</th>
              {/* <th style={{ width: '20%' }}>Client</th> */}
              <th style={{ width: '25%' }}>Task Description</th>
              <th style={{ width: '15%' }}>Status</th>
              <th style={{ width: '20%' }}>Comments</th>
              <th style={{ width: '15%' }}>No.of Hours of Efforts</th>
              <th style={{ width: '5%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskReport.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {/* <td>
                  <select
                    value={task.client}
                    onChange={(e) => handleTaskChange(e, index, 'client')}
                  >
                    <option value="">Select Client</option>
                    {clients.map((client, idx) => (
                      <option key={idx} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </td> */}
                <td>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleTaskChange(e, index, 'description')}
                  >
                    {task.description}
                  </div>
                </td>
                <td>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleTaskChange(e, index, 'status')}
                  >
                    {task.status}
                  </div>
                </td>
                <td>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleTaskChange(e, index, 'comments')}
                  >
                    {task.comments}
                  </div>
                </td>
                <td>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleTaskChange(e, index, 'efforts')}
                  >
                    {task.efforts}
                  </div>
                </td>
                <td>
                  {/* <FaTrash onClick={() => deleteTask(index)} className="delete-icon" /> */}
                  <FontAwesomeIcon onClick={() => deleteTask(index)} className="delete-icon"  icon={faTrash} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-container">
          <button type="button" onClick={addTask}>
            Add Row
          </button>
          <button type="submit" onClick={handleSubmit}>
            Submit & Convert to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;

