import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
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
import { VerticalProgressBar, ModalPopup, DonutChart } from "../../components";
// import { styles } from "./selectedtaskcreen.style";
import { useRoute } from "@react-navigation/native";
import { FONT, SIZES, COLORS, images } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";

const SelectedTaskScreen = () => {
  const route = useRoute();
  const receivedData = route.params?.data;
  // const numItems = receivedData.subtasks.length(); // Number of progressBarItems
  const [visible, setVisible] = React.useState(false);
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
  const [progressValue, setProgressValue] = useState(0);

  // useEffect(() => {
  //   const numItems = receivedData.subtasks.filter(
  //     (item) => item.done === true
  //   ).length;
  //   setProgressValue((numItems + 1) / receivedData.subtasks.length);
  // }, [receivedData.subtasks]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.lavander, // Set your desired background color
      }}
    >
      <ModalPopup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
            >
              <Image
                source={images.logo2}
                style={{ height: 30, width: 30 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <DonutChart progress={progressValue} />
          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
          >
            Čestitamo, uradili ste podtask!
          </Text>
        </View>
      </ModalPopup>
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
        <Animated.View style={[styles.back(receivedData), backAnimatedStyle]}>
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
              <VerticalProgressBar
                item={subtask}
                setVisible={setVisible}
                visible={visible}
                receivedData={receivedData}
                setProgressValue={setProgressValue}
              />
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
  back: (item) => ({
    height: 200,
    width: 200,
    backgroundColor:
      item.task_type === "kuća"
        ? "#FBEA73"
        : item.task_type === "higijena"
        ? "#D4ADF8"
        : COLORS.lightWhite,
    borderRadius: 16,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.white,
  }),
  textBack: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },

  header: {
    width: "100%",
    height: 20,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
