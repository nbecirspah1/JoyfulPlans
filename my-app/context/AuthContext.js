import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext } from "react";
import axios from 'axios';
import { BASE_URL } from "../config.js";
import { IsParentContext } from "../screens/loginandregister/IsParentContext.js";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isParent  } = useContext(IsParentContext);
  const login = (email, password) => {
    setIsLoading(true);

    axios.post(`${BASE_URL}/login`, {
      email,
      password
    })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };
  const loginChild = (code) => {
    setIsLoading(true);

    axios.post(`${BASE_URL}/loginChild`, {
      code
    })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios.post(`${BASE_URL}/logout`, { isParent: isParent }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  }
  
  return (
    <AuthContext.Provider value={{ isLoading, userInfo, login, logout, loginChild }}>
      {children}
    </AuthContext.Provider>
  );
};
