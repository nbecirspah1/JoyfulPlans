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

const uploadProfileImageChild = async (imageUri) => {
  try {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + "_profile",
      uri: imageUri,
      type: 'image/jpeg', 
    });

    const response = await axios.post(`${BASE_URL}/uploadChild`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      }
    });
    setIsLoading(false)
    console.log("Profile image uploaded successfully!", response.data);
    // Perform any necessary actions after the image upload
    // ...

  } catch (error) {
    console.error("Error uploading profile image:", error);
    // Handle upload error
    // ...
  }
};

const uploadProfileImageParent = async (imageUri) => {
  try {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + "_profile",
      uri: imageUri,
      type: 'image/jpeg', 
    });

    const response = await axios.post(`${BASE_URL}/uploadParent`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      }
    });
    setIsLoading(false)
    console.log("Profile image uploaded successfully!", response.data);
    // Perform any necessary actions after the image upload
    // ...

  } catch (error) {
    console.error("Error uploading profile image:", error);
    // Handle upload error
    // ...
  }
};

const addTask = async (task) => {
  try {
    setIsLoading(true);
    
    const taskResponse = await axios.post(`${BASE_URL}/addTask`, task, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    });

    const taskID = taskResponse.data.task_id;
    console.log('Inserted task ID:', taskID);

    console.log("Task added successfully!", taskResponse.data);
    
    if (task.task_image) {
      const formData = new FormData();
      formData.append('task', {
        name: new Date() + "_task",
        uri: task.task_image,
        type: 'image/jpeg', 
      });

      const imageResponse = await axios.post(`${BASE_URL}/uploadTaskImage/${taskID}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        }
      });
    
      console.log("Profile image uploaded successfully!", imageResponse.data);
    }

    const subtasksResponse = await axios.post(`${BASE_URL}/addSubtasks/${taskID}`, task.subtasks, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    });

    setIsLoading(false);
    return true;
  } catch (error) {
    console.error("Error adding task:", error);
    setIsLoading(false);
    return false;
  }
}

  
  
  return (
    <AuthContext.Provider value={{ isLoading, userInfo, isParent, login, logout, loginChild, uploadProfileImageChild,uploadProfileImageParent, addTask }}>
      {children}
    </AuthContext.Provider>
  );
};
