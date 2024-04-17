// import React from 'react'
// import './Header.css'
// import image from '../images/White logo - no background (2).svg'

// import { supabase } from '../Registration/supabase'

// export default function Header() {
//   const handlesignout= async () =>{
//     try{
//       const { user,error } = await supabase.auth.signOut()
//       if (error) {
//         console.error(error.message);
//       } else {
//         console.log('Signout successful', user,);
//         // Redirect to the home page
//         // window.location.href = '/login';
//         window.location.href = '/';
//       }
//     }catch{

//     }
//   }
//   return (
//     <div className='Header item1'>
//       <div>
//       <img src={image} className='header-image'/>
//       </div>
      
//        <div>
//         <input type='search' className='header-input'/>
//        </div>
//        <button onClick={handlesignout} className='header-button'>Sign out</button>
//     </div>
//   )
// }


// import React from 'react';
// import './Header.css';
// import image from '../images/White logo - no background (2).svg';
// import { supabase } from '../Registration/supabase';

// export default function Header() {
//   const handlesignout = async () => {
//     try {
//       const { user, error } = await supabase.auth.signOut();
//       if (error) {
//         console.error(error.message);
//       } else {
//         console.log('Signout successful', user);
//         // Replace current URL with the home page URL
//         window.history.replaceState(null, '/user-page', '/');
//         // Redirect to the home page
//         // window.location.href = '/login';
//         window.location.href = '/';
//       }
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };

//   return (
//     <div className='Header item1'>
//       <div>
//         <img src={image} className='header-image' alt='Logo' />
//       </div>
//       <div>

//       </div>
//       <button onClick={handlesignout} className='header-button'>
//         Sign out
//       </button>
//     </div>
//   );
// }


import React, { useState } from 'react';
import './Header.css';
import image from '../images/White logo - no background (2).svg';
import { supabase } from '../Registration/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [status, setStatus] = useState('Active');

  const handlesignout = async () => {
    try {
      const { user, error } = await supabase.auth.signOut();
      if (error) {
        console.error(error.message);
      } else {
        console.log('Signout successful', user);
        window.history.replaceState(null, '/user-page', '/');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  
  return (
    // <div className='Header item1'>
    //   <div>
    //     <img src={image} className='header-image' alt='Logo' />
    //   </div>
    //   <div className='header-menu'>
    //   <div className='menu'>
    //     <select value={status} onChange={(e) => setStatus(e.target.value)} className='header-dropdown'>
    //       <option value="Active">
    //         <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /> Active
    //       </option>
    //       <option value="Inactive">
    //         <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} /> Inactive
    //       </option>
    //     </select>
    //   </div>
    //   <div className='menu'>
    //   <button onClick={handlesignout} className='header-button'>
    //     Sign out
    //   </button>
    //   </div>
      
    //   </div>
      
    // </div>
    <div className='Header item1'>
     
    <div>
      <img src={image} className='header-image' alt='Logo' />
    </div>
    {/* <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className='header-dropdown'>
        <option value="Active">
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /> Active
        </option>
        <option value="Inactive">
          <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} /> Inactive
        </option>
      </select>
    </div> */}
    <button onClick={handlesignout} className='header-button'>
      Sign out
    </button>
  </div>
  );
}

