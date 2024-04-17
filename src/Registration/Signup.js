import React from 'react';
import './Signup.css';
import { useState,useContext } from 'react';
import { supabase } from './supabase';
import {Link} from 'react-router-dom';
import { IdContext } from './Contextapi';
import axios from 'axios';

// function Signup() {
//   const idContext = useContext(IdContext);
//   const{login}=useContext(IdContext)
//   const generateUUID = () => {
    
//     return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
//   };
  

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     uuid: generateUUID(),
//     role:'User'
//   });


//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     uuid: '',
//   });

//   // const handleRegister = async () => {
//   //   try {
//   //     const { user, error } = await supabase.auth.signUp({
//   //       email: formData.email,
//   //       password: formData.password,
//   //       phone:formData.phoneNumber,
//   //       uuid:formData.uuid,
//   //     });
  
//   //     if (error) throw error;
//   //     console.log('Registration successful', user);
//   //   } catch (error) {
//   //     console.error('Error registering user', error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   // Update the context with the generated UUID when the component mounts
//   //   idContext.updateUserId(formData.uuid);
//   // }, [formData.uuid, idContext]);


//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password || !formData.confirmPassword) {
//       setErrors({
//         email: formData.email ? '' : 'Email is required',
//         password: formData.password ? '' : 'Password is required',
//         confirmPassword: formData.confirmPassword ? '' : 'Confirm Password is required',
//         phoneNumber: formData.phoneNumber ? '' : 'Phone Number is required',
//       });
//       return;
//     }
  
//     if (formData.password !== formData.confirmPassword) {
//       setErrors({
//         ...errors,
//         confirmPassword: 'Password and Confirm Password do not match',
//       });
//       return;
//     }
//     if (formData.email.exists) {
//       setErrors({
//         ...errors,
//         email: 'Email already exists. Please choose a different email.',
//       });
//       return;
//     }
//     try{
//       const response= await axios.post('http://localhost:5000/submitForm',formData)
      
//       console.log('response',response);
//       console.log('employee created');
//       const response2 = await axios.post('http://localhost:5000/Employee', { uuid: formData.uuid });
//        console.log('response2', response2);
//        console.log('employee created');

//        setFormData('');
 
//     }catch (error) {
//         console.error('Error submitting form:', error);
//       }
//   };
  
//   const handleChange = (e, field) => {
//     setFormData({
//       ...formData,
//       [field]: e.target.value,
//     });
//     setErrors({
//       ...errors,
//       [field]: '',
//     });
//   };

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
//   console.log('formdata',formData);



//   return (
//     <div className="Signup">
//       <div className="signup-container">
//         <div className='right'>
//           <h1>Create Your Account</h1>
//           <div>
//           <select  name="role" value={formData.role} className="input"  onChange={handlechange} required>
//             <option value="User">User</option>
//             <option value="Admin">Admin</option>
//           </select>
//           </div>
//           <div className='input-container'>

         

//             <input type="text" name="uuid" className="input"  placeholder="UUID (16 digits)" value={formData.uuid} onChange={(e) => handleChange(e, 'uuid')} readOnly />

//           </div>
//           <div className='input-container'>

//             <input type="email" className="input"  name="email" placeholder="Email ID" onChange={(e) => handleChange(e, 'email')} />

//           </div>
//           <div className='input-container'>

//             <input type="password" className="input" placeholder="Password" onChange={(e) => handleChange(e, 'password')} />

//           </div>
//           <div className='input-container'>
//             <input type="password" className="input" name="confirm-password" placeholder="Confirm Password" onChange={(e) => handleChange(e, 'confirmPassword')}/>
//           </div>
          
//           <div className='input-container'>
//             <input type="number" className="input" name="phone-number" placeholder="Phone Number" onChange={(e) => handleChange(e, 'phoneNumber')} />
//           </div>
          
//           <div>
//           <button className='signup-button'onClick={handleRegister}>Register</button>
//           </div>
          
//            {/* <p>Already have an account <Link to='/login'>Login here</Link></p> */}
//         </div>
        
//       </div>
//     </div>
//   );
// }


function Signup() {
  const generateUUID = () => {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
  };
  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    uuid: generateUUID(),
    role: 'User'
  });



  const [errors, setErrors] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    uuid: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (!formData.email || !formData.password || !formData.confirmPassword) {
  //     setErrors({
  //       email: formData.email ? '' : 'Email is required',
  //       password: formData.password ? '' : 'Password is required',
  //       confirmPassword: formData.confirmPassword ? '' : 'Confirm Password is required',
  //       phoneNumber: formData.phoneNumber ? '' : 'Phone Number is required',
  //     });
  //     return;
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     setErrors({
  //       ...errors,
  //       confirmPassword: 'Password and Confirm Password do not match',
  //     });
  //     return;
  //   }
  //   // Assuming formData.email.exists is used to check if the email already exists
  //   if (formData.email.exists) {
  //     setErrors({
  //       ...errors,
  //       email: 'Email already exists. Please choose a different email.',
  //     });
  //     return;
  //   }
  //   try {
  //     const response = await axios.post('http://localhost:5000/submitForm', formData);
  //     console.log('response', response);
  //     // Assuming successful registration returns status code 200
  //     if (response.status === 200) {
  //       setSuccessMessage('Registration successful!');
  //     }
  //     console.log('employee created');
  //     const response2 = await axios.post('http://localhost:5000/Employee', { uuid: formData.uuid });
  //     console.log('response2', response2);
  //     console.log('employee created');
  //     setFormData('');
  //   } catch (error) {
  //     setErrorMessage('Error submitting form. Please try again later.');
  //     console.error('Error submitting form:', error);
  //   }
  // };


  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrors({
        email: formData.email ? '' : 'Email is required',
        password: formData.password ? '' : 'Password is required',
        confirmPassword: formData.confirmPassword ? '' : 'Confirm Password is required',
        phoneNumber: formData.phoneNumber ? '' : 'Phone Number is required',
      });
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Password and Confirm Password do not match',
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/submitForm', formData);
      if (response.status === 200) {
        setSuccessMessage('Registration successful!');
      }
      console.log('employee created');
      if (formData.role === 'Admin' || formData.role === 'User') {
        const response2 = await axios.post('http://localhost:5000/Employee', { uuid: formData.uuid });
        console.log('response2', response2);
        
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email is already registered.');
      } else {
        setErrorMessage('Error submitting form. Please try again later.');
      }
      console.error('Error submitting form:', error);
    }
  };
  
  
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
    setErrors({
      ...errors,
      [field]: '',
    });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="Signup">
      <div className="signup-container">
        <div className='right'>
          <h1>Create Your Account</h1>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div>
            <select name="role" value={formData.role} className="input" onChange={handlechange} style={{height:'50px'}} required>
              <option value="User">User</option>
              <option value='Client'>Client</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className='input-container'>
            <input type="text" name="uuid" className="input" placeholder="UUID (16 digits)" value={formData.uuid}  readOnly />
          </div>
          <div className='input-container'>
            <input type="text" className="input" name="username" placeholder="username" onChange={(e) => handleChange(e, 'username')} required/>
          </div>
          <div className='input-container'>
            <input type="email" className="input" name="email" placeholder="Email ID" onChange={(e) => handleChange(e, 'email')} />
            {errors.email.exist && <div className="error-message">{errors.email}</div>}
          </div>
          <div className='input-container'>
            <input type="password" className="input" placeholder="Password" onChange={(e) => handleChange(e, 'password')} />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <div className='input-container'>
            <input type="password" className="input" name="confirm-password" placeholder="Confirm Password" onChange={(e) => handleChange(e, 'confirmPassword')} />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          <div className='input-container'>
            <input type="number" className="input" name="phone-number" placeholder="Phone Number" onChange={(e) => handleChange(e, 'phoneNumber')} />
            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
          </div>
          <div>
            <button className='signup-button' onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Signup;



