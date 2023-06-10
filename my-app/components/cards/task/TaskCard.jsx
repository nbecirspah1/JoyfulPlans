import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import styles from "./taskcard.style";
import { COLORS } from "../../../constants";
// import { checkImageURL } from "../../../../utils";
const TaskCard = ({ item, task, handleCardPress }) => {
  const [iconName, setIconName] = useState("");

  useEffect(() => {
    if (item.task_type === "škola") {
      setIconName("graduation-cap");
    } else if (item.task_type === "higijena") {
      setIconName("shower");
    } else if (item.task_type === "kuća") {
      setIconName("home");
    }
  }, []);
  return (
    <TouchableOpacity
      style={styles.container(item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={
            item.employer_logo

            // {
            // uri: checkImageURL(task.employer_logo)
            // ? task.employer_logo
            // : "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
          }
          // }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {item.task_name}
        </Text>
        {/* <Text style={styles.jobType}>{task.job_employment_type}</Text> */}
        {iconName === "graduation-cap" && (
          <FontAwesome
            name={iconName}
            size={20}
            color={COLORS.primary}
            style={{
              marginRight: 1,
            }}
          />
        )}
        {iconName === "home" && (
          <FontAwesome
            name={iconName}
            size={20}
            color={COLORS.primary}
            style={{
              marginRight: 10,
            }}
          />
        )}
        {iconName === "shower" && (
          <FontAwesome
            name={iconName}
            size={20}
            color={COLORS.primary}
            style={{
              marginRight: 10,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
