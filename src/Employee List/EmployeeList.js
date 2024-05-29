import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeLIst.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faEnvelope,faPhone,faUser,faGear,faArrowLeft ,faPenToSquare,} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Signup from '../Registration/Signup';

const api =axios.create({baseURL:'https://user-account-backend.onrender.com',});
// const api =axios.create({baseURL:'http://localhost:5000',})
const EmployeeList = () => {

  //state for employee details
  const [employees, setEmployees] = useState([]);
  // console.log('employees',employees)

  //state for employee registration details
  const[employeelogindetails,setEmployeeLoginDetails]= useState([]);
  // console.log('employeelogindetails',employeelogindetails)

  //state for selected empolyee registration details
  const[seletcedEmployeeLoginDetails,setSelectedEMployeeLOginDetails]=useState();
  // console.log('seletcedEmployeeLoginDetails',seletcedEmployeeLoginDetails)

  //state to track selected employee 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // console.log('selectedEmployee',selectedEmployee)


  const [formData, setFormData] = useState({});
  console.log('formData',formData)


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
  const [message, setMessage] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  useEffect(() => {
    fetchEmployeedata();
    fetchemployeelogindetails();  
  }, []);


  useEffect(()=>{
    getSelectedEmployeeLoginDetails();
  },[employeedataform])

  // useEffect(() => {
  //   if (selectedEmployee) {
  //     getSelectedEmployeeLoginDetails(selectedEmployee);
  //   }
  // }, [selectedEmployee]);

  const fetchEmployeedata = async () => {
    try {
      const response = await api.get('/Employee');
      setEmployees(response.data); 
      const employeedata = response.data[0];
      // console.log('response',employeedata)
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };



const concatName = (employee) => {
  let fullName = '';
  if (employee.FirstName) {
    fullName += employee.FirstName;
  }
  if (employee.MiddleName) {
    fullName += ' ' + employee.MiddleName;
  }
  if (employee.Lastname) {
    fullName += ' ' + employee.Lastname;
  }
  return fullName;
};


const fetchemployeelogindetails=async()=>{

    try {
          const response = await api.get('/submitForm');
          setEmployeeLoginDetails(response.data); 
          const employeedata = response.data;
          // console.log('response',employeedata)
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}
// console.log('uuid', formData.EmployeeID, 'email',formData.email, formData.password,'password', 'phoneno',formData.phoneNumber )

const updateEmployeedata = async (e) => {
  e.preventDefault();
  try {
    const response = await api.put('/submitForm', { formData });
    console.log('response', response);
    window.alert('Employee data updated successfully!');
  } catch (error) {
    console.log('Error updating login details', error);
    window.alert('Failed to update employee data');
  }
};

const updateEmployeeDetails= async()=>{
  try{

  }catch(error){
    console.log('error updating employee details')
  }
}
// console.log('selected',employees.EmployeeID)


const getSelectedEmployeeLoginDetails = () => {
  if (selectedEmployee) {
      const data = employeelogindetails.find(user => user.uuid === selectedEmployee.EmployeeID);
      if (data) {
          // console.log('dataaaa', data.uuid);
          setSelectedEMployeeLOginDetails(data);
          return data;
      } else {
          console.log("No employee login details found for the selected employee.");
          return null;
      }
  }
  return null;
}



  const handleopenSetting=()=>{
    
    setEMployeeDetailsform(false);
    SetSettingIcon(true);
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
    SetSettingIcon(false);
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

  const handleInputChange = (e, id, field) => {
    const { value } = e.target;
  
    const updatedEmployees = employees.map(employee => {
      if (employee.EmployeeID === id) {
        return {
          ...employee,
          [field]: value
        };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  
    const updatedSelectedEmployee = updatedEmployees.find(employee => employee.EmployeeID === id);
    setSelectedEmployee(updatedSelectedEmployee);
  
    // const updatedEmployeeLoginDetails = employeelogindetails.map(employee => {
    //   if (employee.uuid === id) {
    //     return {
    //       ...employee,
    //       [field]: value
    //     };
    //   }
    //   return employee;
    // });
    // setSelectedEMployeeLOginDetails(updatedEmployeeLoginDetails);
    
    if (seletcedEmployeeLoginDetails && seletcedEmployeeLoginDetails.uuid === id) {
      setSelectedEMployeeLOginDetails({
        ...seletcedEmployeeLoginDetails,
        [field]: value,
      });
    }
  
    const updatedFormData = {
      ...formData,
      [id]: {
        ...formData[id],
        [field]: value,
        EmployeeID: id
      }
    };
    setFormData(updatedFormData);
  };
  
  

  const updateBackendData = async () => {
    try {
      const response = await api.put('/updateEmployeesData', {formData}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Successfully updated:', response.data);
      window.alert('Employee data updated successfully!');
      setFormData({});
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const handleDeleteEmployee  = async(employeeID)=>{
    // console.log('emp id',employeeID)
    try{
      
      const response = await api.delete(`/Employee/${employeeID}`)
      // console.log('emp id',employeeID)
      if (response.status === 200) {
      setMessage(`${response.data.deletedEmployee.EmployeeName} is deleted  Reload the page to reflect changes` )
      }
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
      <h1>Employees</h1>
      {message && <div>{message}</div>}
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
              <p className="card-title" style={{textAlign:'center'}} readOnly>{concatName(employee)}</p>
             
              <div>
                <FontAwesomeIcon icon={faEnvelope} style={{marginRight:'20px'}}/>
                <input value={employee.WorkEmail} className='employees-input' placeholder="Work Email" onChange={(e) => handleInputChange(e, employee.EmployeeID, 'WorkEmail')}  readOnly/>
              </div>
              
              <div>
                <FontAwesomeIcon icon={faPhone} style={{marginRight:'20px'}}/>
                <input value={employee.MobileNumber} className='employees-input' placeholder="Mobile Number" onChange={(e) => handleInputChange(e, employee.EmployeeID, 'MobileNumber')}readOnly />
              </div>
              
              <div>
                <FontAwesomeIcon icon={faUser} style={{marginRight:'20px'}}/>
                <input value={employee.DepName} className='employees-input' placeholder="Department Name" onChange={(e) => handleInputChange(e, employee.EmployeeID, 'DepName')} readOnly/>
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
                   <div className='back'><FontAwesomeIcon icon={faArrowLeft} onClick={handleback}/></div>
                       <div >
                        <div className='settings'>
                          <FontAwesomeIcon icon={faGear} onClick={handleopenSetting} />
                        </div>

                       

                         {settingicon&&(

                        
                           <div>
                             {seletcedEmployeeLoginDetails&&(
                               <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
                               {notification.visible && (
                    <div className={`notification ${notification.type}`}>
                      {notification.message}
                    </div>
                  )}
                                  <div>
                                      <label>Email</label><br />
                                      <input className='input' name="email" value={seletcedEmployeeLoginDetails.email || ''} onChange={(e) => handleInputChange(e, seletcedEmployeeLoginDetails.uuid, 'email')} />
                                    </div>
                                    <div>
                                      <label>Password</label><br />
                                      <input className='input' name="password" type='password' value={seletcedEmployeeLoginDetails.confirmPassword|| ''} onChange={(e) => handleInputChange( e,seletcedEmployeeLoginDetails.uuid, 'password')}/>
                                    </div>
                                    <div>
                                      <label>Phone Number</label><br/>
                                      <input className='input' name='phonenumber' type='number' value={seletcedEmployeeLoginDetails.phoneNumber || ''} onChange={(e) => handleInputChange(e, seletcedEmployeeLoginDetails.uuid, 'phoneNumber')}/>
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
                      
                      <button onClick={updateBackendData}>Update</button>
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


