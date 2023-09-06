import { AuthProvider, AuthContext } from "../context/AuthContext";
import Navigation from './navigation.js'
import React from "react";
import {  IsParentProvider } from "../screens/loginandregister/IsParentContext";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {

  return(
    <IsParentProvider >
      <AuthProvider >
        <Navigation />
      </AuthProvider>
    </IsParentProvider>
  )
}




