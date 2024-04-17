import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faEnvelope,faPhone,faUser,faGear,faArrowLeft ,faPenToSquare,} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ClientSIgnUp() {

  const generateUUID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const [formData, setFormData] = useState({
    email: '',
    username:'',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    uuid: generateUUID(),
    role: 'Client'
  });

  const [errors, setErrors] = useState({
    email: '',
    username:'',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    uuid: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  


  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrors({
        email: formData.email ? '' : 'Email is required',
        username:formData.username ?'':'UserName is Required',
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
      const response = await axios.post('http://localhost:5000/ClientRegistration', formData);
      if (response.status === 200) {
        setSuccessMessage('Registration successful!');
        // Clear form data
        setFormData('');
        // window.location.reload();
   
      }
      console.log('client created');
     
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
              {/* <option value="User">User</option> */}
              <option value='Client'>Client</option>
              {/* <option value="Admin">Admin</option> */}
            </select>
          </div>
          <div className='input-container'>
            <input type="text" name="uuid" className="input" placeholder="UUID (16 digits)" value={formData.uuid} onChange={(e) => handleChange(e, 'uuid')} readOnly />
          </div>
          <div className='input-container'>
            <input type="email" className="input" name="email" placeholder="Email ID" onChange={(e) => handleChange(e, 'email')} />
            {errors.email.exist && <div className="error-message">{errors.email}</div>}
          </div>
          <div className='input-container'>
            <input type="text" className="input" name="username" placeholder="name" onChange={(e) => handleChange(e, 'username')} />
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
