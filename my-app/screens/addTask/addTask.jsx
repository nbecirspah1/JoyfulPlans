import React, { useState, useRef, useEffect, StyleSheet } from "react";
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
  PermissionsAndroid,
  Button,
  PanResponder,
  TouchableHighlight,
} from "react-native";
import styles from "./addtask.style";
import { SIZES, COLORS, images } from "../../constants";
import { AddSubtask, ModalPopup } from "../../components";
import { Feather, Foundation, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import animationData from "../../assets/animations/recording2.json";
import stopSoundFile from "../../assets/animations/stopSound.mp3";
import { displayTime } from "../../components/cards/timer/utils";
const { height, width } = Dimensions.get("window");
import * as Progress from "react-native-progress";
const AddTask = () => {
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
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState(null);
  const scrollViewRef = useRef(null);
  const [subtasks, setSubtasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(undefined);
  const [playingSound, setPlayingSound] = useState(true);
  const [timer, setTimer] = useState(0);
  const [soundTimer, setSoundTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null); // Interval ID
  const [soundIntervalId, setSoundIntervalId] = useState(null);

  useEffect(() => {
    if (timer === soundTimer) {
      stopSound();
    }
  }, [timer, soundTimer]);
  async function startRecording() {
    try {
      console.log("Request submission...");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Start recording...");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      // Play sound effect
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/animations/startSound.mp3")
      );
      await sound.playAsync();

      await recording.startAsync();
      setTimer(0);
      setRecording(recording);
      console.log("Recording started");
      setRecordingStopped(false);
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalId(id);
    } catch (err) {
      console.log("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording...");
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Recording stopped and stored at", uri);
        const { sound } = await recording.createNewLoadedSoundAsync();
        const { sound: stopSound } = await Audio.Sound.createAsync(
          stopSoundFile
        );
        setRecording(undefined);
        setSound(sound);
        clearInterval(intervalId);
        // Play stop sound effect
        await stopSound.playAsync();
        console.log("Stop sound played");
        setRecordingStopped(true);
        setPlayingSound(true);
      } else {
        console.log("No recording to stop.");
      }
    } catch (err) {
      console.log("Failed to stop recording", err);
    }
  }
  const playSound = async () => {
    try {
      await sound.playAsync();
      console.log("Playing sound");
      setSoundTimer(0);
      const idSound = setInterval(() => {
        setSoundTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setSoundIntervalId(idSound);
      setPlayingSound(false);
      if (timer === soundTimer) {
        clearInterval(soundIntervalId);
      }
    } catch (err) {
      console.error("Failed to play sound", err);
    }
  };

  const stopSound = async () => {
    try {
      await sound.stopAsync();
      console.log("Sound stopped");
      setPlayingSound(true);
      clearInterval(soundIntervalId);
    } catch (err) {
      console.error("Failed to stop sound", err);
    }
  };

  const saveToDatabase = () => {
    console.log("s tijelom mi se nesto desava!");
  };

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
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            minHeight: height,
            backgroundColor: COLORS.lavander,
            padding: SIZES.padding,
          }}
        >
          <ModalPopup visible={visible}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  stopRecording();
                  setVisible(false);
                }}
              >
                <Image
                  source={images.logo2}
                  style={{ height: 30, width: 30 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: 500,
                  marginTop: 20,
                  marginBottom: 5,
                  color: COLORS.primary,
                  fontSize: 20,
                }}
              >
                {recording ? "Zaustavite snimanje" : "Započnite snimanje"}
              </Text>
              {!recordingStopped && (
                <Text style={styles.timer}>{displayTime(timer)}</Text>
              )}

              <View style={[styles.rowContainerAudio]}>
                <TouchableOpacity
                  onPressIn={startRecording}
                  onPressOut={stopRecording}
                >
                  <Ionicons
                    name={"md-mic-circle"}
                    size={60}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                {!recording && (
                  <LottieView
                    source={animationData}
                    style={{ width: 50, height: 50 }}
                  />
                )}
                {recording && (
                  <LottieView
                    source={animationData}
                    autoPlay
                    loop
                    style={{ width: 60, height: 60 }}
                  />
                )}
              </View>
            </View>
            {/* <Button title="Play Sound" onPress={playSound} />
            <Button title="Stop Sound" onPress={stopSound} /> */}
            {recordingStopped && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity>
                  <Ionicons
                    name={playingSound ? "play-circle" : "stop-circle"}
                    size={50}
                    color={COLORS.primary}
                    onPress={playingSound ? playSound : stopSound}
                  />
                </TouchableOpacity>

                <View>
                  <Progress.Bar
                    progress={parseFloat(soundTimer) / timer}
                    color={COLORS.icon}
                    borderWidth={0}
                    height={10}
                    width={200}
                    unfilledColor={COLORS.gray}
                  />
                  <View style={styles.rowContainer}>
                    <Text style={[styles.timer, { marginRight: 120 }]}>
                      {displayTime(timer)}
                    </Text>
                    <Text style={styles.timer}>{displayTime(soundTimer)} </Text>
                  </View>
                </View>
              </View>
            )}
          </ModalPopup>

          <View style={styles.rowContainer}>
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
          {/* <Button
            title={recording ? "Stop recording" : "Start recording"}
            */}

          <Text
            style={{
              fontWeight: 500,
              marginTop: 20,
              marginBottom: 5,
              color: COLORS.primary,
              fontSize: 20,
            }}
          >
            Kreirajte audio zapis:
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ alignContent: "center" }}
              onPress={() => {
                setVisible(true);
              }}
            >
              <Ionicons name="mic-circle" size={70} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.rowContainerNaslov}>
            <TouchableOpacity
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Feather
                name={recording ? "stop-circle" : "play-circle"}
                size={50}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            {!recording && (
              <LottieView
                source={animationData}
                style={{ width: 60, height: 60 }}
              />
            )}
            {recording && (
              <LottieView
                source={animationData}
                autoPlay
                loop
                style={{ width: 60, height: 60 }}
              />
            )}
          </View> */}
          <AddSubtask subtasks={subtasks} setSubtasks={setSubtasks} />
          <TouchableOpacity onPress={saveToDatabase}>
            <View
              style={{
                marginHorizontal: 50,
                marginVertical: 10,
                backgroundColor: COLORS.lightWhite,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons
                name={"save-outline"}
                size={30}
                color={COLORS.primary}
                style={{ paddingRight: 10 }}
              />
              <Text style={{ color: COLORS.primary, fontWeight: "500" }}>
                Spremite zadatak
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddTask;
