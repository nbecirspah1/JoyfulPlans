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
import styles from "./addsubtask.style";
import { COLORS, SIZES } from "../../../constants";
import { SubtaskCard } from "../..";
// import { checkImageURL } from "../../../../utils";
const AddSubtask = ({ subtasks, setSubtasks }) => {
  const [description, setDescription] = useState(null);
  const [task_name, setTask_name] = useState(null);
  const [visible, setVisible] = useState(false);
  const textInputRef = useRef(null);
  const [subtaskId, setSubTaskId] = useState(0);
  const addItem = () => {
    const updatedArray = [
      ...subtasks,
      {
        id: subtaskId,
        task_name: task_name,
        description: description,
        done: false,
      },
    ];
    setSubtasks(updatedArray);
    setVisible(false);
    setTask_name("");
    setDescription("");
    setSubTaskId(subtaskId + 1);
  };

  const handleContentSizeChange = () => {
    if (textInputRef.current) {
      const { height } = textInputRef.current.contentSize();
      textInputRef.current.setNativeProps({ height });
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: 20,
          borderRadius: SIZES.small,
        }}
        onPress={() => {
          setVisible(!visible);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // Align items along the horizontal axis
          }}
        >
          <Text
            style={{
              flex: 1,
              fontWeight: 500,
              color: COLORS.primary,
              fontSize: 20,
            }}
          >
            Dodaj podzadatak
          </Text>
          <Feather name="plus-circle" size={30} color={COLORS.primary} />
        </View>
        {/* <Text
        style={{
          fontWeight: 500,
          marginTop: 20,
          marginBottom: 5,
          color: COLORS.primary,
          fontSize: 20,
        }}
      >
        Opis zadatka:
      </Text> */}
        {visible && (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <View style={styles.rowContainer}>
              <TextInput
                placeholder="Naslov"
                placeholderTextColor={COLORS.secondary}
                style={styles.descriptionInput}
                value={task_name}
                onChangeText={(text) => {
                  setTask_name(text);
                }}
                multiline={true} // Enable multiline input
                onContentSizeChange={handleContentSizeChange}
              />
              <Feather
                name="edit"
                size={20}
                color={COLORS.primary}
                style={styles.icon}
              />
            </View>
            <View style={styles.rowContainer}>
              <TextInput
                placeholder="Opis"
                placeholderTextColor={COLORS.secondary}
                style={styles.descriptionInput}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
                multiline={true} // Enable multiline input
                onContentSizeChange={handleContentSizeChange}
              />
              <Feather
                name="edit"
                size={20}
                color={COLORS.primary}
                style={styles.icon}
              />
            </View>
            <TouchableOpacity onPress={addItem}>
              <View
                style={{
                  marginHorizontal: 50,
                  marginVertical: 10,
                  backgroundColor: COLORS.lightWhite,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: COLORS.primary }}>Spremi</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <FlatList
        data={subtasks}
        renderItem={({ item, index }) => {
          return <SubtaskCard item={item} />;
        }}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        vertical
      />
    </View>
  );
};

export default AddSubtask;
