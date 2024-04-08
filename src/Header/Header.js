import React from 'react'
import './Header.css'

import { supabase } from '../Registration/supabase'

export default function Header() {
  const handlesignout= async () =>{
    try{
      const { user,error } = await supabase.auth.signOut()
      if (error) {
        console.error(error.message);
      } else {
        console.log('Signout successful', user,);
        // Redirect to the home page
        // window.location.href = '/login';
        window.location.href = '/';
      }
    }catch{

    }
  }
  return (
    <div className='Header item1'>
       <p>Account-Management</p>
       <button onClick={handlesignout}>Sign out</button>
    </div>
  )
}
