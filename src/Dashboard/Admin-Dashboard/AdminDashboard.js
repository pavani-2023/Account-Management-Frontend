
import { useEffect,useState } from 'react'
import axios from 'axios'
import ReportsAdmin from './ReportsAdmin'
import LeaveStatusAdmin from './LeaveStatusAdmin'
import ClockInTableAdmin from './ClockInTableAdmin'
import './AdminDashboard.css'

const api =axios.create({baseURL:'https://user-account-backend.onrender.com',})

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  console.log('clients',clients)
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState('');
    console.log('selectedClientId',selectedClientId)

  const handleFormOpen = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };


  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await api.get('/getClientDetails');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    };

    fetchClientDetails();

  }, []);

  const handleClientChange = (event) => {
    setSelectedClientId(event.target.value);
  };


  
  return (
    <div className='Main-Container admin-dashboard' >
      <div style={{width:'300px',margin:'auto'}}>
        <select onChange={handleClientChange} style={{width:'300px'}}>
          <option>Select Client</option>
          {clients.map((client) => (
            <option key={client.clientId} value={client.clientId}>
              {client.clientName}
            </option>
          ))}
        </select>
      </div>
    

       <div className='admin-container'>
      <div className='clockin-status'>
         <ClockInTableAdmin selectedClientId={selectedClientId}/>

      </div>
      <div className='leave-status'>
        <div className='leave-status-container'>
        <LeaveStatusAdmin selectedClientId={selectedClientId}/>
        </div>
        
         
      </div>
      <div className='clockin-reports'>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           <button onClick={handleFormOpen}>View Reports Here</button>
        </div>
      

          {showOverlay && (
            <div className="overlay">
              <div className="overlay-content">
              <span className="close-btn" onClick={handleOverlayClose}>&times;</span>
               
                <ReportsAdmin selectedClientId={selectedClientId}/>
              </div>
            </div>
          )}

     
      </div>
     
    </div>  
    </div>
  )
}

export default AdminDashboard

