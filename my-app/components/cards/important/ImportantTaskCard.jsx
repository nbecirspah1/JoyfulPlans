import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import styles from "./importantaskcard.style";
import { checkImageURL } from "../../../utils";
import { COLORS, images } from "../../../constants";
import * as ImagePicker from "expo-image-picker";
import { requestMediaLibraryPermission } from "../../utils/utils";
const ImportantTaskCard = ({
  navigation,
  isParent,
  item,
  selectedTask,
  setSelectedTask,
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
      screen: "SelectedTask",
      params: { data: item, isParent: isParent, src: src1 },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container(selectedTask, item)}
      onPress={() => {
        handleCardPress(item);
      }}
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
