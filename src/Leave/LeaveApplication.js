// import React, { useEffect, useState } from 'react';
// import './LeaveApplication.css';
// import employeeData from './employeeData.json';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const LeaveApplication = ({ show, onClose }) => {
//   const { uuid } = useParams();
//   console.log('uuid',uuid)
  

//   const [employeeList, setEmployeeList] = useState([]);
//   const [formData, setFormData] = useState({ empId:uuid, empName: '', empDept: '', empDesignation: '', leaveType: '', leaveDuration: '', startDate: '', endDate: '', startTime: '04:00', endTime: '08:00', numberOfDays: 0, numberOfHours: 0, reason: '',});
//   console.log('employeeslist',employeeList)
//   const [selectedEmpId, setSelectedEmpId] = useState(''); 

//   useEffect(()=>{
//     fetchemployeeDetails();
//   },[])


//   const fetchemployeeDetails= async()=>{
//     try{
//       const response = await axios.get(`http://localhost:5000/getemployeeDetails/${uuid}`)
//       setEmployeeList(response.data)
//       console.log('response',response.data)
//     }catch(error){
//       console.log('error fetching employee details',error)
//     }
//   }

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
  
//   //   if (name === 'empId') {
//   //     setSelectedEmpId(value);
//   //     const selectedEmployee = employeeList.find(
//   //       (employee) => employee.empId === value
//   //     );
  
//   //     if (selectedEmployee) {
//   //       setFormData({
//   //         ...formData,
//   //         empName: selectedEmployee.empName,
//   //         empDept: selectedEmployee.empDept,
//   //         empDesignation: selectedEmployee.Designation
//   //       });
//   //     }
//   //   } else {
//   //     // Handle other input changes
//   //     setFormData({
//   //       ...formData,
//   //       [name]: value,
//   //     });
//   //   }
//   // };
  

//   const handleLeaveDurationChange = (e) => {
//     const { value } = e.target;
//     setFormData({ ...formData, leaveDuration: value, startDate: '', endDate: '', startTime: value === 'First Half' ? '04:00' : '08:00', endTime: value === 'First Half' ? '08:00' : '13:00',});
//   };

//   const calculateNumberOfHours = () => {
//     const { startTime, endTime } = formData;
//     const start = new Date(`1970-01-01T${startTime}`);
//     const end = new Date(`1970-01-01T${endTime}`);
//     const minutesDifference = (end - start) / (1000 * 60);
//     const hoursDifference = minutesDifference / 60;
//     setFormData({ ...formData, numberOfHours: hoursDifference });
//   };

//   const calculateNumberOfDays = () => {
//     const { startDate, endDate } = formData;
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const timeDifference = end.getTime() - start.getTime();
//     const daysDifference = timeDifference / (1000 * 3600 * 24);
//     setFormData({ ...formData, numberOfDays: daysDifference+1 });
//   };

//   useEffect(() => {
//     if (formData.leaveDuration === 'One Day') {
//       setFormData({ ...formData, numberOfDays: 1 });
//     } else if (formData.leaveDuration === 'Multiple Days') {
//       calculateNumberOfDays();
//     } else if (['First Half', 'Second Half'].includes(formData.leaveDuration)) {
//       calculateNumberOfHours();
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formData.leaveDuration, formData.startDate, formData.endDate, formData.startTime, formData.endTime]);

//   if (!show) {
//     return null;
//   }

//   console.log('formdata',formData)
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const formDataWithEmpId = { ...formData, empId: selectedEmpId };
//     await axios.post('http://localhost:5000/employeeLeaves', formDataWithEmpId);
//     window.alert('Submitted Successfully');
//     onClose();
//   } catch (err) {
//     console.log('Error', err);
//     window.alert('Error submitting data. Please try again.');
//   }
// };


//   const handleClear = () => {
//     setFormData({ empId: '', empName: '', empDept: '', empDesignation: '', leaveType: '', leaveDuration: '', startDate: '', endDate: '', startTime: '04:00', endTime: '08:00', numberOfDays: 0, numberOfHours: 0, reason: '', message: '',});
//     setSelectedEmpId('');
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'empId') {
//       setSelectedEmpId(value);
//       const selectedEmployee = employeeList.find(
//         (employee) => employee.empId === value
//       );
//       if (selectedEmployee) {
//         setFormData({
//           ...formData,
//           empName: selectedEmployee.empName,
//           empDept: selectedEmployee.dep,
//           empDesignation: selectedEmployee.Designation,
//         });
//       }
//     } else {
//       // Handle other input changes
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <form className="modal-form">
//           <span className="close" onClick={onClose}>&times;</span>
//           <label>Employee ID:
         
//             <input  type="text" value={uuid}/>
//           </label>
//           {/* <label>Name<input type="text" name="empName" id='EmployeeName'value={employeeList.EmployeeName} onChange={() => {}}/></label>
//           <label>Department<input type="text" name="empDept" value={employeeList.dep} onChange={() => {}}/></label>
//           <label>Designation<input type="text" name="empDesignation" value={employeeList.Designation} onChange={handleInputChange}/></label> */}

//           <label>Name<input type="text" name="empName" id='EmployeeName'value={formData.empName} onChange={handleInputChange}/></label>
//           <label>Department<input type="text" name="empDept" value={formData.empDept} onChange={handleInputChange}/></label>
//           <label>Designation<input type="text" name="empDesignation" value={formData.empDesignation} onChange={handleInputChange}/></label>
//           <label>Leave Type:<select name="leaveType" value={formData.leaveType || ''} onChange={handleInputChange} className='custom-dropdown'>
//                               <option value="">Select Leave Type</option>
//                               <option value="Casual Leave">Casual Leave</option>
//                               <option value="Sick Leave">Sick Leave</option>
//                               <option value="Vacation">Vacation</option> 
//                             </select> 
//           </label>
//           <label className="leaveDurationLabel">Leave Duration:
//             <div className="radioGroup">
//               <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
//                 <input type="radio" id="oneDay" name="leaveDuration" value="One Day" checked={formData.leaveDuration === 'One Day'} onChange={handleInputChange} style={{cursor: 'pointer'}}/>
//                 <label htmlFor="oneDay" style={{marginTop: '8px', cursor: 'pointer'}}>One Day</label>
//               </div>
//               <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
//                 <input type="radio" id="firstHalf" name="leaveDuration" value="First Half" checked={formData.leaveDuration === 'First Half'} onChange={handleLeaveDurationChange} style={{cursor: 'pointer'}}/>
//                 <label htmlFor="firstHalf" style={{marginTop: '8px', cursor: 'pointer'}}>First Half</label>
//               </div>
//               <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
//                 <input type="radio" id="secondHalf" name="leaveDuration" value="Second Half" checked={formData.leaveDuration === 'Second Half'} onChange={handleLeaveDurationChange} style={{cursor: 'pointer'}}/>
//                 <label htmlFor="secondHalf" style={{marginTop: '8px', cursor: 'pointer'}}>Second Half</label>
//               </div>
//               <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
//                 <input type="radio" id="multipleDays" name="leaveDuration" value="Multiple Days" checked={formData.leaveDuration === 'Multiple Days'} onChange={handleInputChange} style={{cursor: 'pointer'}}/>
//                 <label htmlFor="multipleDays" style={{marginTop: '8px', cursor: 'pointer'}}>Multiple Days</label>
//               </div>
//             </div>
//           </label>
//           {formData.leaveDuration === 'One Day' && (
//             <div>
//               <label>Date:
//                 <input type="date"  className="date" name="startDate"
//                   value={formData.startDate} onChange={handleInputChange}/>
//               </label>
//             </div>
//           )}
//           {['First Half', 'Second Half'].includes(formData.leaveDuration) && (
//             <div>
//               <label>Start Date:
//                 <input type="date" className="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
//               </label>
//               <div style={{display: 'flex', gap: '20px'}}>
//                 <label> Start Time:
//                   <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} />
//                 </label>
//                 <label> End Time: 
//                   <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} />
//                 </label>
//               </div>
//             </div>
//           )}
//           {formData.leaveDuration === 'Multiple Days' && (
//             <div style={{display: 'flex', gap: '50px'}}>
//               <label>Start Date:
//                 <input type="date" className="date" name="startDate" value={formData.startDate} onChange={handleInputChange}/>
//               </label>
//               <label>End Date:
//                 <input type="date"  className="date" name="endDate" value={formData.endDate} onChange={handleInputChange}/>
//               </label>
//             </div>
//           )}
//           {(['Multiple Days', 'One Day'].includes(formData.leaveDuration)) && (
//             <div>
//               <label>
//                 {formData.leaveDuration === 'Multiple Days'  ? 'Number of Days:' : 'Number of Days:'}
//                 <input type="number" name="numberOfDays" value={formData.numberOfDays} readOnly />
//               </label>
//             </div>
//           )}
//           {(['First Half', 'Second Half'].includes(formData.leaveDuration)) && (
//             <div>
//               <label>
//                 {formData.leaveDuration === 'Second Half' ? 'Number of Hours:' : 'Number of Hours:'}
//                 <input type="number" name="numberOfHours" value={formData.numberOfHours} readOnly />
//               </label>
//             </div>
//           )}
//           <label>Reason for Leave:
//             <textarea name="reason" value={formData.reason} onChange={handleInputChange}/>
//           </label>
//           <label>Message / Comments:
//             <textarea name="message" value={formData.message} onChange={handleInputChange}/>
//           </label>
//           <div>
//             <button onClick={handleSubmit}>Submit</button>
//             <button type="button" onClick={handleClear}>Clear</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LeaveApplication;


import React, { useEffect, useState } from 'react';
import './LeaveApplication.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LeaveApplication = ({ show, onClose }) => {
  const { uuid } = useParams();

  const [employeeList, setEmployeeList] = useState([]);
  const [formData, setFormData] = useState({ empId:uuid, empName: '', empDept: '', empDesignation: '', leaveType: '', leaveDuration: '', startDate: '', endDate: '', startTime: '04:00', endTime: '08:00', numberOfDays: 0, numberOfHours: 0, reason: '',});
  const [selectedEmpId, setSelectedEmpId] = useState(''); 

  useEffect(()=>{
    fetchemployeeDetails();
  },[])

  const fetchemployeeDetails= async()=>{
    try{
      const response = await axios.get(`http://localhost:5000/getemployeeDetails/${uuid}`)
      setEmployeeList(response.data)

    }catch(error){
      console.log('error fetching employee details',error)
    }
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  
  //   if (name === 'empId') {
  //     setSelectedEmpId(value);
  //     const selectedEmployee = employeeList.find(
  //       (employee) => employee.empId === value
  //     );
  
  //     if (selectedEmployee) {
  //       setFormData({
  //         ...formData,
  //         empName: selectedEmployee.empName,
  //         empDept: selectedEmployee.empDept,
  //         empDesignation: selectedEmployee.Designation
  //       });
  //     }
  //   } else {
  //     // Handle other input changes
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };
  

  const handleLeaveDurationChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, leaveDuration: value, startDate: '', endDate: '', startTime: value === 'First Half' ? '04:00' : '08:00', endTime: value === 'First Half' ? '08:00' : '13:00',});
  };

  const calculateNumberOfHours = () => {
    const { startDate, endDate } = formData;
        const start = new Date(startDate);
        const end = new Date(endDate);
    const minutesDifference = (end - start) / (1000 * 60);
    const hoursDifference = minutesDifference / 60;
    setFormData({ ...formData, numberOfHours: hoursDifference });
  };

  const calculateNumberOfDays = () => {
    const { startDate, endDate } = formData;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    setFormData({ ...formData, numberOfDays: daysDifference+1 });
  };

  useEffect(() => {
    if (formData.leaveDuration === 'One Day') {
      setFormData({ ...formData, numberOfDays: 1 });
    } else if (formData.leaveDuration === 'Multiple Days') {
      calculateNumberOfDays();
    } else if (['First Half', 'Second Half'].includes(formData.leaveDuration)) {
      calculateNumberOfHours();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.leaveDuration, formData.startDate, formData.endDate, formData.startTime, formData.endTime]);

  if (!show) {
    return null;
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataWithEmpId = { ...formData, empId: uuid, empName: employeeList.EmployeeName, empDept: employeeList.dep, empDesignation: employeeList.Designation };
    // console.log(formDataWithEmpId)
    await axios.post('http://localhost:5000/employeeLeaves', formDataWithEmpId);
    window.alert('Submitted Successfully');
    onClose();
  } catch (err) {
    console.log('Error', err);
    window.alert('Error submitting data. Please try again.');
  }
};


  const handleClear = () => {
    setFormData({ empId: '', empName: '', empDept: '', empDesignation: '', leaveType: '', leaveDuration: '', startDate: '', endDate: '', startTime: '04:00', endTime: '08:00', numberOfDays: 0, numberOfHours: 0, reason: '', message: '',});
    setSelectedEmpId('');
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'empId') {
      setSelectedEmpId(value);
      const selectedEmployee = employeeList.find(
        (employee) => employee.empId === value
      );
      if (selectedEmployee) {
        setFormData({
          ...formData,
          empName: selectedEmployee.empName,
          empDept: selectedEmployee.dep,
          empDesignation: selectedEmployee.Designation,
        });
      }
    } else {
      // Handle other input changes
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <form className="modal-form">
          <span className="close" onClick={onClose}>&times;</span>
          <label>Employee ID:
         
            <input  type="text" value={uuid}/>
          </label>
          {/* <label>Name<input type="text" name="empName" id='EmployeeName'value={employeeList.EmployeeName} onChange={() => {}}/></label>
          <label>Department<input type="text" name="empDept" value={employeeList.dep} onChange={() => {}}/></label>
          <label>Designation<input type="text" name="empDesignation" value={employeeList.Designation} onChange={handleInputChange}/></label> */}

          <label>Name<input type="text" name="empName" id='EmployeeName' value={employeeList.EmployeeName} /></label>
          <label>Department<input type="text" name="empDept" value={employeeList.dep} /></label>
          <label>Designation<input type="text" name="empDesignation" value={employeeList.Designation} /></label>
          <label>Leave Type:<select name="leaveType" value={formData.leaveType || ''} onChange={handleInputChange} className='custom-dropdown'>
                              <option value="">Select Leave Type</option>
                              <option value="Casual Leave">Casual Leave</option>
                              <option value="Sick Leave">Sick Leave</option>
                              <option value="Vacation">Vacation</option> 
                            </select> 
          </label>
          <label className="leaveDurationLabel">Leave Duration:
            <div className="radioGroup">
              <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
                <input type="radio" id="oneDay" name="leaveDuration" value="One Day" checked={formData.leaveDuration === 'One Day'} onChange={handleInputChange} style={{cursor: 'pointer'}}/>
                <label htmlFor="oneDay" style={{marginTop: '8px', cursor: 'pointer'}}>One Day</label>
              </div>
              <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
                <input type="radio" id="firstHalf" name="leaveDuration" value="First Half" checked={formData.leaveDuration === 'First Half'} onChange={handleLeaveDurationChange} style={{cursor: 'pointer'}}/>
                <label htmlFor="firstHalf" style={{marginTop: '8px', cursor: 'pointer'}}>First Half</label>
              </div>
              <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
                <input type="radio" id="secondHalf" name="leaveDuration" value="Second Half" checked={formData.leaveDuration === 'Second Half'} onChange={handleLeaveDurationChange} style={{cursor: 'pointer'}}/>
                <label htmlFor="secondHalf" style={{marginTop: '8px', cursor: 'pointer'}}>Second Half</label>
              </div>
              <div className="radioOption" style={{display: 'flex', gap: '5px'}}>
                <input type="radio" id="multipleDays" name="leaveDuration" value="Multiple Days" checked={formData.leaveDuration === 'Multiple Days'} onChange={handleInputChange} style={{cursor: 'pointer'}}/>
                <label htmlFor="multipleDays" style={{marginTop: '8px', cursor: 'pointer'}}>Multiple Days</label>
              </div>
            </div>
          </label>
          {formData.leaveDuration === 'One Day' && (
            <div>
              <label>Date:
                <input type="date"  className="date" name="startDate"
                  value={formData.startDate} onChange={handleInputChange}/>
              </label>
            </div>
          )}
          {['First Half', 'Second Half'].includes(formData.leaveDuration) && (
            <div>
              <label>Start Date:
                <input type="date" className="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
              </label>
              <div style={{display: 'flex', gap: '20px'}}>
                <label> Start Time:
                  <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} />
                </label>
                <label> End Time: 
                  <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} />
                </label>
              </div>
            </div>
          )}
          {formData.leaveDuration === 'Multiple Days' && (
            <div style={{display: 'flex', gap: '50px'}}>
              <label>Start Date:
                <input type="date" className="date" name="startDate" value={formData.startDate} onChange={handleInputChange}/>
              </label>
              <label>End Date:
                <input type="date"  className="date" name="endDate" value={formData.endDate} onChange={handleInputChange}/>
              </label>
            </div>
          )}
          {(['Multiple Days', 'One Day'].includes(formData.leaveDuration)) && (
            <div>
              <label>
                {formData.leaveDuration === 'Multiple Days'  ? 'Number of Days:' : 'Number of Days:'}
                <input type="number" name="numberOfDays" value={formData.numberOfDays} readOnly />
              </label>
            </div>
          )}
          {(['First Half', 'Second Half'].includes(formData.leaveDuration)) && (
            <div>
              <label>
                {formData.leaveDuration === 'Second Half' ? 'Number of Hours:' : 'Number of Hours:'}
                <input type="number" name="numberOfHours" value={formData.numberOfHours} readOnly />
              </label>
            </div>
          )}
          <label>Reason for Leave:
            <textarea name="reason" value={formData.reason} onChange={handleInputChange}/>
          </label>
          <label>Message / Comments:
            <textarea name="message" value={formData.message} onChange={handleInputChange}/>
          </label>
          <div>
            <button onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplication;