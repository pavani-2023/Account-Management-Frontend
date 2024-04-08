// import React, { useState, useEffect } from 'react';
// import './Client.css';

// const ClientListTable = () => {

 
//   const [clients, setClients] = useState([]);

//   const addRow = () => {
//     const newClient = {
//       clientId: '',
//       clientName: '',
//       clientAddress: '',
//       clientEmail: '',
//     };
//     setClients([...clients, newClient]);
//   };


//   const handleCellChange = (value, rowIndex, key) => {
//     const updatedClients = [...clients];
//     updatedClients[rowIndex][key] = value;
//     setClients(updatedClients);
//   };

//   const jsonData = [
//     { id: 1, name: 'Item 1' },
//     { id: 2, name: 'Item 2' },
//     { id: 3, name: 'Item 3' },
//     { id: 4, name: 'bdn' },
//     // Add more data as needed
//   ];
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedData, setSelectedData] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   const handleChange = event => {
//     setSearchTerm(event.target.value);
//     const results = jsonData.filter(item =>
//       item.clientName.toLowerCase().includes(event.target.value.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   const handleAdd = item => {
//     setSelectedData([...selectedData, item]);
//     setSearchTerm('');
//     setSearchResults([]);
//   };

//   return (
//     <div className='Main-Container'>
//       <div className='client' style={{paddingBottom:'50px'}}>
//         <h2>Client Details</h2>
    
//       <div>
//       <h1>Search and Add Items</h1>
//       <input
//         type="text"
//         placeholder="Search..."
//         placeholderTextColor= 'red'
//         value={searchTerm}
//         onChange={handleChange}
//         style={{width:'40%',height:'25px',borderRadius:'5px',borderColor:'black'}}
//       /> 
//       <div>
//         {searchResults.map(item => (
//           <div  onClick={() => handleAdd(item)} key={item.id}>
//             {item.name}{' '}
//             {/* <button onClick={() => handleAdd(item)}>Add</button> */}
//           </div>
//         ))}
//       </div>
//       <h2>Selected Items</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Client Id</th>
//             <th>Client Name</th>
//             <th>Address</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {selectedData.map(item => (
//             <tr key={item.clientId}>
//               <td>{item.clientName}</td>
//               <td>{item.clientId}</td>
//               <td>{item.clientAddress}</td>
//               <td>{item.clientEmail}</td>
              
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
     
//       </div>
//     </div>
//   );
// };

// export default ClientListTable;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// const ClientListTable = () => {
//   const [clients, setClients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedData, setSelectedData] = useState([]);
//   console.log('selected data',selectedData)
//   const [searchResults, setSearchResults] = useState([]);
//   const { uuid } = useParams();
//   // console.log('uuid',uuid)
//   // const{empId,setEmpID}=useState(uuid)
//   // console.log(empId)

//   useEffect(() => {
//     const fetchClientDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/getClientDetails');
//         setClients(response.data);
//       } catch (error) {
//         console.error('Error fetching client details:', error);
//       }
//     };

//     fetchClientDetails();
//   }, []);

//   const saveclientdetails= async()=>{
//     try{
//       const response = await axios.post(`http://localhost:5000/SaveClientDetails/${uuid}`,selectedData);
//     }catch(error){
//       console.log('error saving clients',error)
//     }
//   }
 

//   const handleChange = event => {
//     setSearchTerm(event.target.value);
//     const results = clients.filter(item =>
//       item.clientName.toLowerCase().includes(event.target.value.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   const handleAdd = item => {
//     setSelectedData([...selectedData, item]);
//     setSearchTerm('');
//     setSearchResults([]);
//   };

//   // const deleteRow =async (rowIndex)=>{
//   //   const clientIdToDelete = clients[rowIndex].clientId;
//   //  try{
//   //   const response= await axios.delete(`http://localhost:5000/deleteClientsdetails/${clientIdToDelete}`)
//   //   if (response.status === 200) {
//   //     // Update clients array after successful deletion
//   //     const updatedClients = clients.filter(client => client.id !== clientIdToDelete);
//   //     setClients(updatedClients);
//   //   } else {
//   //     // Handle error response
//   //     console.error('Failed to delete client');
//   //   }
//   //  }catch(error){
//   //   console.log('error deleting clients',error)
//   //  }

//   // }



//   return (
//     <div className='Main-Container'>
//       <div className='client' style={{ paddingBottom: '50px' }}>
//         <h2>Client Details</h2>

//         <div>
          
//           <input
//             type="text"
//             placeholder="Search..."
//             placeholderTextColor='red'
//             value={searchTerm}
//             onChange={handleChange}
//             style={{ width: '40%', height: '25px', borderRadius: '5px', borderColor: 'black' }}
//           />
//           <div>
//             {searchResults.map(item => (
//               <div onClick={() => handleAdd(item)} key={item.id}>
//                 {item.clientName}{' '}
//                 {/* <button onClick={() => handleAdd(item)}>Add</button> */}
//               </div>
//             ))}
//           </div>
        
//           <table className='client-table'>
//             <thead>
//               <tr>
//                 <th>Client Id</th>
//                 <th>Client Name</th>
//                 <th>Address</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedData.map((item,rowIndex) => (
//                 <tr key={rowIndex}>
//                   <td>{item.clientName}</td>
//                   <td>{item.clientId}</td>
//                   <td>{item.clientAddress}</td>
//                   <td>{item.clientEmail}</td>
//                   <td>
//                 {/* <button onClick={() => deleteRow(rowIndex)}>Delete</button> */}
//               </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={saveclientdetails}>Submit</button>
//         </div>
       
        
//       </div>
//     </div>
//   );
// };
const ClientListTable = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedData, setSelectedData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { uuid } = useParams();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getClientDetails');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    };

    fetchClientDetails();
    getClientDetails();
  }, []);

  const saveClientDetails = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/saveSelectedClients/${uuid}`, selectedData);
      if (response.status === 200) {
        console.log('Selected clients saved successfully');
      } else {
        console.error('Failed to save selected clients');
      }
    } catch (error) {
      console.error('Error saving clients:', error);
    }
  }

  const getClientDetails = async()=>{
    try{
      const response = await axios.get(`http://localhost:5000/getClientDetailsByEmployeeID/${uuid}`);
      setSelectedData(response.data.data)
      console.log('setselected data',setSelectedData)

    }catch(error){
      console.log('error getting client details ',error)
    }
  }
  const handleChange = event => {
    setSearchTerm(event.target.value);
    const results = clients.filter(item =>
      item.clientName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAdd = item => {
    setSelectedData([...selectedData, item]);
  };

  const handleDelete = async clientId => {
    // Remove the client from the selectedData state
    const updatedSelectedData = selectedData.filter(client => client.clientId !== clientId);
    setSelectedData(updatedSelectedData);
    
    // Delete the client from the database
    try {
      await axios.delete(`http://localhost:5000/deleteClientDetails/${clientId}`);
      console.log('Client deleted successfully from the database');
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className='Main-Container'>
      <div className='container' style={{ paddingBottom: '50px' }}>
        <h2>Client Details</h2>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            style={{ width: '40%', height: '25px', borderRadius: '5px', borderColor: 'black' }}
          />
          <div>
            {searchResults.map(item => (
              <div onClick={() => handleAdd(item)} key={item.clientId}>
                {item.clientName}
              </div>
            ))}
          </div>
          <table className='client-table'>
            <thead>
              <tr>
                <th>Client Id</th>
                <th>Client Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.clientId}</td>
                  <td>{item.clientName}</td>
                  <td>{item.clientAddress}</td>
                  <td>{item.clientEmail}</td>
                  <td>
                    <button onClick={() => handleDelete(item.clientId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={saveClientDetails}>Submit</button>
        </div>
      </div>
    </div>
  );
};


export default ClientListTable;
