import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Welcome, ImportantTasks, Tasks } from "../../components";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { COLORS, SIZES, images } from "../../constants";

const { height } = Dimensions.get("window");

export default function SecondScreen({ navigation }) {
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
          />
          <ImportantTasks
            navigation={navigation}
            activeTaskType2={activeTaskType2}
            setNumberOfImportantTasks={setNumberOfImportantTasks}
          />
          <Tasks
            navigation={navigation}
            activeTaskType2={activeTaskType2}
            setNumberOfTasks={setNumberOfTasks}
          />
        </View>
      </ScrollView>
    </View>
  );
}
