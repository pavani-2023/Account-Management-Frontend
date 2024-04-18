import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeLIst.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faEnvelope,faPhone,faUser,faGear,faArrowLeft ,faPenToSquare,} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Signup from '../Registration/Signup';

const EmployeeList = () => {

  //state for employee details
  const [employees, setEmployees] = useState([]);

  //state for employee registration details
  const[employeelogindetails,setEmployeeLoginDetails]= useState([]);

  //state for selected empolyee registration details
  const[seletcedEmployeeLoginDetails,setSelectedEMployeeLOginDetails]=useState();

  //state to track selected employee 
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const [formData, setFormData] = useState({});


  //state to visibilty of form
  const[employeedataform,setEmployeedataForm]=useState(null);
  const[employeedetailsform,setEMployeeDetailsform]=useState(null)

  //states to visibilty of sections in form
  const[personaldetails,setPersonaldetails]= useState(true);
  const[officedetails,setOfficeDetails]=useState(false);
  const[Govtproofs,setGovtProofs]=useState(false);
  const [bankdet,setBankDet]=useState(false);
  const[clientdet,setClientDet]=useState(false);
  const[newemp,setNewEmp] =useState(false);
  const[settingicon,SetSettingIcon]=useState();
  const [updatedLoginDetails, setUpdatedLoginDetails] = useState();
 
  useEffect(() => {
    fetchEmployeedata();
    fetchemployeelogindetails();
    
   
   
  }, []);
  useEffect(()=>{
    getSelectedEmployeeLoginDetails();
  
  },[selectedEmployee])

  const fetchEmployeedata = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Employee');
      setEmployees(response.data); 
      const employeedata = response.data[0];
      // console.log('response',employeedata)
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // const getEmployeeDetails = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/employee/${employeeData.EmployeeID}`)
  //     console.log('Fetched employee details', response.data);
  //   } catch (error) {
  //     console.log('Error fetching employee details', error);
  //   }
  // }
  // app.get('/employee/:id', async(req, res) => {
  //   const id = req.params.id;
  //     try{
  //     // Find the employee with the given ID
  //     const employee =await Employee.find(emp => emp.EmployeeID === id);
  
  //     if (!employee) {
  //         return res.status(404).json({ error: 'Employee not found' });
  //     }
  
  //     res.json(employee);
  //     }catch(error){
  //       console.error('Error fetching employee data:', error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
        
  // });

const fetchemployeelogindetails=async()=>{

    try {
          const response = await axios.get('http://localhost:5000/submitForm');
          setEmployeeLoginDetails(response.data); 
          const employeedata = response.data;
          console.log('response',employeedata)
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

const updateEmployeedata=async()=>{
    try{
      const response = await axios.put('http://localhost:5000/submitForm',{uuid:formData.EmployeeID,email:formData.email,password:formData.password})
      console.log(response);

    }catch(error){
      console.log('erroe updating login details',error)
    }
}

console.log('selected',employees.EmployeeID)


// const getSelectdEmployeeLoginDetails=()=>{
//     if(selectedEmployee){
//      const data =  employeelogindetails.find(user => user.uuid === selectedEmployee.EmployeeID);
//      console.log('dataaaa',data.uuid)
//      return setSelectedEMployeeLOginDetails(data);
//     }
//     return null;
// }

const getSelectedEmployeeLoginDetails = () => {
  if (selectedEmployee) {
      const data = employeelogindetails.find(user => user.uuid === selectedEmployee.EmployeeID);
      if (data) {
          console.log('dataaaa', data.uuid);
          setSelectedEMployeeLOginDetails(data);
          return data;
      } else {
          console.log("No employee login details found for the selected employee.");
          return null;
      }
  }
  return null;
}
// console.log('selectes', selectedEmployee.EmployeeID)
console.log('employee login details',employeelogindetails)
console.log('sleected employee login details',seletcedEmployeeLoginDetails)


  const handleopenSetting=()=>{
    
    // setEMployeeDetailsform(false);
    // SetSettingIcon(true);
    SetSettingIcon(!settingicon);
  }

  const handleback=()=>{
    setEMployeeDetailsform(true);
    SetSettingIcon(false);
  }

  const handleform=(employees)=>{
    setEmployeedataForm(true);
    setEMployeeDetailsform(!employeedataform)
    setSelectedEmployee(employees)
    setPersonaldetails(true);
    setOfficeDetails(false);
    setGovtProofs(false);
    setBankDet(false);
    setClientDet(false);
  }
  const handleformclose=()=>{
    setEmployeedataForm(null);
    setFormData('');
  }
  const handlepersonaldet =()=>{
    setPersonaldetails(!personaldetails);
  }
  const handleofficedetails=()=>{
    setOfficeDetails(!officedetails)
  }

  const handleGovtproofs=()=>{
    setGovtProofs(!Govtproofs)
  }

  const handlebankdet=()=>{
    setBankDet(!bankdet);
  }
  const handleclientdet=()=>{
    setClientDet(!clientdet);
  }
  const handleforms=()=>{
    setNewEmp(true);
  }
  const handlecloseform=()=>{
    setNewEmp(false);
  }

  // const [activeDiv, setActiveDiv] = useState(1);

  // const displayDiv = (divNumber) => {
  //     setActiveDiv(divNumber);
  // };


  const handleInputChange = (e, id, field) => {
    const updatedEmployees = employees.map(employee => {
      if (employee.EmployeeID === id) {
        return {
          ...employee,
          [field]: e.target.value
        };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
    setSelectedEmployee(updatedEmployees);

    const updatelogindetails =employeelogindetails.map(employee=>{
      if (employee.uuid === id) {
        return {
          ...employee,
          [field]: e.target.value
        };
      }
      return employee;
    });
   
    setSelectedEMployeeLOginDetails(updatelogindetails)
    
    // Assuming you have another state called formData to update modified fields
    const updatedFormData ={ ...formData, [id]:{...formData[id],[field]: e.target.value}, };
    setFormData(updatedFormData);

    // const updatelogindetailsto ={...updatedLoginDetails,[id]:{...updatedLoginDetails[id],field:e.target.value}}
    // setUpdatedLoginDetails(updatelogindetailsto);
    // const updatedLoginDetailsCopy = { ...updatedLoginDetails, [field]: e.target.value };
    // setUpdatedLoginDetails(updatedLoginDetailsCopy);
  };
  

  console.log('formdata',formData)
  // console.log('updated login details',setUpdatedLoginDetails);

 



  console.log('employee data',employees);
  console.log('seletcedEmployeeLoginDetails',seletcedEmployeeLoginDetails)

  const handleDeleteEmployee  = async(employeeID)=>{
    console.log('emp id',employeeID)
    try{
      
      const response = await axios.delete(`http://localhost:5000/Employee/${employeeID}`)
      console.log('emp id',employeeID)
      console.log('Employee deleted successfully');
    }catch(error){
      console.log('error deleteing employee',error)
    }
  }

  const deleteEmployee = async (employeeID) => {
  const result = await handleDeleteEmployee(employeeID);
  if (result.success) {
    // Handle success, show a success message or update UI accordingly
    console.log(result.message);
  } else {
    // Handle error, show an error message or update UI accordingly
    console.error(result.message);
  }
};

  return (
    <div className='Main-Container'>
      <div className="container">
      <h1>Employee List</h1>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'end',marginRight:'50px',marginBottom:'20px'}}>
        {/* <button onClick={handleforms}>Add New Employee</button> */}
        <button onClick={handleforms}>Add New Employee</button>
        {newemp&&(
            <div show={newemp}>
                <div className='overlay' style={{backgroundColor:'rgb(243 232 232 / 0%)'}}>
                    <form className='employeelist-modal-form'>
                        <span className="close" onClick={handlecloseform}>&times;</span>
                        <div>
                          <Signup/>
                        </div>               
                    </form>   
                </div>

            </div>
        )}
      </div>
      <div className="card-container" style={{display:'flex',flexDirection:'row',gap:'50px',flexWrap:'wrap'}}>

        {employees.map((employee) => (
          <div className="card" key={employee.EmployeeID}>
            
            <div className='image' style={{display:'flex',justifyContent:'center',height:'35%'}}>
              <img src={employee.imageSrc ? employee.imageSrc : 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png'} style={{ cursor: 'pointer', borderRadius: '60%', width: '45%'}} alt={employee.name} />
            </div>
            <div className="card-body" style={{ margin: '20px',height:'60%',display:'flex',flexDirection:'column',gap:'10px'}}>
              <p className="card-title" style={{textAlign:'center'}}>{formData.EmployeeName||employee.EmployeeName?employee.EmployeeName:'Employee Name'}</p>
              {/* <div>
                <input value={formData.EmployeeName||employee.EmployeeID} className='employees-input' placeholder="Employee ID" onChange={(e) => handleInputChange(e, employee.EmployeeID, 'EmployeeID')} />
              </div> */}
             
              <div>
                <FontAwesomeIcon icon={faEnvelope} style={{marginRight:'20px'}}/>
                <input value={employee.WorkEmail} className='employees-input' placeholder="Work Email" onChange={(e) => handleInputChange(e, employee.EmployeeID, 'WorkEmail')} />
              </div>
              
              <div>
                <FontAwesomeIcon icon={faPhone} style={{marginRight:'20px'}}/>
                <input value={employee.MobileNumber} className='employees-input' placeholder="Mobile Number" onChange={(e) => handleInputChange(e, employee.EmployeeID, 'MobileNumber')} />
              </div>
              
              <div>
                <FontAwesomeIcon icon={faUser} style={{marginRight:'20px'}}/>
                <input value={employee.DepName} className='employees-input' placeholder="Department Name" onChange={(e) => handleInputChange(e, employee.EmployeeID, 'DepName')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div style={{display:'flex',flexDirection:'row',gap:'15px'}}>
                  <h3 onClick={() => handleform(employee)}><FontAwesomeIcon icon={faPenToSquare} /></h3>
                  <h3 onClick={() => handleDeleteEmployee(employee.EmployeeID)}><FontAwesomeIcon icon={faTrash} /></h3>
                </div>
              
            </div>
              
            </div>
            
          </div>
        ))}



        {employeedataform&& selectedEmployee&&(
          
          <div className='overlay' style={{backgroundColor:'rgb(243 232 232 / 0%)'}}>
              <form className='modal-forms'>
                   <span className="close" onClick={handleformclose}>&times;</span>
                   <FontAwesomeIcon icon={faArrowLeft} onClick={handleback}/>
                       <div><FontAwesomeIcon icon={faGear} onClick={handleopenSetting} />

                       

                         {settingicon&&(

                        
                           <div>
                             {seletcedEmployeeLoginDetails&&(
                               <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
                                  <div>
                                      <label>Email</label><br />
                                      <input className='input' name="email" value={seletcedEmployeeLoginDetails.email} onChange={(e) => handleInputChange(e, seletcedEmployeeLoginDetails.uuid, 'email')} />
                                    </div>
                                    <div>
                                      <label>Password</label><br />
                                      <input className='input' name="confirmPassword" type='password' value={seletcedEmployeeLoginDetails.confirmPassword} onChange={(e) => handleInputChange(e, seletcedEmployeeLoginDetails.uuid, 'confirmPassword')}/>
                                    </div>
                                  <button onClick={updateEmployeedata}>Update</button>
                               </div>
                             )}
                            
                             
                           </div>
                           )}
                        
                       </div>

                       {employeedetailsform&&(
                         <div>
                           <div className='employee-data'>
                             <h2 className='data'onClick={handlepersonaldet}>Personal deatils<FontAwesomeIcon icon={faArrowUp} /></h2>
                             {personaldetails&&(    
                             <div>
                                 <div className='form-data'>
                                   <div>
                                     <label className='Label'>First Name:</label><br/>
                                     <input className='input'style={{width:'auto'}} value={formData.FirstName||selectedEmployee.FirstName} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'FirstName')}/>
                                   </div>
                                   <div>
                                       <label className='Label'>Middle Name:</label><br/>
                                       <input className='input' style={{width:'auto'}} value={selectedEmployee.MiddleName} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'MiddleName')}/>
                                   </div>
                                   <div>
                                       <label className='Label'>Last Name:</label><br/>
                                       <input className='input' style={{width:'auto'}} value={selectedEmployee.Lastname} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'Lastname')} />
                                   </div>
                                   <div>
                                       <label className='Label'>Gender:</label><br/>
                                       <input className='input' style={{width:'auto'}}  value={selectedEmployee.Gender} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'Gender')}/>
                                   </div>
                                   <div>
                                       <label className='Label'>Personal Email:</label><br/>
                                       <input className='input' style={{width:'auto'}} value={selectedEmployee.PersonalEmail} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'PersonalEmail')}/>
                                   </div>
                                   <div>
                                       <label className='Label'>Alternative Mobile Number:</label><br/>
                                       <input className='input' style={{width:'auto'}} value={selectedEmployee.AlternativeMobileNumber} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'AlternativeMobileNumber')}/>
                                   </div>
                                   <div>
                                       <label className='Label'>Date Of Birth:</label><br/>
                                       <input className='input' type='date' style={{width:'auto'}} value={selectedEmployee.DateOfBirth} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'DateOfBirth')}/>
                                   </div>
                                   <div>
                                       <label className='Label'>Father Name:</label><br/>
                                       <input className='input' style={{width:'auto'}} value={selectedEmployee.FatherName} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'FatherName')}/>
                                   </div>
                                   <div>
                                       <label className='Label'>Residential Address:</label><br/>
                                       <textarea className='textarea-employeelist' style={{width:'auto'}} value={selectedEmployee.ResidentialAddress} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'ResidentialAddress')}/>
                                   </div>
                                   
                                 </div>
                             </div>
                             )}
                           </div> 

                           
                           <div className='employee-data'>
                             <h2 className='data' onClick={handleofficedetails}>Office Details</h2>
                             {officedetails&&(
                               <div className='form-data'>
                                   <div>
                                     <label>Date of Joining:</label><br/>
                                     <input className='input' value={selectedEmployee.DateofJoining} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'DateofJoining')}/>
                                   </div>
                                   <div>
                                     <label>Work Email:</label><br/>
                                     <input className='input' value={selectedEmployee.WorkEmail} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'WorkEmail')}/>
                                   </div>
                                   <div>
                                     <label>Releaving Date:</label><br/>
                                     <input className='input' value={selectedEmployee.ReleavingDate} onChange={(e) => handleInputChange(e, selectedEmployee.ReleavingDate, 'ReleavingDate')}/>
                                   </div>
                                   <div>
                                     <label>TeamLead:</label><br/>
                                     <input className='input' value={selectedEmployee.TeamLead} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'TeamLead')}/>
                                   </div>
                                   <div>
                                     <label>Department Head:</label><br/>
                                     <input className='input' value={selectedEmployee.DepHaed} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'DepHaed')}/>
                                   </div>
                                   <div>
                                     <label>Department:</label><br/>
                                     <input className='input' value={selectedEmployee.DepName} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'DepName')}/>
                                   </div>
                                   <div>
                                     <label>Manager:</label><br/>
                                     <input className='input' value={selectedEmployee.Manager} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'Manager')}/>
                                   </div>
                                   <div>
                                     <label>Office Manager:</label><br/>
                                     <input className='input' value={selectedEmployee.OfficeManager} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'OfficeManager')}/>
                                   </div>
                               </div>
                             )}

                           </div>
                           <div className='employee-data'>
                             <h2 className='data' onClick={handleGovtproofs}>Governament Proofs</h2>
                             {Govtproofs&&(
                                 <div className='form-data'>
                                   <div>
                                       <label>PAN number:</label><br/>
                                       <input className='input' value={selectedEmployee.PANnumber} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'PANnumber')}/>
                                   </div>
                                   <div>
                                     <label>Aadhar Number:</label><br/>
                                     <input className='input' value={selectedEmployee.Aadharnumber} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'Aadharnumber')}/>
                                   </div>

                                 </div>

                             )}
                           </div>
                           <div className='employee-data'>
                             <h2 className='data' onClick={handlebankdet}>Bank Details</h2>
                             {bankdet&&(
                               <div className='form-data'>
                                   <div>
                                     <label>A/C Type:</label><br/>
                                     <input className='input' value={selectedEmployee.ACType} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'ACType')}/>
                                   </div>
                                   <div>
                                     <label>A/C Number:</label><br/>
                                     <input className='input' value={selectedEmployee.ACNUmber} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'ACNUmber')}/>
                                   </div>
                                   <div>
                                     <label>Branch:</label><br/>
                                     <input className='input' value={selectedEmployee.Branch} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'Branch')}/>
                                   </div>
                                   <div>
                                     <label>UAN Number:</label><br/>
                                     <input className='input' value={selectedEmployee.UANnumber} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'UANnumber')}/>
                                   </div>
                                   <div>
                                     <label>Salary CTC:</label><br/>
                                     <input className='input' value={selectedEmployee.SalaryCTC} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'SalaryCTC')}/>
                                   </div>
                                   <div>
                                     <label>IFSCCode:</label><br/>
                                     <input className='input' value={selectedEmployee.IFSCCode} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'IFSCCode')}/>
                                   </div>
                               </div>

                             )}
                           </div>
                           
                           <div className='employee-data'>
                             <h2 className='data' onClick={handleclientdet}>Client Details</h2>
                             {clientdet&&(
                               <div className='form-data'>
                                   <div>
                                     <label>Company Name:</label><br/>
                                     <input className='input' value={selectedEmployee.CompanyName} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'CompanyName')}/>
                                   </div>
                                   <div>
                                     <label>Managers:</label><br/>
                                     <input className='input' value={selectedEmployee.Managers} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'Managers')}/>
                                   </div>
                                   <div>
                                     <label>Details:</label><br/>
                                     <input className='input' value={selectedEmployee.Details} onChange={(e) => handleInputChange(e, selectedEmployee.EmployeeID, 'Details')}/>
                                   </div>
                               </div>
                             )}
                           </div> 
                      
                      <button>Update</button>
                       </div>
                      )}   
              </form>  
          </div>
        )}


   
      </div>
    </div>
    </div>
    
  );
};

export default EmployeeList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EmployeeLIst.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUp,faEnvelope,faPhone,faUser,faGear,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import Signup from '../Registration/Signup';

// const EmployeeList = () => {

//   //state for employee details
//   const [employees, setEmployees] = useState([]);

//   //state for employee registration details
//   const[employeelogindetails,setEmployeeLoginDetails]= useState([]);

//   //state for selected empolyee registration details
//   const[seletcedEmployeeLoginDetails,setSelectedEMployeeLOginDetails]=useState();

//   //state to track selected employee 
//   const [selectedEmployee, setSelectedEmployee] = useState(null);


//   //state to visibilty of form
//   const[employeedataform,setEmployeedataForm]=useState(null);
//   const[employeedetailsform,setEMployeeDetailsform]=useState(null)

//   //states to visibilty of sections in form
//   const[personaldetails,setPersonaldetails]= useState(true);
//   const[officedetails,setOfficeDetails]=useState(false);
//   const[Govtproofs,setGovtProofs]=useState(false);
//   const [bankdet,setBankDet]=useState(false);
//   const[clientdet,setClientDet]=useState(false);
//   const[newemp,setNewEmp] =useState(false);
//   const[settingicon,SetSettingIcon]=useState(false);
 
//   useEffect(() => {
//     fetchEmployeedata();
//     fetchemployeelogindetails();
//     getSelectdEmployeeLoginDetails();
//   }, []);

//   const fetchEmployeedata = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/Employee');
//       setEmployees(response.data); 
//       const employeedata = response.data[0];
//       console.log('response',employeedata)
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };


// const fetchemployeelogindetails=async()=>{

//     try {
//           const response = await axios.get('http://localhost:5000/submitForm');
//           setEmployeeLoginDetails(response.data); 
//           const employeedata = response.data[0];
//           console.log('response',employeedata)
//     } catch (error) {
//         console.error('Error fetching employees:', error);
//     }
// }

// const getSelectdEmployeeLoginDetails=()=>{
//     if(selectedEmployee){
//      const data =  employeelogindetails.find(user => user.EmployeeID === selectedEmployee.uuid);
//      return setSelectedEMployeeLOginDetails(data);
//     }
//     return null;
// }

//   const handleopenSetting=()=>{
    
//     setEMployeeDetailsform(false);
//     SetSettingIcon(true);
//   }

//   const handleback=()=>{
//     setEMployeeDetailsform(true);
//     SetSettingIcon(false);
//   }

//   const handleform=(employees)=>{
//     setEmployeedataForm(true);
//     setEMployeeDetailsform(!employeedataform)
//     setSelectedEmployee(employees)
//     setPersonaldetails(true);
//     setOfficeDetails(false);
//     setGovtProofs(false);
//     setBankDet(false);
//     setClientDet(false);
//   }
//   const handleformclose=()=>{
//     setEmployeedataForm(null);
//   }
//   const handlepersonaldet =()=>{
//     setPersonaldetails(!personaldetails);
//   }
//   const handleofficedetails=()=>{
//     setOfficeDetails(!officedetails)
//   }

//   const handleGovtproofs=()=>{
//     setGovtProofs(!Govtproofs)
//   }

//   const handlebankdet=()=>{
//     setBankDet(!bankdet);
//   }
//   const handleclientdet=()=>{
//     setClientDet(!clientdet);
//   }
//   const handleforms=()=>{
//     setNewEmp(true);
//   }
//   const handlecloseform=()=>{
//     setNewEmp(false);
//   }




//   console.log('employee data',employees);
//   return (
//     <div className='Main-Container'>
//       <div className="container">
//       <h1>Employee List</h1>
//       <div style={{display:'flex',flexDirection:'row',justifyContent:'end',marginRight:'50px',marginBottom:'20px'}}>
//         {/* <button onClick={handleforms}>Add New Employee</button> */}
//         <button onClick={handleforms}>Add New Employee</button>
//         {newemp&&(
//             <div show={newemp}>
//                 <div className='overlay' style={{backgroundColor:'rgb(243 232 232 / 0%)'}}>
//                     <form className='employeelist-modal-form'>
//                         <span className="close" onClick={handlecloseform}>&times;</span>
//                         <div>
//                           <Signup/>
//                         </div>               
//                     </form>   
//                 </div>

//             </div>
//         )}
//       </div>
//       <div className="card-container" style={{display:'flex',flexDirection:'row',gap:'50px',flexWrap:'wrap'}}>
//         {employeelogindetails.map((employeedata,index) =>{
//           const employee = employees.find(user=>user.EmployeeID===employeedata.EmployeeID)
        
//          return (
//           <div className="card" >
//             <div className='image' style={{display:'flex',justifyContent:'center'}}>
//               <img src={employee.imageSrc?employee.imageSrc:'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png'}  style={{ cursor: 'pointer',borderRadius:'60%',width:'45%',height:'50%' ,}} alt={employee.name} />
//             </div>
           
//             <div className="card-body" style={{margin:'20px'}}>

//               <p className="card-title" style={{textAlign:'center'}}>{employee.EmployeeName?employee.EmployeeName:'Employee Name'}</p>
//               <p>{employee.EmployeeID}</p>
//               <p> <FontAwesomeIcon icon={faEnvelope} style={{marginRight:'20px'}}/>{employee.WorkEmail?employee.WorkEmail:'Email'}</p>
//               <p> <FontAwesomeIcon icon={faPhone} style={{marginRight:'20px'}}/>{employee.MobileNumber?employee.MobileNumber:'Mobile Number'}</p>
              
//               <p className="card-text"><FontAwesomeIcon icon={faUser} style={{marginRight:'20px'}}/>{employee.DepName?employee.DepName:'Department'}</p>
//             </div>
//             <div style={{display:'flex',flexDirection:'row',justifyContent:'center',borderTop:'3px solid rgba(233, 224, 224, 0.76)'}}>
              
//                   <h2 onClick={() => handleform(employee)}>View More Details</h2>
//             </div>
             
//           </div>
//           );
//         })}
           
      

//         {employeedataform&& selectedEmployee&&(
          
//           <div className='overlay' style={{backgroundColor:'rgb(243 232 232 / 0%)'}}>
//               <form className='modal-forms'>
//                    <span className="close" onClick={handleformclose}>&times;</span>
//                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleback}/>
//                        <div><FontAwesomeIcon icon={faGear} onClick={handleopenSetting} />

//                          {settingicon&&(
//                            <div>
//                              {seletcedEmployeeLoginDetails&&(
//                                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
//                                  <div>
//                                     <label>Email</label><br/>
//                                     <input className='input' value={seletcedEmployeeLoginDetails.email}/>
//                                   </div>
//                                   <div>
//                                       <label>Password</label><br/>
//                                       <input className='input' type='password' value={seletcedEmployeeLoginDetails.confirmPassword}/>
//                                   </div>
//                                   <button>Update</button>
//                                </div>
//                              )}
                             
//                            </div>
//                          )}
//                        </div>

//                        {employeedetailsform&&(
//                          <div>
//                            <div className='employee-data'>
//                              <h2 className='data'onClick={handlepersonaldet}>Personal deatils<FontAwesomeIcon icon={faArrowUp} /></h2>
//                              {personaldetails&&(    
//                              <div>
//                                  <div className='form-data'>
//                                    <div>
//                                      <label className='Label'>First Name:</label><br/>
//                                      <input className='input'style={{width:'auto'}} value={selectedEmployee.FirstName}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Middle Name:</label><br/>
//                                        <input className='input' style={{width:'auto'}} value={selectedEmployee.MiddleName}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Last Name:</label><br/>
//                                        <input className='input' style={{width:'auto'}} value={selectedEmployee.Lastname}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Gender:</label><br/>
//                                        <input className='input' style={{width:'auto'}} value={selectedEmployee.Gender}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Personal Email:</label><br/>
//                                        <input className='input' style={{width:'auto'}} value={selectedEmployee.PersonalEmail}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Alternative Mobile Number:</label><br/>
//                                        <input className='input' style={{width:'auto'}} value={selectedEmployee.AlternativeMobileNumber}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Date Of Birth:</label><br/>
//                                        <input className='input' style={{width:'auto'}} value={selectedEmployee.DateOfBirth}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Father Name:</label><br/>
//                                        <input className='input' style={{width:'auto'}} value={selectedEmployee.FatherName}/>
//                                    </div>
//                                    <div>
//                                        <label className='Label'>Residential Address:</label><br/>
//                                        <textarea style={{width:'auto'}} value={selectedEmployee.ResidentialAddress}/>
//                                    </div>
                                   
//                                  </div>
//                              </div>
//                              )}
//                            </div> 

                           
//                            <div className='employee-data'>
//                              <h2 className='data' onClick={handleofficedetails}>Office Details</h2>
//                              {officedetails&&(
//                                <div className='form-data'>
//                                    <div>
//                                      <label>Date of Joining:</label><br/>
//                                      <input className='input' value={selectedEmployee.DateofJoining}/>
//                                    </div>
//                                    <div>
//                                      <label>Work Email:</label><br/>
//                                      <input className='input' value={selectedEmployee.WorkEmail}/>
//                                    </div>
//                                    <div>
//                                      <label>Releaving Date:</label><br/>
//                                      <input className='input' value={selectedEmployee.ReleavingDate}/>
//                                    </div>
//                                    <div>
//                                      <label>TeamLead:</label><br/>
//                                      <input className='input' value={selectedEmployee.TeamLead}/>
//                                    </div>
//                                    <div>
//                                      <label>Department Head:</label><br/>
//                                      <input className='input' value={selectedEmployee.DepHaed}/>
//                                    </div>
//                                    <div>
//                                      <label>Department:</label><br/>
//                                      <input className='input' value={selectedEmployee.DepName}/>
//                                    </div>
//                                    <div>
//                                      <label>Manager:</label><br/>
//                                      <input className='input' value={selectedEmployee.Manager}/>
//                                    </div>
//                                    <div>
//                                      <label>Office Manager:</label><br/>
//                                      <input className='input' value={selectedEmployee.OfficeManager}/>
//                                    </div>
//                                </div>
//                              )}

//                            </div>
//                            <div className='employee-data'>
//                              <h2 className='data' onClick={handleGovtproofs}>Governament Proofs</h2>
//                              {Govtproofs&&(
//                                  <div className='form-data'>
//                                    <div>
//                                        <label>PAN number:</label><br/>
//                                        <input className='input' value={selectedEmployee.PANnumber}/>
//                                    </div>
//                                    <div>
//                                      <label>Aadhar Number:</label><br/>
//                                      <input className='input' value={selectedEmployee.Aadharnumber}/>
//                                    </div>

//                                  </div>

//                              )}
//                            </div>
//                            <div className='employee-data'>
//                              <h2 className='data' onClick={handlebankdet}>Bank Details</h2>
//                              {bankdet&&(
//                                <div className='form-data'>
//                                    <div>
//                                      <label>A/C Type:</label><br/>
//                                      <input className='input' value={selectedEmployee.ACType}/>
//                                    </div>
//                                    <div>
//                                      <label>A/C Number:</label><br/>
//                                      <input className='input' value={selectedEmployee.ACNUmber}/>
//                                    </div>
//                                    <div>
//                                      <label>Branch:</label><br/>
//                                      <input className='input' value={selectedEmployee.Branch}/>
//                                    </div>
//                                    <div>
//                                      <label>UAN Number:</label><br/>
//                                      <input className='input' value={selectedEmployee.UANnumber}/>
//                                    </div>
//                                    <div>
//                                      <label>Salary CTC:</label><br/>
//                                      <input className='input' value={selectedEmployee.SalaryCTC}/>
//                                    </div>
//                                    <div>
//                                      <label>IFSCCode:</label><br/>
//                                      <input className='input' value={selectedEmployee.IFSCCode}/>
//                                    </div>
//                                </div>

//                              )}
//                            </div>
                           
//                            <div className='employee-data'>
//                              <h2 className='data' onClick={handleclientdet}>Client Details</h2>
//                              {clientdet&&(
//                                <div className='form-data'>
//                                    <div>
//                                      <label>Company Name:</label><br/>
//                                      <input className='input' value={selectedEmployee.CompanyName}/>
//                                    </div>
//                                    <div>
//                                      <label>Managers:</label><br/>
//                                      <input className='input' value={selectedEmployee.Managers}/>
//                                    </div>
//                                    <div>
//                                      <label>Details:</label><br/>
//                                      <input className='input' value={selectedEmployee.Details}/>
//                                    </div>
//                                </div>
//                              )}
//                            </div> 
                      
//                       <button>Update</button>
//                        </div>
//                       )}   
//               </form>  
//           </div>
//         )}


   
//       </div>
//     </div>
//     </div>
    
//   );
// };

// export default EmployeeList;
