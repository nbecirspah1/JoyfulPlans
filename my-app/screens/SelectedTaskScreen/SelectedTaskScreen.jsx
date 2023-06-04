import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  runOnUI,
} from "react-native-reanimated";
import { VerticalProgressBar } from "../../components";
// import { styles } from "./selectedtaskcreen.style";
import { useRoute } from "@react-navigation/native";
import { FONT, SIZES, COLORS } from "../../constants";

const SelectedTaskScreen = () => {
  const route = useRoute();
  const receivedData = route.params?.data;
  console.log("RECEIVEEED DATAAA", receivedData);
  // const numItems = receivedData.subtasks.length(); // Number of progressBarItems

  const spin = useSharedValue(0);
  const handleImagePress = () => {
    spin.value = spin.value ? 0 : 1;
  };
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);
  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.lavander, // Set your desired background color
      }}
    >
      <Text
        style={{
          fontFamily: FONT.regular,
          fontSize: SIZES.h1,
          color: COLORS.primary,
          marginBottom: 30,
        }}
      >
        {receivedData.task_name}
      </Text>
      <TouchableOpacity
        onPress={handleImagePress}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View style={[styles.front, frontAnimatedStyle]}>
          <Image
            source={receivedData.employer_logo}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View style={[styles.back, backAnimatedStyle]}>
          <Text style={styles.textBack}>{receivedData.description}</Text>
        </Animated.View>
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {receivedData.subtasks.map((subtask, index) => (
            <View key={index}>
              {/* <Text style={{ width: 100, alignSelf: "center" }}>
                {subtask.task_name}
              </Text> */}
              <VerticalProgressBar item={subtask} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectedTaskScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  front: {
    height: 200,
    width: 200,
    backgroundColor: "#D8D9CF",
    borderRadius: 16,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    height: 200,
    width: 200,
    backgroundColor: "#9B8FFF",
    borderRadius: 16,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textBack: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
});
