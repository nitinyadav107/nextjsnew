"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from './userContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [signup,setSignup] = useState(false);
  const [Logout,setLogout] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/current");
        setUser(response.data?.user); 
        console.log("User fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(undefined);
      }
    };

    fetchUser();
  }, [signup, Logout]);

  return (
    <UserContext.Provider value={{ user, setUser,setSignup,setLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
