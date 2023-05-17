import LoginRegister from "../screens/loginandregister/LoginRegister";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../screens/homescreen/HomeScreen";
import {ScreenHeaderBtn} from '../components'

import SecondScreen from "../screens/SecondScreen/SecondScreen";
const Stack = createNativeStackNavigator();
import {COLORS, images, icons} from "../constants"

export default function App() {
  return(
    <NavigationContainer independent={true}>
      <Stack.Navigator >
        <Stack.Screen 
          name="LoginRegister"
          component = {LoginRegister}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        options={{
            headerStyle: {backgroundColor: COLORS.lavander},
            headerShadowVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimensions = "60%"/>
            ),
            headerRight: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimensions = "100%"/>
            ),
            headerTitle: ""}}
          name="Home"
          component={SecondScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}