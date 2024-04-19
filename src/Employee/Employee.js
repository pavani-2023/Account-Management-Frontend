import React from 'react'

import { useState,useEffect,useRef } from 'react';
import './Employee.css'
import {useParams} from 'react-router-dom';

import axios from 'axios';



export default function Employee() {
    
    const[file,setFile] = useState('')
    const { uuid } = useParams();
    
   
   
    const [employeeData,setEmployeeData]=useState({
        EmployeeName:'',
        FirstName:'',
        MiddleName:'',
        Lastname:'',
        EmployeeID:uuid,
        Gender:'',
        PersonalEmail:'',
        MobileNumber:'',
        AlternativeMobileNumber:'',
        DateOfBirth:'',
        FatherName:'',
        ResidentialAddress:'',
        Name:'',
        PhoneNumber:'',
        Relationship:'',
        DateofJoining:'',
        WorkEmail:'',
        ReleavingDate:'',
        TeamLead:'',
        DepHaed:'',
        Manager:'',
        OfficeManager:'',
        PANnumber:'',
        Aadharnumber:'',
        DepID:'',
        DepName:'',
        DepLocation:'',
        Designation:'',
        ACType:'',
        ACNUmber:'',
        IFSCCode:'',
        Branch:'', 
        UANnumber:'',
        SalaryCTC:'',
        CompanyName:'',
        Managers:'',
        Details:'',
        imageSrc:'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png',
 
      })

      const fileInputRef = useRef(null);
   
    
 
    const updateEmployeeName = () => {
        const { FirstName, MiddleName, Lastname } = employeeData;
        
        const firstNamePart = FirstName ? FirstName : '';
        const middleNamePart = MiddleName ? MiddleName : '';
        const lastNamePart = Lastname ? Lastname : '';
      
        const fullName = `${firstNamePart} ${middleNamePart} ${lastNamePart}`.trim(); 
        setEmployeeData(prevData => ({ ...prevData, EmployeeName: fullName }));
    };
    
      useEffect(()=>{
        getEmployeeDetails();
    }, []);
    

      const handleChange = (e, field) => {
        setEmployeeData({
          ...employeeData,
          [field]: e.target.value,
        }); 
        updateEmployeeName();
      };

      const handleSubmit = async (e) =>{
       e.preventDefault();
        try{
          const response =await fetch('http://localhost:5000/Employee', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData)
        });
        
        const result = await response.json();
        console.log(result);
        }catch(error) {
          console.error('Error Submitting Employee Details',error)
        }
      };

  
    const getEmployeeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/employee/${employeeData.EmployeeID}`)
      setEmployeeData(response.data)
    //   console.log('Fetched employee details', response.data);
    } catch (error) {
      console.log('Error fetching employee details', error);
    }
  }


 
      const [activeDiv, setActiveDiv] = useState(1);

        const displayDiv = (divNumber) => {
            setActiveDiv(divNumber);
        };
     

    // const handleFilechange = (e)=>{
    //     setFile(e.target.file);
    // }

    
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {

      setEmployeeData(prevData => ({ ...prevData,imageSrc:reader.result}));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

    

  return (
    <div className='Main-Container'>
       

        <div className='container'>
        {/* <h1 className='heading'>Employee Info</h1> */}

        {/* <div className="image"style={{display:'flex',flexDirection:'row',gap:'5%',marginBottom:'100px' ,width:'100%',height:'300px'}}>
            <div className='profile-pic' style={{width:'25%',backgroundColor:'#fff',}}>
                <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center',height:'100%' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <img
                        alt="User Pic"
                        src={employeeData.imageSrc}
                        id="profile-image1"
                        height="200"
                        style={{ cursor: 'pointer',borderRadius:'50%',width:'50%' ,}}
                        onClick={handleClick}
                    />
                </div>
            </div>
            <div style={{width:'65%',height:'300px',backgroundColor:'#fff'}}>
                <div style={{margin:'50px'}}>
                    <div className='input-cont'>
                        <label style={{marginRight:'20px'}}>Employee ID:</label>
                        <input style={{border:'none'}}type="text"  value={employeeData.EmployeeID} onChange={() => {}} readOnly />
                    </div>

                    <div className='input-cont'>
                        <label>Employee Name:</label>
                        <input type="text" style={{border:'none'}} id="employee-name" readOnly value={employeeData.EmployeeName} onChange={(e) => handleChange(e, 'EmployeeName')}/>
                    </div>

                    <div className='input-cont'>
                            <label>Department:</label>
                            <input type="text" readOnly value={employeeData.DepName} style={{border:'none'}} onChange={(e) => handleChange(e, 'DepName')}/>
                    </div>

                    <div className='input-cont'>
                            <label>Designation: </label>
                            <input type="text" readOnly  value={employeeData.Designation} style={{border:'none'}} onChange={(e) => handleChange(e, 'Designation')}/>
                    </div>


                </div>

               

            </div>
        </div> */}
        
        <div className='Employee-container'>
   
            <div className='sub-container'>
                <div onClick={() => displayDiv(1)} className={`word ${activeDiv === 1 ? 'active' : ''}`}>Personal details</div>
                <div onClick={() => displayDiv(2)} className={`word ${activeDiv === 2 ? 'active' : ''}`}>Office Details</div>
                <div onClick={() => displayDiv(3)} className={`word ${activeDiv === 3 ? 'active' : ''}`}>Government proofs</div>
                
                <div onClick={() => displayDiv(4)} className={`word ${activeDiv === 4 ? 'active' : ''}`}>Bank Deatils</div>
                {/* <div onClick={() => displayDiv(5)} className={`word ${activeDiv === 5 ? 'active' : ''}`}>Designation </div> */}
                
                {/* <div onClick={() => displayDiv(6)}className={`word ${activeDiv === 6 ? 'active' : ''}`}>Department </div> */}
                <div onClick={() => displayDiv(7)} className={`word ${activeDiv === 7 ? 'active' : ''}`}>Client Details</div>

            </div>
            

            <div className='Employee-personal-details'>
                {activeDiv===1  && < div className={`container ${activeDiv === 1 ? 'active' : ''}`}>
                   <div style={{display:'flex', width:'100%'}} >

                
                        <div className="image"style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'30%'}}>
                        <div className='profile-pic' style={{width:'75%',backgroundColor:'#fff',}}>
                            <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center',height:'100%' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                />
                                <img
                                    alt="User Pic"
                                    src={employeeData.imageSrc}
                                    id="profile-image1"
                                    height="150"
                                    style={{ cursor: 'pointer',borderRadius:'50%',width:'50%' ,}}
                                    onClick={handleClick}
                                />
                            </div>
                        </div>
                        <div style={{width:'65%',height:'300px',backgroundColor:'#fff'}}>
                            <div style={{margin:'50px',display:'flex',flexDirection:'column',gap:'10px'}}>
                                <div className='input-conta'>
                                    <label style={{marginRight:'20px'}}>Employee ID:</label>
                                    <input style={{border:'none'}}type="text"  value={employeeData.EmployeeID}  readOnly />
                                </div>

                                <div className='input-conta'>
                                    <label>Employee Name:</label>
                                    <input type="text" style={{border:'none'}} id="employee-name" readOnly value={employeeData.EmployeeName} onChange={(e) => handleChange(e, 'EmployeeName')}/>
                                </div>

                                <div className='input-conta'>
                                        <label>Department:</label>
                                        <input type="text" readOnly value={employeeData.DepName} style={{border:'none'}} onChange={(e) => handleChange(e, 'DepName')}/>
                                </div>

                                <div className='input-conta'>
                                        <label>Designation: </label>
                                        <input type="text" readOnly  value={employeeData.Designation} style={{border:'none'}} onChange={(e) => handleChange(e, 'Designation')}/>
                                </div>


                            </div>

                        

                        </div>
                        </div>
                        <div>
                            <div className='personal-info employee'>
                                    <div className='input-cont'>
                                        <label>First Name</label><br/>
                                        <input type="text"value={employeeData.FirstName} onChange={(e) => handleChange(e, 'FirstName')}/>
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Middle Name</label><br/>
                                        <input type="text"value={employeeData.MiddleName} onChange={(e) => handleChange(e, 'MiddleName')}/>
                                    </div>
                
                
                                    <div className='input-cont'>
                                        <label>Last Name</label><br/>
                                        <input type="text" value={employeeData.Lastname}onChange={(e) => handleChange(e, 'Lastname')} />
                                    </div>
                
                                    

                                    <div className='input-cont'>
                                        <label>Gender</label><br/>
                                        <select className='gender ' style={{width:'400px'}} value={employeeData.Gender || ""}onChange={(e) => handleChange(e, 'Gender')} >
                                            <option value="">Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Personal Email</label><br/>
                                        <input type="email" value={employeeData.PersonalEmail} onChange={(e) => handleChange(e, 'PersonalEmail')}/>
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Mobile Number</label><br/>
                                        <input type="number" value={employeeData.MobileNumber} onChange={(e) => handleChange(e, 'MobileNumber')}/>
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Alternative Mobile Number</label><br/>
                                        <input type="number" value={employeeData.AlternativeMobileNumber} onChange={(e) => handleChange(e, 'AlternativeMobileNumber')} />
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Date Of Birth</label><br/>
                                        <input type="date" value={employeeData.DateOfBirth} onChange={(e) => handleChange(e, 'DateOfBirth')} />
                                    </div>
                
                                    <div className='input-cont'>

                                        <label> Father Name</label><br/>
                                        <input type="text" value={employeeData.FatherName} onChange={(e) => handleChange(e, 'FatherName')} />
                                        
                                    </div>
                
                                    <div className='input-cont'>

                                        <label>Residential Address</label><br/>
                                        <input type="text" value={employeeData.ResidentialAddress} onChange={(e) => handleChange(e, 'ResidentialAddress')}/>

                                    </div>
                
                
                            </div>
                            <h3 className='h3'>Emergancey Contact Information</h3>
                            <div>
                                
                            </div>
                            <div className='emergancey-info employee'>

                                    <div className='input-cont'>
                                        <label>Name</label><br/>
                                        <input type="text" value={employeeData.Name}onChange={(e) => handleChange(e, 'Name')}/>
                                    </div>

                                    <div className='input-cont'>
                                        <label>Phone Number</label><br/>
                                        <input type="text" value={employeeData.PhoneNumber} onChange={(e) => handleChange(e, 'PhoneNumber')}/>
                                    </div>

                                    <div className='input-cont'>
                                        <label>Relationship</label><br/>
                                        <input type="text" value={employeeData.Relationship} onChange={(e) => handleChange(e, 'Relationship')} />
                                    </div>
                            </div>

                        </div>
                   </div>
                </div>}
                
                {activeDiv===2 && <div className={`container ${activeDiv === 2 ? 'active' : ''}`}>
                    <div className='employee'>
                        <div className='input-cont'>
                            <label>Date Of Joining</label><br/>
                            <input type="date" value={employeeData.DateofJoining} onChange={(e) => handleChange(e, 'DateofJoining')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Work Email</label><br/>
                            <input type="email" value={employeeData.WorkEmail} onChange={(e) => handleChange(e, 'WorkEmail')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Releaving Date</label><br/>
                            <input type="date" value={employeeData.ReleavingDate} onChange={(e) => handleChange(e, 'ReleavingDate')}/>
                        </div>

                        <div className='input-cont'>
                            <label>Team Lead</label><br/>
                            <input type="text" value={employeeData.TeamLead} onChange={(e) => handleChange(e, 'TeamLead')} />
                        </div>
                        <div className='input-cont'>
                            <label>Department Head</label><br/>
                            <input type="text" value={employeeData.DepHaed} onChange={(e) => handleChange(e, 'DepHaed')} />
                        </div>
                        <div className='input-cont'>
                            <label>Department</label><br/>
                            <input type="text" value={employeeData.DepName} onChange={(e) => handleChange(e, 'DepName')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Designation </label><br/>
                            <input type="text" value={employeeData.Designation} onChange={(e) => handleChange(e, 'Designation')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Manager</label><br/>
                            <input type="text" value={employeeData.Manager} onChange={(e) => handleChange(e, 'Manager')} />
                        </div>
                        <div className='input-cont'>
                            <label>Office Manager</label><br/>
                            <input type="text" value={employeeData.OfficeManager} onChange={(e) => handleChange(e, 'OfficeManager')} />
                        </div>

                    </div>
                    
                </div>}  
                {activeDiv===3&&<div className={`container ${activeDiv === 3 ? 'active' : ''}`}>
                    <div className='employee'>
                        <div className='input-cont'>
                            <label>PAN Number</label><br/>
                            <input type="text"value={employeeData.PANnumber} onChange={(e) => handleChange(e, 'PANnumber')}/>
                        </div>

                        <div className='input-cont'>
                            <label>Aadhar Number</label><br/>
                            <input type="number" value={employeeData.Aadharnumber} onChange={(e) => handleChange(e, 'Aadharnumber')}/>
                        </div>
                    </div>
                    
                    
                </div>}
                {activeDiv===4&&<div className={`container ${activeDiv === 4 ? 'active' : ''}`}>
                    <div className='employee'>
                        <div className='input-cont'>
                            <label>A/C Type</label><br/>
                            <input type="text" value={employeeData.ACType} onChange={(e) => handleChange(e, 'ACType')}/>
                        </div>
                        <div className='input-cont'>
                            <label>A/C Number</label><br/>
                            <input type="text" value={employeeData.ACNUmber} onChange={(e) => handleChange(e, 'ACNUmber')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Branch</label><br/>
                            <input type="text" value={employeeData.Branch} onChange={(e) => handleChange(e, 'Branch')}/>
                        </div>
                        <div className='input-cont'>
                            <label>UAN Number</label><br/>
                            <input type="text" value={employeeData.UANnumber} onChange={(e) => handleChange(e, 'UANnumber')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Salary CTC</label><br/>
                            <input type="text" value={employeeData.SalaryCTC}onChange={(e) => handleChange(e, 'SalaryCTC')}/>
                        </div>
                        <div className='input-cont'>
                            <label>IFSC Code</label><br/>
                            <input type="text" value={employeeData.IFSCCode}onChange={(e) => handleChange(e, 'IFSCCode')}/>
                        </div>
                    </div>
                    
          
                </div>}
                {/* {activeDiv===5&&<div className={`container ${activeDiv === 5 ? 'active' : ''}`}>
                    <div className='input-cont'>
                            <label>Designation Code</label>
                            <input type="text" />
                    </div>
                    
                </div>} */}
                {/* {activeDiv===6&&<div className={`container ${activeDiv === 6 ? 'active' : ''}`}>
                    <div className='input-cont'>
                        <label>Department Id</label>
                        <input type="text" value={employeeData.DepID} onChange={(e) => handleChange(e, 'DepID')}/>
                    </div>
                    <div className='input-cont'>
                            <label>Department Name</label>
                            <input type="text" value={employeeData.DepName} onChange={(e) => handleChange(e, 'DepName')}/>
                    </div>
                    <div className='input-cont'>
                            <label>Department Location</label>
                            <input type="text" value={employeeData.DepLocation} onChange={(e) => handleChange(e, 'DepLocation')}/>
                    </div>
                    
                </div>}
                */}
                {activeDiv===7&&<div className={`container ${activeDiv === 7 ? 'active' : ''}`}>
                    <div className='employee'>
                        <div className='input-cont'>
                            <label>Company Name</label><br/>
                            <input type='text' value={employeeData.CompanyName} onChange={(e) => handleChange(e, 'CompanyName')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Manager</label><br/>
                            <input type='text' value={employeeData.Managers} onChange={(e) => handleChange(e, 'Managers')}/>
                        </div>
                        <div className='input-cont'>
                            <label>Details</label><br/>
                            <input type='text' value={employeeData.Details} onChange={(e) => handleChange(e, 'Details')}/>
                        </div>

                        <button onClick={handleSubmit}>Next</button>
                    </div>
                    
                    
                </div>}

            </div>
             
        </div>
      
        </div>
        
    </div>
  )
}



// export default function Employee() {
//   return (
//     <div className='Employee'>
      
//     </div>
//   )
// }

