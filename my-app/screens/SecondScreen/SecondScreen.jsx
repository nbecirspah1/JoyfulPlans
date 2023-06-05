import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Welcome, ImportantTasks, Tasks } from "../../components";
import { View, ScrollView, SafeAreaView, Image } from "react-native";
import { COLORS, SIZES, images } from "../../constants";

export default function SecondScreen({ navigation }) {
  const [activeTaskType2, setActiveTaskType2] = useState("Sve");
  const [numberOfImportantTasks, setNumberOfImportantTasks] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  return (
    <ScrollView showVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
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
  );
}
