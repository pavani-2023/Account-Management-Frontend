import React, { useState, useEffect } from 'react';
import './Client.css';
import axios from 'axios';
import UserSidebar from '../Sidebar/UserSidebar';
const ClientTable = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchclientdetails();
  }, []);

  const fetchclientdetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getClientDetails');
      setClients(response.data); 
    } catch (error) {
      console.log('error fetching client details', error);
    }
  };
  
  
  const addRow = () => {
    const newClient = {
      clientId: '',
      clientName: '',
      clientAddress: '',
      clientEmail: '',
    };
    setClients([...clients, newClient]);
  };

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
      setClients([]); // Clear clients after successful submission
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
  const deleteRow =async (rowIndex)=>{
    const clientIdToDelete = clients[rowIndex].clientId;
   try{
    const response= await axios.delete(`http://localhost:5000/deleteClients/${clientIdToDelete}`)
    if (response.status === 200) {
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
        <h2>Client Details</h2>
      </div>

      <button onClick={addRow}>Add Row</button>
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
                <button onClick={() => deleteRow(rowIndex)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit}>Submit</button>
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

