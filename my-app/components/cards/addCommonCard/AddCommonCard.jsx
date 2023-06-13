import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./addcommoncard.style";
import animationData from "../../../assets/animations/addIcon.json";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const AddCommonCard = ({ handleAddPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleAddPress()}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => handleAddPress()}
      >
        <Ionicons
          name="add-circle"
          size={50}
          color="#474838"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.textContainer} numberOfLines={1}>
        Dodaj zadatak
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

export default AddCommonCard;
