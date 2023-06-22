import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { displayTime } from "./utils";
// import styles from "../important/importantaskcard.style";
import Control from "./Control";
import Constants from "expo-constants";

const Timer = ({ recording, stopRecording }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timerInterval;
    if (recording) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [recording]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [elapsedTime]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formattedTime}</Text>
      <TouchableOpacity onPress={stopRecording}>
        <Feather name="stop-circle" size={50} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};
export default Timer;
