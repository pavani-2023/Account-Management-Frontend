import React, { useState,useContext, } from 'react';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IdContext } from '../Registration/Contextapi';
import { supabase } from './supabase';
import './Signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from './images/undraw_file_sync_ot38.svg'



const Signin = () => {
  
  const { updateuuid,login } = useContext(IdContext);
  const navigate =useNavigate();
 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };
 
  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/signin', formData);
      

  //     if (response.status === 200) {
  //       console.log('User signed in successfully');
  //       const uuid = response.data.uuid;
  //       const role = response.data.role
  //       console.log('role',role)
  //       // updateuuid({uuid});
  //       // login({role});
  //       sessionStorage.setItem('role', role);
      
  //       console.log('login',login)
  //       console.log('update id',updateuuid(uuid));
  //       console.log('signin uuid',uuid);
  //       console.log(response.data)
        
  //     if (role === 'User') {
       
  //       navigate('/user-page');
  //     } else if (role === 'Admin') {
        
  //       navigate('/admin-page');
  //     } else {
        
  //       console.log('/unauth');
  //     }
  //     } else {
  //       console.error('Sign-in failed:', response.data.error || 'Unknown error');
  //     }
  //   } catch (error) {
  //     console.error('Error during sign-in:', error);
  //   }
  // };
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signin', formData);
  
      if (response.status === 200) {
        console.log('User signed in successfully');
        const uuid = response.data.uuid;
        const role = response.data.role;
  
        sessionStorage.setItem('role', role);
  
        if (role === 'User') {
          navigate('/user-page');
        } else if (role === 'Admin') {
          navigate('/admin-page');
        } else {
          console.log('/unauth');
        }
      } else {
        // Update error state when sign-in fails
        setError(response.data.error || 'Unknown error');
      }
    } catch (error) {
      // Update error state when there's an error during sign-in
      setError('Error during sign-in. Please try again.');
      // setError(error)
      console.log('Error during sign-in:', error);
    }
  };
  
  return (
    <>
     <div className="SignIn">
       <div className="signin-container">
       <div className='left'>
        <div  >
        <img  className='images'src={image} alt='login-image'/>
        </div>
          
       </div>
       <div className="rigth">
        
            <div className='signin-input-container'>
            <h1>Welcome Back</h1>
             <p className='p'>To Keep Connected with us Please Login With Your Personal information by Email and Password</p> 
            <h2 className='h2'>Sign In</h2>
            {error && <p className="error-message">{error}</p>}

              <input type="email" id="mail" className="input" name="email" placeholder="Email ID" onChange={(e) => handleChange(e, 'email')} />
              
            </div><br />

            <div className='signin-input-container'>
              
              <input type="password" id="passw" className="input" placeholder="Password" onChange={(e) => handleChange(e, 'password')} />

            </div><br />

            <p><Link to="/forgot-password">Forgot Password?</Link></p>



            <div>
            <button className="register-button" onClick={handleLogin}>Sign In</button>
            </div>
            
            {/* {error && <p className="error-message">{error}</p>} */}
            <p>Don't have an account? <Link to='/signup'>Create</Link></p>
            
        </div>
      

       </div>
     </div>
     
    </>
  );
};




// const Signin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e, field) => {
//     setFormData({
//       ...formData,
//       [field]: e.target.value,
//     });
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/signin', formData);

//       if (response.status === 200) {
//         console.log('User signed in successfully');
//         const token = response.data.token;
//         const role = response.data.role;

//         // Store token and role in localStorage
//         localStorage.setItem('token', token);
//         localStorage.setItem('role', role);

//         // Redirect based on user role
//         if (role === 'User') {
//           navigate('/user-page');
//         } else if (role === 'Admin') {
//           navigate('/admin-page');
//         } else {
//           console.log('/unauth');
//         }
//       } else {
//         setError(response.data.error || 'Unknown error');
//       }
//     } catch (error) {
//       setError('Error during sign-in. Please try again.');
//       console.error('Error during sign-in:', error);
//     }
//   };

//   return (
//     <>
//       <div className="SignIn">
//         <div className="signin-container">
//           <div className='left'>
//             <div>
//               <img className='images' src={image} alt='login-image' />
//             </div>
//           </div>
//           <div className="rigth">
//             <div className='signin-input-container'>
//               <h1>Welcome Back</h1>
//               <p className='p'>To Keep Connected with us Please Login With Your Personal information by Email and Password</p>
//               <h2 className='h2'>Sign In</h2>
//               {error && <p className="error-message">{error}</p>}
//               <input type="email" id="mail" className="input" name="email" placeholder="Email ID" onChange={(e) => handleChange(e, 'email')} />
//             </div><br />
//             <div className='signin-input-container'>
//               <input type="password" id="passw" className="input" placeholder="Password" onChange={(e) => handleChange(e, 'password')} />
//             </div><br />
//             <p><Link to="/forgot-password">Forgot Password?</Link></p>
//             <div>
//               <button className="register-button" onClick={handleLogin}>Sign In</button>
//             </div>
//             <p>Don't have an account? <Link to='/signup'>Create</Link></p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


export default Signin;

