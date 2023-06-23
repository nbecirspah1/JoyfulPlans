import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./screenheaderbtn.style";
import { COLORS } from "../../constants";

const ScreenHeaderBtn = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Ionicons
        name={"save-outline"}
        size={30}
        color={COLORS.primary}
        // style={{ paddingRight: 10 }}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
