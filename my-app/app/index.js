import { AuthProvider, AuthContext } from "../context/AuthContext";
import Navigation from './navigation.js'
import React, {useState, useEffect, useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {  IsParentProvider } from "../screens/loginandregister/IsParentContext";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  return(
    <IsParentProvider>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </IsParentProvider>

  )
}




