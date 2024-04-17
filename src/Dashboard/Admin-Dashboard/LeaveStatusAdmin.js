
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveStatusAdmin = ({ selectedClientId }) => {
  
        const [leaveData, setLeaveData] = useState([]);
        console.log('leaveData',leaveData)
        const  uuid  = selectedClientId
        console.log('uuid',uuid)
      
        useEffect(() => {
          fetchLeavesData();
         
        }, [uuid]);
      
        const fetchLeavesData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/getleavesbyclientid/${uuid}`);
            setLeaveData(response.data.Data);
          } catch (error) {
            console.log('error fetching leaves data', error);
          }
        };
      
      
        const handleStatusChange = async (startDate, endDate, event) => {
          const { value: approvalStatus } = event.target;
      
          try {
            const updatedLeaveData = leaveData.map(leave => {
              if (leave.startDate === startDate && leave.endDate === endDate) {
                return { ...leave, approvalStatus };
              }
              return leave;
            });
            setLeaveData(updatedLeaveData);
      
            await axios.put('http://localhost:5000/updateLeave', {
              startDate,
              endDate,
              approvalStatus,
            });
            console.log('Leave updated successfully');
          } catch (error) {
            console.log('Error updating leave', error);
          }
        };
      
        // const handleStatusChange =(startDate, endDate, event) =>{
        //   const { value: approvalStatus } = event.target;
        //   const updatedLeaveData = leaveData.map(leave => {
        //     if (leave.startDate === startDate && leave.endDate === endDate) {
        //       return { ...leave, approvalStatus };
        //     }
        //     return leave;
        //   });
        //   setLeaveData(updatedLeaveData);
        // }
      
        const handleCommentsChange = (startDate, endDate, event) => {
          const { value: comments } = event.target;
          const updatedLeaveData = leaveData.map(leave => {
            if (leave.startDate === startDate && leave.endDate === endDate) {
              return { ...leave, comments };
            }
            return leave;
          });
          setLeaveData(updatedLeaveData);
        };
      
      
       
        
        return (
          
            <div>
            
            <table className='leaves-client' style={{width:'100%',marginTop:'30px'}}>
              <thead>
                <tr>
                  {/* <th>SNo.</th> */}
                  <th >Employee Name</th>
                  {/* <th>Department</th> */}
                  {/* <th>Designation</th> */}
                  <th>Leave Type</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>No.Of Days</th>
                  {/* <th style={{width:'200px'}}>Reason</th> */}
                  <th>Status</th>
                  {/* <th style={{width:'200px'}}>Comments</th> */}
                </tr>
              </thead>
              <tbody>
                {leaveData.map((leave,index) => (
                  <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                    <td >{leave.empName}</td>
                    {/* <td>{leave.empDept}</td> */}
                    {/* <td>{leave.empDesignation}</td> */}
                    <td>{leave.leaveType}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.numberOfDays}</td>
                    {/* <td>{leave.reason}</td> */}
                    <td>
                      <select className='select'
                        value={leave.approvalStatus}
                        onChange={(event) => handleStatusChange(leave.startDate, leave.endDate, event)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    {/* <td>
                      <input
                        type="text"
                        value={leave.comments}
                        onChange={(event) => handleCommentsChange(leave.startDate, leave.endDate, event)}
                      />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
      
        );
      }

export default LeaveStatusAdmin
