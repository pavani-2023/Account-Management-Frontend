// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './LeaveList.css';
// import { useParams } from 'react-router-dom';

// function LeaveAdmin() {
//   const [leaveData, setLeaveData] = useState([]);
//   const { uuid } = useParams();

//   useEffect(() => {
//     fetchLeavesData();
//   }, []);

//   const fetchLeavesData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getLeaves');
//       setLeaveData(response.data.Data);
//     } catch (error) {
//       console.log('error fetching leaves data', error);
//     }
//   };

//   // Handler function to update approval status
//   const handleStatusChange = async (startDate, endDate, event) => {
//     const updatedLeaveData = [...leaveData];
//     const leaveIndex = updatedLeaveData.findIndex(leave => leave.startDate === startDate && leave.endDate === endDate);

//     if (leaveIndex !== -1) {
//       updatedLeaveData[leaveIndex].approvalStatus = event.target.value;
//       updatedLeaveData[leaveIndex].comments = event.target.value;
//       setLeaveData(updatedLeaveData);

//       try {
//         await axios.put('http://localhost:5000/updateLeave', {
//           startDate,
//           endDate,
//           approvalStatus: event.target.value,
//           comments:event.target.value,
//         });
//         console.log('Leave updated successfully');
//       } catch (error) {
//         console.log('Error updating leave', error);
//       }
//     }
//   };
//   const handleCommentsChange = (startDate, endDate, event) => {
//     const { value: comments } = event.target;
//     const updatedLeaveData = leaveData.map(leave => {
//       if (leave.startDate === startDate && leave.endDate === endDate) {
//         return { ...leave, comments };
//       }
//       return leave;
//     });
//     setLeaveData(updatedLeaveData);
//   };

//   // const handleStatusChange = async (empId,startDate, endDate, approvalStatus, comments) => {
//   //   try {
//   //     // Update local state
//   //     const updatedLeaveData = [...leaveData];
//   //     const leaveIndex = updatedLeaveData.findIndex(leave => leave.startDate === startDate && leave.endDate === endDate);
      
//   //     if (leaveIndex !== -1) {
//   //       updatedLeaveData[leaveIndex].approvalStatus = approvalStatus;
//   //       updatedLeaveData[leaveIndex].comments = comments;
//   //       setLeaveData(updatedLeaveData);
//   //     }
  
//   //     // Send request to update leave status
//   //     await axios.put(`http://localhost:5000/updateLeave/${empId}/${startDate}/${endDate}`, {
//   //       approvalStatus,
//   //       comments,
//   //     });
  
//   //     console.log('Leave updated successfully');
//   //   } catch (error) {
//   //     console.log('Error updating leave', error);
//   //   }
//   // };
  
//   return (
//     <div className='Main-Container'>
//       <table className="leave-table">
//         <thead>
//           <tr>
//             <th>SNo.</th>
//             <th>Employee Name</th>
//             <th>Department</th>
//             <th>Designation</th>
//             <th>Leave Type</th>
//             <th>From Date</th>
//             <th>To Date</th>
//             <th>No.Of Days</th>
//             <th>Reason</th>
//             <th>Approved / Rejected</th>
//             <th>Comments</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaveData.map((leave, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{leave.empName}</td>
//               <td>{leave.empDept}</td>
//               <td>{leave.empDesignation}</td>
//               <td>{leave.leaveType}</td>
//               <td>{leave.startDate}</td>
//               <td>{leave.endDate}</td>
//               <td>{leave.numberOfDays}</td>
//               <td>{leave.reason}</td>
//               <td>
//                 <select className='select'
//                   value={leave.approvalStatus}
//                   onChange={(event) => handleStatusChange(leave.startDate, leave.endDate, event)}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Approved">Approved</option>
//                   <option value="Rejected">Rejected</option>
//                 </select>
//               </td>
//               <td>{leave.comments}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LeaveAdmin;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveList.css';
import { useParams } from 'react-router-dom';

function LeaveAdmin() {
  const [leaveData, setLeaveData] = useState([]);
  const { uuid } = useParams();

  useEffect(() => {
    fetchLeavesData();
   
  }, []);

  const fetchLeavesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getLeaves');
      setLeaveData(response.data.Data);
    } catch (error) {
      console.log('error fetching leaves data', error);
    }
  };


  // const handleStatusChange = async (startDate, endDate, event) => {
  //   const { value: approvalStatus } = event.target;

  //   try {
  //     const updatedLeaveData = leaveData.map(leave => {
  //       if (leave.startDate === startDate && leave.endDate === endDate) {
  //         return { ...leave, approvalStatus };
  //       }
  //       return leave;
  //     });
  //     setLeaveData(updatedLeaveData);

  //     await axios.put('http://localhost:5000/updateLeave', {
  //       startDate,
  //       endDate,
  //       approvalStatus,
  //     });
  //     console.log('Leave updated successfully');
  //   } catch (error) {
  //     console.log('Error updating leave', error);
  //   }
  // };

  const handleStatusChange =(startDate, endDate, event) =>{
    const { value: approvalStatus } = event.target;
    const updatedLeaveData = leaveData.map(leave => {
      if (leave.startDate === startDate && leave.endDate === endDate) {
        return { ...leave, approvalStatus };
      }
      return leave;
    });
    setLeaveData(updatedLeaveData);
  }

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


  const updatedata = async () => {
    try {
      for (const leave of leaveData) {
        await axios.put('http://localhost:5000/updateLeave', {
          startDate: leave.startDate,
          endDate: leave.endDate,
          approvalStatus: leave.approvalStatus,
          comments: leave.comments
        });
      }
      console.log('Leave updated successfully');
    } catch (error) {
      console.log('Error updating data', error);
    }
  }
  
  return (
    <div className='Main-Container'>
      <div className='container'>
      <button onClick={updatedata}>Update</button>
      <table className='leaves' style={{marginTop:'50px',width:'100%'}}>
        <thead>
          <tr>
            <th>SNo.</th>
            <th >Employee Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>No.Of Days</th>
            <th style={{width:'200px'}}>Reason</th>
            <th>Approved / Rejected</th>
            <th style={{width:'200px'}}>Comments</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((leave,index) => (
            <tr key={index}>
            <td>{index + 1}</td>
              <td>{leave.empName}</td>
              <td>{leave.empDept}</td>
              <td>{leave.empDesignation}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.numberOfDays}</td>
              <td>{leave.reason}</td>
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
              <td>
                <input
                  type="text"
                  value={leave.comments}
                  onChange={(event) => handleCommentsChange(leave.startDate, leave.endDate, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
    </div>
  );
}

export default LeaveAdmin;

