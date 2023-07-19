import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "./taskcard.style";
import { COLORS, images } from "../../../constants";
import * as ImagePicker from "expo-image-picker";
import { requestMediaLibraryPermission } from "../../utils/utils";

// import { checkImageURL } from "../../../../utils";
const TaskCard = ({
  navigation,
  item,
  setSelectedTask,
  isParent,
  setShowSelectedTask,
}) => {
  const [iconName, setIconName] = useState("");
  const [src1, setSrc1] = useState(null);

  useEffect(() => {
    if (item.category === "Škola") {
      setIconName("graduation-cap");
    } else if (item.category === "Higijena") {
      setIconName("shower");
    } else if (item.category === "Kuća") {
      setIconName("home");
    }
    // requestMediaLibraryPermission();
    if (item.task_image) {
      const base64WithoutPrefix = item.task_image.substring(
        item.task_image.indexOf(",") + 1
      );
      setSrc1(
        `https://drive.google.com/uc?export=view&id=${base64WithoutPrefix}`
      );
    }
  }, []);

  const handleCardPress = (item) => {
    setSelectedTask(item.task_id);
    setShowSelectedTask(true);
    navigation.navigate("MyDrawer", {
      screen: "Odabrani zadatak",
      params: { data: item, isParent: isParent, src: src1 },
    });
  };
  return (
    <TouchableOpacity
      style={styles.container(item)}
      onPress={() => {
        handleCardPress(item);
      }}
    >
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => {
          handleCardPress(item);
        }}
      >
        <Image
          source={src1 ? { uri: src1 } : images.profile}
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
