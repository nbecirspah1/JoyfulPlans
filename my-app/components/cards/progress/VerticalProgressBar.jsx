import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SIZES, FONT, COLORS } from "../../../constants";
// import { AuthContext } from "../../../context/AuthContext";

const VerticalProgressBar = ({
  item,
  setVisible,
  receivedData,
  setProgressValue,
  setPreviousProgressValue,
  isParent,
  setSubtaskDone,
  setTaskDone,
}) => {
  // const { isLoading, setSubtaskDone } = useContext(AuthContext);

  const containerColor = useSharedValue(
    item.done ? COLORS.mintGreen : "#ACAC9A"
  );
  const [iconColor, setIconColor] = useState(
    item.done ? COLORS.icon : "#474838"
  );
  const [fontWeight, setFontWeight] = useState(300);

  useEffect(() => {
    if (item.done) {
      containerColor.value = COLORS.mintGreen;
      setIconColor(COLORS.icon);
    } else {
      containerColor.value = "#ACAC9A";
      setIconColor("#474838");
    }
    const numItems = receivedData.subtasks.filter(
      (item) => item.done === true
    ).length;
    setProgressValue(numItems / receivedData.subtasks.length);
    setPreviousProgressValue((numItems - 1) / receivedData.subtasks.length);
  }, [receivedData, item.done]);

  const handleClick = async () => {
    try {
      if (!item.done && !isParent) {
        containerColor.value = COLORS.mintGreen;
        setIconColor(COLORS.icon);
        setFontWeight(500);
        item.done = true;
        setVisible(true);
        await setSubtaskDone(item.subtask_id);
        console.log("Subtask marked as done successfully");
        const allItemsAreDone = receivedData.subtasks.every(
          (item) => item.done === true
        );
        if (allItemsAreDone) {
          console.log("SVI SU GOTOVIIIIII");
          await setTaskDone(receivedData.task_id);
          receivedData.done = true;
        }
      }
    } catch (error) {
      console.log(
        "Error marking subtask as done:",
        error.response?.data || error.message
      );
    }
  };

  // setTimeout(() => {
  //   setVisible(false);
  // }, 2000); // Adjust the delay time as needed (in milliseconds)
  // console.log("POSLIJEE 2", visible);
  // };

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
      <TouchableOpacity onPress={handleClick}>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="check-circle" size={30} color={iconColor} />

          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: 500,
              marginTop: 10,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: item.done ? 500 : 300,
              marginTop: 5,
            }}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default VerticalProgressBar;
