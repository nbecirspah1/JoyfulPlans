import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "../addSubtask/addsubtask.style";
import { COLORS, SIZES } from "../../../constants";
const AddSubtask = ({ item }) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.lightWhite,
        padding: 20,
        borderRadius: SIZES.small,
        marginTop: 5,
        flex: 1,
      }}
      onPress={() => {
        setDescriptionVisible(!descriptionVisible);
      }}
    >
      <Text
        style={{
          flex: 1,
          fontWeight: 500,
          color: COLORS.primary,
          fontSize: 15,
        }}
      >
        {item.task_name}
      </Text>
      {descriptionVisible && (
        <Text
          style={{
            flex: 1,
            color: COLORS.primary,
            marginTop: 10,
          }}
        >
          {item.description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AddSubtask;
