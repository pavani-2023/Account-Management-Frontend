import React, { useState, useEffect } from 'react';
import './Client.css';
import axios from 'axios';
import UserSidebar from '../Sidebar/UserSidebar';
import ClientSIgnUp from '../Registration/Client/ClientSIgnUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  console.log('clients',clients)
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
    console.log('updatedClientLogins', updatedClientLogins); 
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

  // const deleteRow = (rowIndex) => {
  //   const clientIdToDelete = clients[rowIndex].clientId;
  //   axios.delete(`/deleteClients/${clientIdToDelete}`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         // Update clients array after successful deletion
  //         const updatedClients = clients.filter(client => client.id !== clientIdToDelete);
  //         setClients(updatedClients);
  //       } else {
  //         // Handle error response
  //         console.error('Failed to delete client');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error deleting client:', error);
  //     });
  // };
  const [successMessage, setSuccessMessage] = useState('');
  const deleteRow =async (rowIndex)=>{
    const clientIdToDelete = clients[rowIndex].clientId;
    const clientname=clients[rowIndex].clientName
   try{
    const response= await axios.delete(`http://localhost:5000/deleteClients/${clientIdToDelete}`)
    if (response.status === 200) {
      setSuccessMessage(`${clientname} is deleted  Reload the page to reflect changes`)
      // Update clients array after successful deletion
      const updatedClients = clients.filter(client => client.id !== clientIdToDelete);
      setClients(updatedClients);
    } else {
      // Handle error response
      console.error('Failed to delete client');
    }
   }catch(error){
    console.log('error deleting clients',error)
   }

  }

  return (
    <div className="Main-Container">
    
      <div className='container'>
        {/* <h2>Client Details</h2> */}
        
      
        <div className='table-align'>
          
          

          {successMessage && <div className="success-message-clients">{successMessage}</div>}

       
     
{/*           
                 <table className="client-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>ID</th>
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
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientId')}
                        >
                          {client.clientId}
                        </td>
                        <td
                          contentEditable="true"
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientName')}
                        >
                          {client.clientName}
                        </td>
                        <td
                          contentEditable="true"
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientAddress')}
                        >
                          {client.clientAddress}
                        </td>
                        <td
                          contentEditable="true"
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
                </table>  */}


                
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
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientId')}
                        >
                          {client.clientId}
                        </td>
                        <td
                          contentEditable="true"
                        >
                          {client.clientusername}
                        </td>
                        <td
                          contentEditable="true"
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientName')}
                        >
                          {client.clientName}
                        </td>
                        <td
                          contentEditable="true"
                          onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientAddress')}
                        >
                          {client.clientAddress}
                        </td>
                        <td
                          contentEditable="true"
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Client.css';

// const ClientTable = () => {
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     fetchClientDetails();
//   }, []);

//   const fetchClientDetails = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getClientDetails');
//       setClients(response.data); // Use response.data
//     } catch (error) {
//       console.log('error fetching client details', error);
//     }
//   };

//   const deleteClient = async (clientId) => {
//     try {
//       await axios.delete(`http://localhost:5000/clients/${clientId}`);
//       fetchClientDetails(); // Refetch client details after deletion
//     } catch (error) {
//       console.error('Error deleting client:', error);
//       alert('An error occurred while deleting client.');
//     }
//   };

//   const updateClient = async (clientId, updatedClient) => {
//     try {
//       await axios.put(`http://localhost:5000/clients/${clientId}`, updatedClient);
//       fetchClientDetails(); // Refetch client details after update
//     } catch (error) {
//       console.error('Error updating client:', error);
//       alert('An error occurred while updating client.');
//     }
//   };

//   const handleCellChange = (value, rowIndex, key) => {
//     const updatedClients = clients.map((client, index) =>
//       index === rowIndex ? { ...client, [key]: value } : client
//     );
//     setClients(updatedClients);
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:5000/clients', clients);
//       alert('Data submitted successfully!');
//       fetchClientDetails(); // Refetch client details after submission
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('An error occurred while submitting data.');
//     }
//   };

//   return (
//     <div className="Main-Container">
//       <div className="client">
//         <h2>Client Details</h2>
//       </div>

//       <table className="client-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client, rowIndex) => (
//             <tr key={rowIndex}>
//               <td>{client.clientId}</td>
//               <td contentEditable="true" onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientName')}>{client.clientName}</td>
//               <td contentEditable="true" onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientAddress')}>{client.clientAddress}</td>
//               <td contentEditable="true" onBlur={(e) => handleCellChange(e.target.innerText, rowIndex, 'clientEmail')}>{client.clientEmail}</td>
//               <td>
//                 <button onClick={() => deleteClient(client.clientId)}>Delete</button>
//                 <button onClick={() => updateClient(client.clientId, clients[rowIndex])}>Update</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default ClientTable;

