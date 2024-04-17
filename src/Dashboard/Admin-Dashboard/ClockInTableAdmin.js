import { useState,useEffect } from 'react';
import axios from 'axios';


const ClockInTableAdmin = ({ selectedClientId }) => {

    const [todaysClockInData, setTodaysClockInData] = useState([]);
    console.log('todaysClockInData',todaysClockInData)
    const [clients, setClients] = useState([]);
    const  uuid  =  selectedClientId 
   
  
    const[employee,setEmployee]=useState([]);
  
    console.log('employee',employee)
  
    useEffect(()=>{
        getemployees();
    },[uuid])
  
    const getemployees = async()=>{
        try{
            const response = await axios.get(`http://localhost:5000/getemployeedetailsbyclientid/${uuid}`);
             setEmployee(response.data.data)
        }catch(error){
            console.log('error getting employee details')
        }
    }
    
    
  
    useEffect(()=>{
      fetchTodaysClockInData();
      
    },[uuid])
    useEffect(()=>{
      getEmployees();
    },[todaysClockInData])
  
    const fetchTodaysClockInData = () => {
    
        const today = new Date();
        const fromDate = formatDate(today);
        const toDate = formatDate(today);
        axios.get(`http://localhost:4000/api/reports/todays-clock-in/${uuid}/${fromDate}/${toDate}`)
            .then(response => {
                console.log('Response data:', response.data);
                setTodaysClockInData(response.data);
            })
            .catch(error => {
                console.error('Error fetching today\'s clock-in data:', error);
            });
    };
  
  
  
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
  
  
    const getEmployees = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/getemployeedetailsbyclientid/${uuid}`);
          setEmployee(response.data.data);
  
          // Update today's clock-in data to employee for matched employees
          const updatedEmployee = response.data.data.map(emp => {
              const matchedClockInData = todaysClockInData.find(entry => entry.employeeId === emp.EmployeeID);
              if (matchedClockInData) {
                  return {
                      ...emp,
                      clockInTime: matchedClockInData.clockInTime,
                      clockOutTime: matchedClockInData.clockOutTime
                      // Add other properties as needed
                  };
              }
              return emp;
          });
          setEmployee(updatedEmployee);
      } catch (error) {
          console.log('Error getting employee details');
      }
  };
  
   
//   const getStatusIcon = (clockInTime, clockOutTime) => {
//     if (clockInTime && clockOutTime) {
//         // If both clock in and clock out times are null or undefined
//         return <span style={{ color: 'grey', fontSize: '30px' }}>● </span>;
//     } else if (!clockInTime && clockOutTime) {
//         // If only clock in time is there and clock out time is null or undefined
//         return <span style={{ color: 'green', fontSize: '30px' }}>● </span>;
//     } else {
//         // If both have some time values or only clock out time is there
//         return <span style={{ color: 'grey', fontSize: '30px' }}>● </span>;
//     }
// };
const getStatusIcon = (clockInTime, clockOutTime) => {
    if (clockInTime && !clockOutTime) {
     
      return <span style={{ color: 'grey', fontSize: '30px' }}>● </span>;
    } else if (!clockOutTime) {
     
      return <span style={{ color: 'green', fontSize: '30px' }}>● </span>;
    } else {
      
      return <span style={{ color: 'grey', fontSize: '30px' }}>● </span>;
    }
  };
  
  
  
  
  
    return (
        <div>
           
  
            <div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Clock In Time</th>
                            <th>Clock Out Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.EmployeeName}</td>
                                <td>{entry.clockInTime}</td>
                                <td>{entry.clockOutTime}</td>
                                <td>{getStatusIcon(entry.clockOutTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }

export default ClockInTableAdmin
