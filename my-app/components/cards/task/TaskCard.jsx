import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./taskcard.style";
// import { checkImageURL } from "../../../../utils";
const TaskCard = ({ task, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={
            task.employer_logo

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
          {task.task_name}
        </Text>
        {/* <Text style={styles.jobType}>{task.job_employment_type}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
