import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SIZES, FONT, COLORS } from "../../../constants";

const VerticalProgressBar = ({
  item,
  setVisible,
  visible,
  receivedData,
  setProgressValue,
}) => {
  const containerColor = useSharedValue(
    item.done ? COLORS.mintGreen : "lightgray"
  );
  const [iconColor, setIconColor] = useState(item.done ? "green" : "gray");
  // useEffect(() => {
  //   const numItems = receivedData.subtasks.filter(
  //     (item) => item.done === true
  //   ).length;
  //   setProgressValue((numItems + 1) / receivedData.subtasks.length);
  // }, [receivedData.subtasks]);

  useEffect(() => {
    if (item.done) {
      containerColor.value = COLORS.mintGreen;
      setIconColor("green");
    }
    const numItems = receivedData.subtasks.filter(
      (item) => item.done === true
    ).length;
    setProgressValue(numItems / receivedData.subtasks.length);
  }, [item.done]);
  const handleClick = () => {
    if (!item.done) {
      containerColor.value = COLORS.mintGreen; // Change the color when container is clicked
      setIconColor("green");

      item.done = true;
      setVisible(true);
    }

    // setTimeout(() => {
    //   setVisible(false);
    // }, 2000); // Adjust the delay time as needed (in milliseconds)
    // console.log("POSLIJEE 2", visible);
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: containerColor.value,
      // Create a linear gradient for the background color
      backgroundImage: `linear-gradient(to top, ${containerColor.value}, transparent)`,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: 200,
          height: 150,
          borderRadius: 10,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 20,
        },
        containerStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {item.task_name}
      </Text>
      <TouchableOpacity onPress={handleClick}>
        <FontAwesome name="check-circle" size={50} color={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default VerticalProgressBar;
