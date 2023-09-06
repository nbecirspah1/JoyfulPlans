import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { COLORS } from "../../constants";
import { requestAudioPermission } from "../utils/utils";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";
import { displayTime } from "../cards/timer/utils";
import styles from "../../screens/addTask/addtask.style";

const AudioTask = ({ task_audio, audio_duration }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundTimer, setSoundTimer] = useState(0);
  const [soundIntervalId, setSoundIntervalId] = useState(null);

  useEffect(() => {
    if (audio_duration === soundTimer) {
      stopSound();
    }
  }, [audio_duration, soundTimer]);

  const playSound = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}audio.mp3`;
      await FileSystem.downloadAsync(
        `https://drive.google.com/uc?export=view&id=${task_audio}`,
        fileUri
      );

      const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
      setSound(sound);

      await sound.playAsync();
      setIsPlaying(true);
      setSoundTimer(0);
      const idSound = setInterval(() => {
        setSoundTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setSoundIntervalId(idSound);
      if (audio_duration === soundTimer) {
        clearInterval(soundIntervalId);
      }
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Failed to play sound", error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        console.log("Sound stopped");
      }
      setIsPlaying(false);
      clearInterval(soundIntervalId);
    } catch (error) {
      console.error("Failed to stop sound", error);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        padding: 10,
        borderRadius: 20,
      }}
    >
      <TouchableOpacity onPress={isPlaying ? stopSound : playSound}>
        <Ionicons
          name={isPlaying ? "stop-circle" : "play-circle"}
          size={50}
          color={COLORS.primary}
        />
      </TouchableOpacity>

      <View style={{ justifyContent: "space-between" }}>
        <Progress.Bar
          progress={parseFloat(soundTimer) / audio_duration}
          color={COLORS.icon}
          borderWidth={0}
          height={10}
          width={Dimensions.get("window").width - 100}
          unfilledColor={COLORS.gray}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.timer}>{displayTime(soundTimer)}</Text>
          <View style={{ flex: 1 }} />
          <Text style={[styles.timer, { alignSelf: "flex-end" }]}>
            {displayTime(audio_duration)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AudioTask;
