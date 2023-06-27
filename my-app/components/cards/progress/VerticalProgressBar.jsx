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
  receivedData,
  setProgressValue,
  setPreviousProgressValue,
  isParent,
}) => {
  const containerColor = useSharedValue(
    item.done ? COLORS.mintGreen : "#ACAC9A"
  );
  const [iconColor, setIconColor] = useState(
    item.done ? COLORS.icon : "#474838"
  );
  const [fontWeight, setFontWeight] = useState(item.done ? 500 : 300);

  useEffect(() => {
    if (item.done) {
      containerColor.value = COLORS.mintGreen;
      setIconColor(COLORS.icon);
      setFontWeight(500);
    }
    const numItems = receivedData.subtasks.filter(
      (item) => item.done === true
    ).length;
    setProgressValue(numItems / receivedData.subtasks.length);
    setPreviousProgressValue((numItems - 1) / receivedData.subtasks.length);
  }, [item.done]);
  const handleClick = () => {
    if (!item.done && !isParent) {
      containerColor.value = COLORS.mintGreen; // Change the color when container is clicked
      setIconColor(COLORS.icon);
      setFontWeight(500);
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
          fontWeight: fontWeight,
        }}
      >
        {item.name}
      </Text>
      <TouchableOpacity onPress={handleClick}>
        <FontAwesome name="check-circle" size={50} color={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default VerticalProgressBar;
