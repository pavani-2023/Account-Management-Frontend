import React, { createContext, useState } from 'react';
import { useEffect } from 'react';


const IdContext = createContext();

const IdProvider = ({ children }) => {
  
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const[uuid,setuuid] = useState(null);


 useEffect(() => {
  const storedUuid = localStorage.getItem('uuid');
  if (storedUuid) {
    setuuid(storedUuid);
  }
}, []);

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
    
    setUser(null);
  };

  return (
    <IdContext.Provider value={{ userId, updateUserId, email, updateEmail,uuid,updateuuid,updateContext,user,login,logout }}>
      {children}
    </IdContext.Provider>
  );
};

export { IdProvider, IdContext };