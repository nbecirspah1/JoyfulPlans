import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./importantaskcard.style";
import { checkImageURL } from "../../../utils";

const ImportantTaskCard = ({ item, selectedTask, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedTask, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedTask, item)}>
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
