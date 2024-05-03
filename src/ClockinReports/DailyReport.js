

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './dailyclockin.css';
import { useParams } from 'react-router-dom';
const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})
function DailyReport() {
    const { uuid } = useParams();
    // console.log('uuid',uuid)
    const [clockData, setClockData] = useState({ employeeId: uuid, employeeName: '', department: '', designation: '', date: '', weekday: '', clockInTime: '', clockOutTime: '', totalHours: 0, totalMinutes: 0, comments: '' ,clientId:''});
    const [loading, setLoading] = useState(false);

    // console.log(clockData);
    useEffect(()=>{
      getemployeeDetails();
    },[])
    const getemployeeDetails=async()=>{
      try {
        const response = await api.get(`/getemployeeDetails/${uuid}`);
        const data = response.data
        // console.log('response',response.data)
        setClockData(prevState => ({
          ...prevState,
          employeeName: data.EmployeeName,
          department: data.dep,
          designation: data.Designation,
          clientId:data.clientId
         
        }));
           
      }catch(error){
        console.log('error fetching employeedetails',error)
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

    useEffect(() => {
      
        if (clockData.employeeId && clockData.date) {
            fetchFirstClockInAndOut();
        }
    }, [clockData.employeeId, clockData.date]); 

    
    const fetchFirstClockInAndOut = () => {
        // console.log('Fetching first clock-in and clock-out for employee ID and date:', clockData.employeeId, clockData.date);
        api.get(`/first-clock-in-out/${clockData.employeeId}/${clockData.date}`)
            .then(response => {
                const { clockInTime, clockOutTime, comments } = response.data;
        
                setClockData(prevState => ({
                    ...prevState,
                    clockInTime: clockInTime,
                    clockOutTime: clockOutTime,
                    comments: comments,
                    totalHours: calculateTotalHours(clockInTime, clockOutTime)
                }));
            })
            .catch(error => {
                console.error('Error fetching first clock-in and clock-out:', error);
            });
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getDayOfWeek = (dayIndex) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayIndex];
    };

    const calculateTotalHours = (clockInTime, clockOutTime) => {
        if (!clockInTime || !clockOutTime) {
            return '';
        }

        const clockIn = new Date(`2000-01-01T${clockInTime}`);
        const clockOut = new Date(`2000-01-01T${clockOutTime}`);

        const timeDifference = clockOut - clockIn;
        const totalHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const totalMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        if (totalHours === 0 && totalMinutes === 0) {
            return '0 hours 0 minutes';
        } else if (totalHours === 0) {
            return `${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
        } else if (totalMinutes === 0) {
            return `${totalHours} hour${totalHours !== 1 ? 's' : ''}`;
        } else {
            return `${totalHours} hour${totalHours !== 1 ? 's' : ''} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
        }
    };

    const padZero = (number) => {
        return (number < 10 ? '0' : '') + number;
    };

    const searchEmployeeInfo = () => {
        console.log("Search Function")
    };

    const clockInOut = () => {
        if (clockData.employeeId.trim() === '') {
            return;
        }

        setLoading(true);

        const currentTime = new Date();
        const formattedTime = `${padZero(currentTime.getHours())}:${padZero(currentTime.getMinutes())}`;

        let clockDataToSend = {
            ...clockData,
            totalHours: calculateTotalHours(clockData.clockInTime, formattedTime),
            employeeName:clockData.employeeName
        };

        if (!clockData.clockInTime) {
            const clockInComment = `You clocked in successfully at ${formattedTime}`;

            setClockData(prevState => ({
                ...prevState,
                clockInTime: formattedTime,
                comments: prevState.comments ? prevState.comments + '\n' + clockInComment : clockInComment
            }));

            clockDataToSend = {
                ...clockDataToSend,
                clockInTime: formattedTime,
                comments: clockInComment
            };
        } else if (!clockData.clockOutTime) {
            const clockOutComment = `You clocked out successfully at ${formattedTime}`;

            setClockData(prevState => ({
                ...prevState,
                clockOutTime: formattedTime,
                comments: prevState.comments ? prevState.comments + '\n' + clockOutComment : clockOutComment,
                totalHours: calculateTotalHours(clockData.clockInTime, formattedTime) // Update total hours when clocking out
            }));

            clockDataToSend = {
                ...clockDataToSend,
                clockOutTime: formattedTime,
                comments: clockOutComment
            };
        } else {
          
            const clockInOutComment = `You have already clocked in at ${clockData.clockInTime} and clocked out at ${clockData.clockOutTime}`;

            setClockData(prevState => ({
                ...prevState,
                comments: prevState.comments ? prevState.comments + '\n' + clockInOutComment : clockInOutComment
            }));

            setLoading(false);
            return;
        }

   
        api.post('/dailyclockin-clockout',  clockDataToSend)
    .then(response => {
        console.log('Clock data sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending clock data:', error);
    })
    .finally(() => {
        setLoading(false);
    });

    };



    return (
        <div>
            <div id='header-container'>
                <div id='title'>
                    <h2>Daily Clock-In / Clock-out</h2>
                </div>
            </div>
            <div id='employeeInfo' className="employee-info-row">
    
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={clockData.date} onChange={(e) => setClockData(prevState => ({ ...prevState, date: e.target.value }))} required />
                </div>
            </div>
            {/* <button onClick={clockInOut}>{clockedIn ? 'Clock Out' : 'Clock In'}</button> */}
            <div id='clockin-clockout'>
                <button onClick={clockInOut} disabled={loading || (clockData.clockInTime && clockData.clockOutTime)}>
                    {clockData.clockInTime && clockData.clockOutTime ? 'Clock In/Out Completed' : clockData.clockInTime ? 'Clock Out' : 'Clock In'}
                </button>
            </div>
            <table className='clockin-table' style={{width:'95%'}}>
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
                    <tr>
                        <td>{clockData.date}</td>
                        <td>{clockData.weekday}</td>
                        <td>{clockData.clockInTime}</td>
                        <td>{clockData.clockOutTime}</td>
                        <td>{clockData.totalHours}</td>
                        <td>{clockData.comments}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DailyReport;