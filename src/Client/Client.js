import React, { useState, useEffect } from 'react';
import './Client.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  // console.log('clients',clients)
  const [clientlogins,setClientlogins]=useState([])
  // console.log('clientlogins',clientlogins)
  const[newemp,setNewEmp] =useState(false);
  const handleforms=()=>{
    setNewEmp(true);
  }
  const handlecloseform=()=>{
    setNewEmp(false);
  }

  useEffect(() => {
    fetchclientdetails();
    
  }, [clientlogins]);
  useEffect(()=>{
fetchclientregistration();
  },[])


  const fetchclientdetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getClientDetails');
      setClients(response.data); 
    } catch (error) {
      console.log('error fetching client details', error);
    }
  };
  const fetchclientregistration = async(res,req)=>{
    try {
      const response = await axios.get('http://localhost:5000/ClientRegistration');
    //  console.log('response',response)
      const data =response.data
      // console.log('data',data)
    const updatedClientLogins = data.map(client => ({
      clientusername:client.username,
      clientId: client.uuid,
      clientEmail: client.email
    }));
    // console.log('updatedClientLogins', updatedClientLogins); 
    setClientlogins(updatedClientLogins); 
    
    } catch (error) {
      console.log('error fetching client details', error);
    }

  }
  useEffect(() => {
    const saveclients = async () => {
      try {
        const response2 = await axios.post('http://localhost:5000/ClientDetails', clientlogins);
      } catch (error) {
        console.log('error fetching client details', error);
      }
    };

    saveclients();

  }, [clientlogins]);


  const handleCellChange = (value, rowIndex, key) => {
    const updatedClients = clients.map((client, index) =>
      index === rowIndex ? { ...client, [key]: value } : client
    );
    setClients(updatedClients);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/clients', clients);
      alert('Data submitted successfully!');
     
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting data.');
    }
  };

  const [successMessage, setSuccessMessage] = useState('');
  const deleteRow =async (rowIndex)=>{
    const clientIdToDelete = clients[rowIndex].clientId;
    const clientname=clients[rowIndex].clientName
   try{
    const response= await axios.delete(`http://localhost:5000/deleteClients/${clientIdToDelete}`)
    if (response.status === 200) {
      setSuccessMessage(`${clientname} is deleted  Reload the page to reflect changes`)
      
      const updatedClients = clients.filter(client => client.id !== clientIdToDelete);
      setClients(updatedClients);
    } else {
 
      console.error('Failed to delete client');
    }
   }catch(error){
    console.log('error deleting clients',error)
   }

  }

  return (
    <div className="Main-Container">
    
      <div className='container'>
      
        
      
        <div className='table-align'>
          
          

          {successMessage && <div className="success-message-clients">{successMessage}</div>}
              
                <table className="client-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>ID</th>
                      <th style={{ width: '100px' }}>Username</th>
                      <th style={{ width: '100px' }}>Name</th>
                      <th style={{ width: '150px' }}>Address</th>
                      <th style={{ width: '150px' }}>Email</th>
                      <th style={{ width: '50px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, rowIndex) => (
                      <tr key={rowIndex}>
                        <td
                          contentEditable="true"
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientId')}
                        >
                          {client.clientId}
                        </td>
                        <td
                          contentEditable="true"
                          suppressContentEditableWarning={true}
                        >
                          {client.clientusername}
                        </td>
                        <td
                          contentEditable="true"
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientName')}
                        >
                          {client.clientName}
                        </td>
                        <td
                          contentEditable="true"
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientAddress')}
                        >
                          {client.clientAddress}
                        </td>
                        <td
                          contentEditable="true"
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientEmail')}
                        >
                          {client.clientEmail}
                        </td>
                        <td>
                          <h3 onClick={() => deleteRow(rowIndex)} style={{color:'#2a4d5d'}}><FontAwesomeIcon icon={faTrash} /></h3>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               
          </div>

        
       <div style={{display:'flex',justifyContent:'center'}}>
       <button onClick={handleSubmit} >Update</button>
       </div>
      
      </div>

      
    </div>
  );
};

export default ClientTable;

