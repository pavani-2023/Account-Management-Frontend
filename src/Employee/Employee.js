import { useState,useEffect,useRef } from 'react';
import './Employee.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';

const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})

// const api =axios.create({baseURL:'http://localhost:5000',})

export default function Employee() {
    
  
    const { uuid } = useParams();
    const[employeelogindetails,setEmployeeLoginDetails]= useState([]);
    // console.log('employeeData',employeelogindetails)
    const [employeeData,setEmployeeData]=useState({
        EmployeeName:null,
        FirstName:null,
        MiddleName:null,
        Lastname:null,
        EmployeeID:uuid,
        Gender:null,
        PersonalEmail:null,
        MobileNumber:null,
        AlternativeMobileNumber:null,
        DateOfBirth:null,
        FatherName:null,
        ResidentialAddress:null,
        Name:null,
        PhoneNumber:null,
        Relationship:null,
        DateofJoining:null,
        WorkEmail:null,
        ReleavingDate:null,
        TeamLead:null,
        DepHaed:null,
        Manager:null,
        OfficeManager:null,
        PANnumber:null,
        Aadharnumber:null,
        DepID:null,
        DepName:null,
        DepLocation:null,
        Designation:null,
        ACType:null,
        ACNUmber:null,
        IFSCCode:null,
        Branch:null, 
        UANnumber:null,
        SalaryCTC:null,
        CompanyName:null,
        Managers:null,
        Details:null,
        imageSrc:'',
 
      })
// console.log('employeeData',employeeData)
      const fileInputRef = useRef(null);
   
    
 
    const updateEmployeeName = () => {
        const { FirstName, MiddleName, Lastname } = employeeData;
        
        const firstNamePart = FirstName ? FirstName.trim(' ') : '';
     
        const middleNamePart = MiddleName ? MiddleName : '';
   
        const lastNamePart = Lastname ? Lastname : '';
        // console.log('lastName',lastNamePart)
      
        const fullName = `${firstNamePart} ${middleNamePart} ${lastNamePart}`;
        // console.log('fullName',fullName)
        setEmployeeData(prevData => ({ ...prevData, EmployeeName: fullName }));
    };
    useEffect(()=>{
        getEmployeeDetails();
        fetchemployeelogindetails()
    }, []);
    
    const fetchemployeelogindetails=async()=>{

        try {
              const response = await api.get(`/getlogindetails/${uuid}`);
              setEmployeeLoginDetails(response.data); 
              const employeedata = response.data;
            //   console.log('emplo',employeedata)

            //   setEmployeeData(prevState => ({
            //     ...prevState,
            //     MobileNumber: employeedata.phoneNumber,
            //     WorkEmail:employeedata.email,

            // }));
             
              console.log('response',response)
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }
    
   

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e, field) => {
        const value = e.target.value;
        setEmployeeData(prevData => ({
            ...prevData,
            [field]: value,
        }));
        updateEmployeeName();
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFieldsBySection = {
            'personalDetails': ['FirstName', 'Lastname', 'PersonalEmail', 'MobileNumber', 'DateOfBirth'],
            'officeDetails': ['DateofJoining', 'WorkEmail','DepName','Designation',],
            // 'governmentProofs': ['PANnumber', 'Aadharnumber'],
            // 'bankDetails': ['ACType', 'ACNUmber', 'Branch', 'UANnumber', 'SalaryCTC', 'IFSCCode'],
            // 'clientDetails': ['CompanyName', 'Managers', 'Details']
        };
    
        // Validate required fields dynamically
        const newErrors = {};
        for (const section in requiredFieldsBySection) {
            if (requiredFieldsBySection.hasOwnProperty(section)) {
                const fields = requiredFieldsBySection[section];
                fields.forEach(field => {
                    if (!employeeData[field] || (typeof employeeData[field] === 'string' && employeeData[field].trim() === '')) {
                        newErrors[field] = `${field} is required`;
                    } else {
                        newErrors[field] = '';
                    }
                });
            }
        }
        setErrors(newErrors);
    
        
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (hasErrors) {
            setGeneralError('Please fill all required fields');
            return; 
        }
    
        try {
            const response = await api.put('/Employee', employeeData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            setGeneralError('')
        } catch (error) {
            console.error('Error Submitting Employee Details', error);
        }
    };
    

   
  
    const getEmployeeDetails = async () => {
    try {
      const response = await api.get(`/employee/${employeeData.EmployeeID}`)
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
       
       <form onSubmit={handleSubmit}>
        <div className='employee-main-container'>
       
        <div className='Employee-container'>
   
            <div className='sub-container'>
                <div onClick={() => displayDiv(1)} className={`word ${activeDiv === 1 ? 'active' : ''}`}>Personal details</div>
                <div onClick={() => displayDiv(2)} className={`word ${activeDiv === 2 ? 'active' : ''}`}>Office Details</div>
                <div onClick={() => displayDiv(3)} className={`word ${activeDiv === 3 ? 'active' : ''}`}>Government proofs</div>
                <div onClick={() => displayDiv(4)} className={`word ${activeDiv === 4 ? 'active' : ''}`}>Bank Deatils</div>
                <div onClick={() => displayDiv(7)} className={`word ${activeDiv === 7 ? 'active' : ''}`}>Client Details</div>

            </div>
            

            <div className='Employee-personal-details'>
            {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

            <div>
                    {Object.entries(errors).map(([field, error]) => (
                        error && <p key={field} style={{ color: 'red' }}>{error}</p>
                    ))}
                </div>
                {activeDiv===1  && < div className={`profile-container ${activeDiv === 1 ? 'active' : ''}`}>
                   <div style={{display:'flex',flexDirection:'column', width:'100%',gap:'40px'}} >
                        <div className="image" style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>

                            <div className="profile-pic" style={{width: '300px',borderRadius: '15px',padding: '20px',display: 'flex',alignItems: 'center',justifyContent: 'center',flexDirection: 'column',transition: 'transform 0.2s ease',}}>

                                <input type="file"accept="image/*"onChange={handleImageChange}style={{ display: 'none' }}ref={fileInputRef} />

                                <div style={{ width: '250px',height: '250px',borderRadius: '50%', overflow: 'hidden',boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',position: 'relative',}}>
                                
                                    <img alt="User Pic"src={employeeData.imageSrc ? employeeData.imageSrc : 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png'}id="profile-image1"style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.2s ease',}} onClick={handleClick} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} 
                                    />
                                </div>
                            </div>


                            <div style={{ width: '400px',height: 'auto',borderRadius: '15px',padding: '20px',display: 'flex',flexDirection: 'column', gap: '15px', }}>
                           
                               
                                <div className='input-conta'>
                                    <label style={{ marginRight: '20px', fontWeight: 'bold' }}>Employee ID:</label>
                                    <input type="text" value={employeeData.EmployeeID} readOnly style={{border: 'none', width: '100%',padding: '8px',borderRadius: '5px',backgroundColor: '#f7f7f7', }} />
                                </div>

                                <div className='input-conta'>
                                    <label style={{ fontWeight: 'bold' }}>Employee Name:</label>
                                    <input type="text" id="employee-name" readOnly value={employeeData.EmployeeName} onChange={(e) => handleChange(e, 'EmployeeName')} style={{border: 'none',width: '100%',padding: '8px',borderRadius: '5px',backgroundColor: '#f7f7f7', }}/>
                                  
                                </div>

                                <div className='input-conta'>
                                    <label style={{ fontWeight: 'bold' }}>Department:</label>
                                    <input type="text" readOnly value={employeeData.DepName} onChange={(e) => handleChange(e, 'DepName')} style={{border: 'none',width: '100%',padding: '8px',borderRadius: '5px',backgroundColor: '#f7f7f7', }} />
                                </div>

                                <div className='input-conta'>
                                    <label style={{ fontWeight: 'bold' }}>Designation:</label>
                                    <input type="text" readOnly value={employeeData.Designation} onChange={(e) => handleChange(e, 'Designation')} style={{border: 'none',width: '100%',padding: '8px',borderRadius: '5px',backgroundColor: '#f7f7f7',}} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='personal-info employee'>
                                    <div className='input-cont'>
                                        <label>First Name<span className="required-field"></span></label><br/>
                                        <input type="text"value={employeeData.FirstName} onChange={(e) => handleChange(e, 'FirstName')} required/>
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Middle Name</label><br/>
                                        <input type="text"value={employeeData.MiddleName} onChange={(e) => handleChange(e, 'MiddleName')}/>
                                    </div>
                
                
                                    <div className='input-cont'>
                                        <label>Last Name<span className="required-field"></span></label><br/>
                                        <input type="text" value={employeeData.Lastname}onChange={(e) => handleChange(e, 'Lastname')}required />
                                    </div>
                
                                    

                                    <div className='input-cont'>
                                        <label>Gender</label><br />
                                        <div className='gender'>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Male"
                                                    checked={employeeData.Gender === "Male"}
                                                    onChange={(e) => handleChange(e, 'Gender')}
                                                    style={{ marginRight: '5px' }} 
                                                />
                                                Male
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Female"
                                                    checked={employeeData.Gender === "Female"}
                                                    onChange={(e) => handleChange(e, 'Gender')}
                                                    style={{ marginRight: '5px' }} 
                                                />
                                                Female
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Other"
                                                    checked={employeeData.Gender === "Other"}
                                                    onChange={(e) => handleChange(e, 'Gender')}
                                                    style={{ marginRight: '5px' }} 
                                                />
                                                Other
                                            </label>
                                        </div>
                                    </div>

                
                                    <div className='input-cont'>
                                        <label>Personal Email<span className="required-field"></span></label><br/>
                                        <input type="email" value={employeeData.PersonalEmail} onChange={(e) => handleChange(e, 'PersonalEmail')} required/>
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Mobile Number<span className="required-field"></span></label><br/>
                                        <input type="number" value={employeeData.MobileNumber} onChange={(e) => handleChange(e, 'MobileNumber')} readonly required/>
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Alternative Mobile Number</label><br/>
                                        <input type="number" value={employeeData.AlternativeMobileNumber} onChange={(e) => handleChange(e, 'AlternativeMobileNumber')} />
                                    </div>
                
                                    <div className='input-cont'>
                                        <label>Date Of Birth<span className="required-field"></span></label><br/>
                                        <input type="date" value={employeeData.DateOfBirth} onChange={(e) => handleChange(e, 'DateOfBirth')}required />
                                    </div>
                
                                    <div className='input-cont'>

                                        <label> Father Name</label><br/>
                                        <input type="text" value={employeeData.FatherName} onChange={(e) => handleChange(e, 'FatherName')} required/>
                                        
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
                                        <label>Name<span className="required-field"></span></label><br/>
                                        <input type="text" value={employeeData.Name}onChange={(e) => handleChange(e, 'Name')} required/>
                                    </div>

                                    <div className='input-cont'>
                                        <label>Phone Number<span className="required-field"></span></label><br/>
                                        <input type="text" value={employeeData.PhoneNumber} onChange={(e) => handleChange(e, 'PhoneNumber')} required/>
                                    </div>

                                    <div className='input-cont'>
                                        <label>Relationship<span className="required-field"></span></label><br/>
                                        <input type="text" value={employeeData.Relationship} onChange={(e) => handleChange(e, 'Relationship')}required />
                                    </div>
                            </div>

                        </div>
                   </div>
                </div>}
                
                {activeDiv===2 && <div className={`profile-container ${activeDiv === 2 ? 'active' : ''}`}>
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
                            <label>Department<span className="required-field"></span></label><br/>
                            <input type="text" value={employeeData.DepName} onChange={(e) => handleChange(e, 'DepName')} required/>
                        </div>
                        <div className='input-cont'>
                            <label>Designation <span className="required-field"></span></label><br/>
                            <input type="text" value={employeeData.Designation} onChange={(e) => handleChange(e, 'Designation')} required/>
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
                {activeDiv===3&&<div className={`profile-container ${activeDiv === 3 ? 'active' : ''}`}>
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
                {activeDiv===4&&<div className={`profile-container ${activeDiv === 4 ? 'active' : ''}`}>
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
                
                {activeDiv===7&&<div className={`profile-container ${activeDiv === 7 ? 'active' : ''}`}>
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

                        <button type="submit">Submit</button>
                    </div>
                    
                    
                </div>}

            </div>
             
        </div>
       
        </div>
        </form>
    </div>
  )
}