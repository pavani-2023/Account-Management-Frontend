import React, { useEffect, useState } from 'react';
import axios from 'axios';
const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})
const ReportsAdmin = ({ selectedClientId }) => {
  const  uuid  =selectedClientId
    const [clockData, setClockData] = useState({  employeeName: '', department: '', designation: '', date: '', weekday: '', clockInTime: '', clockOutTime: '', totalHours: 0, totalMinutes: 0, comments: '' ,clientId:uuid});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeReports, setTimeReports] = useState([]);
    console.log('timeReports',timeReports)
    const[employeeId,setEmployeeId]= useState()

    const[employee,setEmployee]=useState([]);
    // console.log('employee',employee)


    const [selectedEmployeeId, setSelectedEmployeeID] = useState(""); 
    console.log('selectedemployeeid',selectedEmployeeId)

    const handleEmployeeChange = (event) => {
        setSelectedEmployeeID(event.target.value); 
        setTimeReports([])
    };


    useEffect(()=>{
        getemployees();
    },[uuid])

    const getemployees = async()=>{
        try{
            const response = await api.get(`/getemployeedetailsbyclientid/${uuid}`);
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
  }, [uuid]);


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
      
           if (employee.EmployeeID) {
              setError('Client ID and Employee ID are required.');
              return;
            }
      
          const response = await api.get(`/current-month/${clockData.clientId}/${selectedEmployeeId}`);
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
      
          if (employee.EmployeeID) {
            setError('Employee ID and Client ID are required.');
            return;
          }
      
          const response = await api.get(`/previous-month/${clockData.clientId}/${selectedEmployeeId}`);
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
          const response = await api.get(`/current-week/${clockData.clientId}/${selectedEmployeeId}`);
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
          const response = await api.get(`/previous-week/${clockData.clientId}/${selectedEmployeeId}`);
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
      <select style={{width:'300px'}} onChange={handleEmployeeChange}>
          <option>Select Employee</option>
          {employee.map((employee) => (
              <option key={employee.EmployeeId} value={employee.EmployeeID}>
                  {employee.EmployeeName}
              </option>
          ))}
        </select>
      </div>
      <br></br>
         <div style={{marginLeft:'50px'}}>
         <button onClick={fetchCurrentMonthData}>Current Month</button>
        <button onClick={fetchPreviousMonthData}>Previous Month</button>
        <button onClick={fetchPreviousWeekData}>Previous Week</button>
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

export default ReportsAdmin
