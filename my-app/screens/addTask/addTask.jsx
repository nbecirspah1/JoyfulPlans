import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
  Switch,
} from "react-native";
import styles from "./addtask.style";
import { SIZES, COLORS, images } from "../../constants";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const AddTask = () => {
  const { height, width } = Dimensions.get("window");
  const [task_name, setTask_name] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState("Datum");
  const textInputRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const taskTypes = ["Kuća", "Škola", "Higijena"];
  const [activeTaskType, setActiveTaskType] = useState(null);
  const [pic, setPic] = useState(null);
  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera roll is required!"
      );
    }
  };

  const uploadImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setPic(pickerResult.uri);
      setShowAlert(true);
    }
  };

  const toggleSwitch = () => {
    setIsImportant((previousState) => !previousState);
  };
  const handleContentSizeChange = () => {
    if (textInputRef.current) {
      const { height } = textInputRef.current.contentSize();
      textInputRef.current.setNativeProps({ height });
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setInputDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{}}
      >
        <View
          style={{
            flex: 1,
            minHeight: height,
            padding: SIZES.xSmall,
            backgroundColor: COLORS.lavander,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            padding: SIZES.padding,
          }}
        >
          {/* <Text style={styles.label}>Task:</Text> */}
          <View style={styles.rowContainerNaslov}>
            <TouchableOpacity onPress={uploadImage}>
              {!pic && (
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderColor: COLORS.primary,
                    borderWidth: 2,
                    marginRight: 10,
                    resizeMode: "contain",
                  }}
                  source={images.addPhoto}
                />
              )}

              {pic && (
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderColor: COLORS.primary,
                    borderWidth: 2,
                    marginRight: 10,
                    resizeMode: "contain",
                  }}
                  source={{ uri: pic }}
                />
              )}
            </TouchableOpacity>
            <TextInput
              placeholder="Naslov zadatka"
              placeholderTextColor={COLORS.secondary}
              style={styles.textInput}
              value={task_name}
              onChangeText={(text) => {
                setTask_name(text);
              }}
              multiline={true} // Enable multiline input
              numberOfLines={1} // Set the initial number of lines
              maxLength={200} // Optionally limit the number of characters
            />
            <Feather
              name="edit"
              size={30}
              color={COLORS.primary}
              style={styles.icon}
            />
          </View>
          <Text
            style={{
              fontWeight: 500,
              marginTop: 20,
              marginBottom: 5,
              color: COLORS.primary,
              fontSize: 20,
            }}
          >
            Opis zadatka:
          </Text>
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

          <Text
            style={{
              fontWeight: 500,
              marginTop: 20,
              marginBottom: 5,
              color: COLORS.primary,
              fontSize: 20,
            }}
          >
            Uraditi zadatak do:
          </Text>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )}
          <View style={styles.rowContainer}>
            {!showPicker && (
              <Pressable
                style={styles.descriptionInput}
                onPress={toggleDatePicker}
              >
                <TextInput
                  placeholder={inputDate}
                  placeholderTextColor={COLORS.secondary}
                  editable={false}
                />
              </Pressable>
            )}
            <Feather
              name="edit"
              size={20}
              color={COLORS.primary}
              style={styles.icon}
            />
          </View>

          <Text
            style={{
              fontWeight: 500,
              marginTop: 20,
              marginBottom: 5,
              color: COLORS.primary,
              fontSize: 20,
            }}
          >
            Odaberite kategoriju:
          </Text>
          <View style={styles.tabsContainer}>
            <FlatList
              data={taskTypes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tab(activeTaskType, item)}
                  onPress={() => {
                    setActiveTaskType(item);
                    // router.push(`/search/${item}`);
                  }}
                >
                  <Text style={styles.tabText(activeTaskType, item)}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              contentContainerStyle={{ columnGap: SIZES.small }}
              horizontal
            />
          </View>

          <View style={styles.rowContainer}>
            <Text
              style={{
                fontWeight: 500,
                marginTop: 20,
                marginBottom: 5,
                color: COLORS.primary,
                fontSize: 20,
              }}
            >
              Označite zadatak kao "važan"
            </Text>
            <Switch
              trackColor={{ false: "grey", true: COLORS.icon }}
              thumbColor={isImportant ? "#f4f3f4" : "#f4f3f4"}
              style={{
                marginTop: 20,
                marginLeft: 10,
              }}
              onValueChange={toggleSwitch}
              value={isImportant}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddTask;
