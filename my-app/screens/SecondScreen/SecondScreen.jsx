import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { Welcome, ImportantTasks, Tasks } from "../../components";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { COLORS, SIZES, images } from "../../constants";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { isParent } from "../loginandregister/IsParentContext";

const { height } = Dimensions.get("window");

export default function SecondScreen() {
  const navigation = useNavigation();
  // const route = useRoute();
  // const data = route.params?.data;
  const [showSelectedTask, setShowSelectedTask] = React.useState(false);
  const { userInfo } = useContext(AuthContext);
  // console.log("Received data:", data);

  const [activeTaskType2, setActiveTaskType2] = useState("Sve");
  const [numberOfImportantTasks, setNumberOfImportantTasks] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            minHeight: height,
            padding: SIZES.medium,
            backgroundColor: COLORS.lavander,
          }}
        >
          <Welcome
            setActiveTaskType2={setActiveTaskType2}
            numberOfImportantTasks={numberOfImportantTasks}
            numberOfTasks={numberOfTasks}
            userInfo={userInfo}
          />
          <ImportantTasks
            isParent={isParent}
            navigation={navigation}
            activeTaskType2={activeTaskType2}
            setNumberOfImportantTasks={setNumberOfImportantTasks}
            userInfo={userInfo}
          />
          <Tasks
            isParent={isParent}
            navigation={navigation}
            activeTaskType2={activeTaskType2}
            setNumberOfTasks={setNumberOfTasks}
            userInfo={userInfo}
          />
        </View>
      </ScrollView>
    </View>
  );
}
