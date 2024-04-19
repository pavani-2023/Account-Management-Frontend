import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveList.css';
import { useParams } from 'react-router-dom';

function LeaveList() {
  const [leaveData, setLeaveData] = useState([]);
  const { uuid } = useParams();

  useEffect(() => {
    fetchLeavesData();
    // saveLeaveTableData();
  }, []);

  const fetchLeavesData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getLeaves/${uuid}`);
      setLeaveData(response.data);
    } catch (error) {
      console.log('error fetching leaves data', error);
    }
  }
  // console.log('leavedata',leaveData)


  return (
    <div >
      
      <table className="leave-table" >
        <thead>
          <tr>
            <th>SNo.</th>
            
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Approved / Rejected</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((leave, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              {/* <td>
                <input
                  type="text"
                  value={leave.comments}
                  onChange={(event) => handleCommentChange(index, event)}
                />
              </td> */}
              <td>{leave.comments}</td>
              <td>
               {leave.approvalStatus}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveList;
