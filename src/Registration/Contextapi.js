
// import React, { createContext, useState } from 'react';
// import { useEffect } from 'react';
// import { Audio } from 'react-loader-spinner'

// const IdContext = createContext();

// const IdProvider = ({ children }) => {
  
//   const [userId, setUserId] = useState(null);
//   const [email, setEmail] = useState(null);
//   const[uuid,setuuid] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [data, setData] = useState([]);
//   useEffect(() => {
//     setTimeout(()=>{
//       setLoading(false);
//     },2000)
//   }, []);


//  // Load data from localStorage on component mount
//  useEffect(() => {
//   const storedUuid = localStorage.getItem('uuid');
//   if (storedUuid) {
//     setuuid(storedUuid);
//   }
// }, []);

// // Update localStorage whenever UUID changes
// useEffect(() => {
//   if (uuid) {
//     localStorage.setItem('uuid', uuid);
//   }
// }, [uuid]);

// console.log('uuid',uuid)

//   const updateUserId = (newId) => {
//     setUserId(newId);
//   };

//   const updateEmail = (newEmail) => {
//     setEmail(newEmail);
//   };

//   const updateuuid =(newuuid)=>{
//       setuuid(newuuid)
//   }
//   const updateContext = (newValues) => {
//     setUserId(newValues.userId || userId);
//     setEmail(newValues.email || email);
//     setuuid(newValues.uuid || uuid);
//   };


//   return (

//     <IdContext.Provider value={{ userId, updateUserId, email, updateEmail,uuid,updateuuid,updateContext, }}>
//       {loading?(<Audio type="Puff" height="80"
//   width="80"
//   radius="9"
//   color="green"
//   ariaLabel="loading"
//   wrapperStyle
//   wrapperClass />

//       ):(
//         <div>
//         {children}
//         </div>
//       )

//       }
     
      
//     </IdContext.Provider>
//   );
// };

// export { IdProvider, IdContext };



import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { ROLES } from './RoleBase/Roles';

const IdContext = createContext();

const IdProvider = ({ children }) => {
  
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const[uuid,setuuid] = useState(null);


 // Load data from localStorage on component mount
 useEffect(() => {
  const storedUuid = localStorage.getItem('uuid');
  if (storedUuid) {
    setuuid(storedUuid);
  }
}, []);

// Update localStorage whenever UUID changes
useEffect(() => {
  if (uuid) {
    localStorage.setItem('uuid', uuid);
  }
}, [uuid]);

  const updateUserId = (newId) => {
    setUserId(newId);
  };

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const updateuuid =(newuuid)=>{
      setuuid(newuuid)
  }
  const updateContext = (newValues) => {
    setUserId(newValues.userId || userId);
    setEmail(newValues.email || email);
    setuuid(newValues.uuid || uuid);
  };

  const [user, setUser] = useState(null);

  const login = (userData) => {
    
    setUser(userData);
  };

  const logout = () => {
    // Implement logout logic here (e.g., clear user data)
    setUser(null);
  };

  return (
    <IdContext.Provider value={{ userId, updateUserId, email, updateEmail,uuid,updateuuid,updateContext,user,login,logout }}>
      {children}
    </IdContext.Provider>
  );
};

export { IdProvider, IdContext };