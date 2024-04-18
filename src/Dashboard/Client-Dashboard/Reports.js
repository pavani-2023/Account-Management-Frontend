import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Reports() {
    const { uuid } = useParams();
    const [clockData, setClockData] = useState({  employeeName: '', department: '', designation: '', date: '', weekday: '', clockInTime: '', clockOutTime: '', totalHours: 0, totalMinutes: 0, comments: '' ,clientId:uuid});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeReports, setTimeReports] = useState([]);
    console.log('timeReports',timeReports)
    const[employeeId,setEmployeeId]= useState()

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
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[dayIndex];
      };


      const fetchCurrentMonthData = async () => {
        try {
          setLoading(true);
          setError('');
      
          if (employee.EmployeeId) {
            setError('Employee ID and Client ID are required.');
            return;
          }
      
          const response = await axios.get(`http://localhost:5000/current-month/${clockData.clientId}/${employee.EmployeeId}`);
          setTimeReports(response.data.map(report => ({
            ...report,
            weekday: getDayOfWeek(new Date(report.date).getDay())
          })));
        } catch (error) {
          console.error('Error fetching current month data:', error);
          setError('Error fetching current month data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
      const fetchPreviousMonthData = async () => {
        try {
          setLoading(true);
          setError('');
      
          if (employee.EmployeeId) {
            setError('Employee ID and Client ID are required.');
            return;
          }
      
          const response = await axios.get(`http://localhost:5000/previous-month/${clockData.clientId}/${employee.EmployeeId}`);
          setTimeReports(response.data.map(report => ({
            ...report,
            weekday: getDayOfWeek(new Date(report.date).getDay())
          })));
        } catch (error) {
          console.error('Error fetching previous month data:', error);
          setError('Error fetching previous month data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      const fetchCurrentWeekData = async () => {
        try {
          setLoading(true);
          setError('');
          if (employee.EmployeeId) {
            setError('Employee ID and Client ID are required.');
            return;
          }
          const response = await axios.get(`http://localhost:5000/current-week/${clockData.clientId}/${employee.EmployeeId}`);
          const apiData = response.data;
          setTimeReports(apiData);
      
        } catch (error) {
          console.error('Error fetching current week data:', error);
          setError('Error fetching current week data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
      const fetchPreviousWeekData = async () => {
        try {
          setLoading(true);
          setError('');


          if (employee.EmployeeId) {
            setError('Employee ID and Client ID are required.');
            return;
          }
          const response = await axios.get(`http://localhost:5000/previous-week/${clockData.clientId}/${employee.EmployeeId}`);
          const apiData = response.data;
          setTimeReports(apiData);
      
        } catch (error) {
          console.error('Error fetching previous week data:', error);
          setError('Error fetching previous week data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>
      <div style={{width:'300px',margin:'auto'}}>
      <select style={{width:'300px'}}>
          <option>Select Employee</option>
          {employee.map((employee) => (
              <option key={employee.EmployeeId} value={employee.EmployeeName}>
                  {employee.EmployeeName}
              </option>
          ))}
        </select>
      </div>
      <br></br>
         <div style={{marginLeft:'50px'}}>
         <button onClick={fetchCurrentMonthData}>Current Month</button>
        <button onClick={fetchPreviousMonthData}>Previous Month</button>
        <button onClick={fetchPreviousWeekData}>Present Week</button>
        <button onClick={fetchCurrentWeekData}>Current Week</button>
         </div>
       
       <table className='clockin-table' style={{margin:'auto',marginTop:'50px'}}>
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
                  {timeReports.map((item,index)=>(
                    <tr key={index}>
                      <td>{formatDate(new Date(item.date))}</td>
                      <td>{getDayOfWeek(new Date(item.date).getDay())}</td>
                      <td>{item.clockInTime}</td>
                      <td>{item.clockOutTime}</td>
                      <td>{item.totalHours}</td>
                      <td>{item.comments}</td>
                    </tr>
                  ))}
                    
                </tbody>
            </table>
    </div>
  )
}

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function Reports() {
//     const[employee,setEmployee]=useState([]);
//     console.log('employee',employee)
//     const { uuid } = useParams();
//     useEffect(()=>{
//         getemployees();
//     },[uuid])

//     const getemployees = async()=>{
//         try{
//             const response = await axios.get(`http://localhost:5000/getemployeedetailsbyclientid/${uuid}`);
//              setEmployee(response.data.data)
//         }catch(error){
//             console.log('error getting employee details')
//         }
//     }
//   return (
//     <div>
//       <div>
//         <select>
//           <option>Select Employee</option>
//           {employee.map((employee) => (
//               <option key={employee.EmployeeId} value={employee.EmployeeName}>
//                   {employee.EmployeeName}
//               </option>
//           ))}
//         </select>

//       </div>
//     </div>
//   )
// }
