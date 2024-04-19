import './Header.css';
import image from '../images/White logo - no background (2).svg';
import { supabase } from '../Registration/supabase';


export default function Header() {


  const handlesignout = async () => {
    try {
      const { user, error } = await supabase.auth.signOut();
      if (error) {
        console.error(error.message);
      } else {
        sessionStorage.removeItem('role');
        console.log('Signout successful', user);
        window.history.replaceState(null, '/user-page', '/');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  
  return (

    <div className='Header item1'>
     
    <div>
      <img src={image} className='header-image' alt='Logo' />
    </div>
    <button onClick={handlesignout} className='header-button'>
      Sign out
    </button>
  </div>
  );
}

