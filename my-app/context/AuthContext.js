import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext } from "react";
import axios from 'axios';
import { BASE_URL } from "../config.js";
import { IsParentContext } from "../screens/loginandregister/IsParentContext.js";
export const AuthContext = createContext();
import * as FileSystem from 'expo-file-system';
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isParent  } = useContext(IsParentContext);
  const [tasks, setTasks] = useState([]);
  const [subtasks, setSubtasks] = useState([]);

  const login = async (email, password) => {
    setIsLoading(true);
    try{
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password
    })
      
        let userInfo = response.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
  
  }catch(e){
        console.log(`login error ${e}`);
        setIsLoading(false);
      };
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
      console.log("OVO JE SLIKAAA", task.task_image)
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
    if(task.subtasks.length != 0){

    const subtasksResponse = await axios.post(`${BASE_URL}/addSubtasks/${taskID}`, task.subtasks, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    });
   
  }
    // ...
    
    if (task.audio) {

        const audioUri = task.audio;
      
        // const audioContent = await FileSystem.readAsStringAsync(audioUri, {
        //   encoding: FileSystem.EncodingType.Base64,
        // });
    
        // const audioBlob = new Blob([audioContent], { type: 'audio/3gp' });
        // const audioFile = new File([audioBlob], new Date() + '_audio.3gp');

        
        const formData1 = new FormData();
        // formData1.append('audio', audioFile);
        formData1.append('audio', {
          name: new Date() + "_task",
          uri: task.audio,
          type: 'audio/3gp', 
        });
    
        const imageResponse = await axios.post(
          `${BASE_URL}/uploadTaskAudio/${taskID}`,
          formData1,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
    
        console.log('Audio uploaded successfully!', imageResponse.data);
     
    }
    
    
    setIsLoading(false);
    getTasks()
    return true;
  } catch (error) {
    console.error("Error adding task:", error);
    setIsLoading(false);
    return false;
  }
}

const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
      params: {
        isParent: isParent
      }
    });
    console.log(response.data)
    setTasks(response.data)
    return response.data; // Handle the response data as per your requirement

  } catch (error) {
    console.log(error.response.data); // Handle any error that occurs during the request
  }
};

const getSubtasks = async(taskId) =>{
  try {
    const response = await axios.get(`${BASE_URL}/subtasks/${taskId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data)
    setSubtasks(response.data)
    return response.data; // Handle the response data as per your requirement

  } catch (error) {
    console.log(error.response.data); // Handle any error that occurs during the request
  }
}
  
  return (
    <AuthContext.Provider value={{ isLoading, userInfo, isParent, login, logout, loginChild, uploadProfileImageChild,uploadProfileImageParent, addTask, getTasks, tasks, getSubtasks, subtasks }}>
      {children}
    </AuthContext.Provider>
  );
};
