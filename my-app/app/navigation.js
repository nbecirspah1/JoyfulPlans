import { AuthProvider, AuthContext } from "../context/AuthContext";
import LoginRegister from "../screens/loginandregister/LoginRegister";
import { NavigationContainer } from "@react-navigation/native";
import React, {useState, useEffect, useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {ScreenHeaderBtn, CustomDrawer} from '../components'
import ShowSelectedTaskContext from './showSelectedTaskContext';
import SecondScreen from "../screens/SecondScreen/SecondScreen";
import Settings from "../screens/Settings/Settings";
import SelectedTaskScreen from "../screens/SelectedTaskScreen/SelectedTaskScreen"
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { IsParentContext } from "../screens/loginandregister/IsParentContext";
import AddTask from "../screens/addTask/addTask";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import {COLORS, images, icons} from "../constants"
import { useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

function MyDrawer() {
  const dimension = useWindowDimensions();
  const drawerType = dimension.width >= 700 ? 'permanent' : 'front';
  const [showSelectedTask, setShowSelectedTask] = React.useState(false);
  const navigation=useNavigation();
  const { isParent } = useContext(IsParentContext);

  return (
    <ShowSelectedTaskContext.Provider
    value={{ showSelectedTask, setShowSelectedTask }}
  >
    <Drawer.Navigator 
    drawerContent = {(props) => <CustomDrawer {...props} />}
    screenOptions={{
      drawerStyle: {
        backgroundColor: COLORS.lavander, //Set Drawer background
        width: 250, //Set Drawer width
      },
      headerStyle: {
        backgroundColor: COLORS.lavander, //Set Header color
      },
      headerTintColor: COLORS.primary, //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      drawerType: drawerType,
      drawerActiveTintColor: COLORS.primary,
      drawerInactiveTintColor: COLORS.primary,
    }}>
    
     <Drawer.Screen
  options={{
    drawerIcon: ({ color, size }) => (
      <Feather name="home" color={color} size={size} />
    ),
    headerStyle: { backgroundColor: COLORS.lavander },
    headerShadowVisible: false,
    // headerRight: () => (
    //   <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
    // ),
    headerTitle: '',
  }}
  name="HomeChild"
  component={SecondScreen}
/>

{
  isParent &&   <Drawer.Screen
  options={{
    drawerIcon: ({ color, size }) => (
      <Feather name="plus-square" color={color} size={size} />
    ),
    headerStyle: { backgroundColor: COLORS.lavander },
    headerShadowVisible: false,
    // headerRight: () => (
    //   <ScreenHeaderBtn onPress={saveToDatabase} dimensions="100%" />
    // ),
    headerTitle: '',
  }}
  name="Dodaj Zadatak"
  component={AddTask}
/>
}

 {showSelectedTask && <Drawer.Screen options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="bookmark" color={color} size={size} />
          ),
  headerStyle: {backgroundColor: COLORS.lavander},
  headerShadowVisible: false,
  // headerRight: () => (
  //     <ScreenHeaderBtn iconUrl={images.profile} dimensions = "100%"/>
  // ),
  headerTitle: ""}}
 name="SelectedTask" component={SelectedTaskScreen} />}


      <Drawer.Screen options={{
         drawerIcon: ({ color, size }) => (
          <Feather name="settings" color={color} size={size} />
        ),
  headerStyle: {backgroundColor: COLORS.lavander},
  headerShadowVisible: false,
  // headerRight: () => (
  //     <ScreenHeaderBtn iconUrl={images.profile} dimensions = "100%"/>
  // ),
  headerTitle: ""}}
 name="Settings" component={Settings} />
    </Drawer.Navigator>
    </ShowSelectedTaskContext.Provider>
 
  );
}
export default function Navigation() {
    const { userInfo } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(false);
    }, [userInfo]);
  
    if (isLoading) {
      // Add a loading indicator or skeleton screen while checking for access_token
      return null;
    }
  
    return (
      <NavigationContainer independent={true} >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
           {userInfo.token ? (   <Stack.Screen
              options={{ headerShown: false }}
              name="MyDrawer"
              component={MyDrawer}
            />):<Stack.Screen
            name="LoginRegister"
            component={LoginRegister}
            options={{ headerShown: false }}
          />}
            
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }




