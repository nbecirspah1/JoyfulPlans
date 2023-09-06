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
import { IsParentContext } from "../loginandregister/IsParentContext";
import { requestMediaLibraryPermission } from "../../components/utils/utils";
const { height } = Dimensions.get("window");

export default function SecondScreen() {
  isParent = useContext(IsParentContext);
  const navigation = useNavigation();
  // const route = useRoute();
  // const data = route.params?.data;
  const [showSelectedTask, setShowSelectedTask] = React.useState(false);
  const { isLoading, userInfo, getTasks, tasks } = useContext(AuthContext);
  let importantTasks = tasks.filter(
    (task) => task.important === true && task.done === false
  );
  let unimportantTasks = tasks.filter(
    (task) => task.important === false && task.done === false
  );

  const [activeTaskType2, setActiveTaskType2] = useState("Sve");
  const [numberOfImportantTasks, setNumberOfImportantTasks] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(0);

  useEffect(() => {
    requestMediaLibraryPermission();
    getTasks();
  }, []);
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
            // userInfo={userInfo}
            data={importantTasks}
          />
          <Tasks
            isParent={isParent}
            navigation={navigation}
            activeTaskType2={activeTaskType2}
            setNumberOfTasks={setNumberOfTasks}
            userInfo={userInfo}
            data={unimportantTasks}
          />
        </View>
      </ScrollView>
    </View>
  );
}
