import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Welcome, ImportantTasks, Tasks } from "../../components";
import { View, ScrollView, SafeAreaView, Image } from "react-native";
import { COLORS, SIZES, images } from "../../constants";

export default function SecondScreen({ navigation }) {
  return (
    <ScrollView showVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
          backgroundColor: COLORS.lavander,
        }}
      >
        <Welcome />
        <ImportantTasks />
        <Tasks />
      </View>
    </ScrollView>
  );
}
