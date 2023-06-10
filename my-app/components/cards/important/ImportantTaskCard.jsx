import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import styles from "./importantaskcard.style";
import { checkImageURL } from "../../../utils";
import { COLORS } from "../../../constants";

const ImportantTaskCard = ({ item, selectedTask, handleCardPress }) => {
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
      style={styles.container(selectedTask, item)}
      onPress={() => handleCardPress(item)}
    >
      {iconName === "graduation-cap" && (
        <FontAwesome
          name={iconName}
          size={40}
          color={COLORS.primary}
          style={{
            marginRight: 16,
          }}
        />
      )}
      {iconName === "home" && (
        <FontAwesome
          name={iconName}
          size={40}
          color={COLORS.primary}
          style={{
            marginRight: 16,
          }}
        />
      )}
      {iconName === "shower" && (
        <FontAwesome
          name={iconName}
          size={40}
          color={COLORS.primary}
          style={{
            marginRight: 16,
          }}
        />
      )}
      <TouchableOpacity
        style={styles.logoContainer(selectedTask, item)}
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={
            // {
            // uri: checkImageURL(item.employer_logo)
            //   ?
            item.employer_logo
            //   : "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
            //   }
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.task_name}
      </Text>
      {/* <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default ImportantTaskCard;
