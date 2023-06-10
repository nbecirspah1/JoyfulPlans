import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  runOnUI,
} from "react-native-reanimated";
import { VerticalProgressBar } from "../../components";
// import { styles } from "./selectedtaskcreen.style";
import { useRoute } from "@react-navigation/native";
import { FONT, SIZES, COLORS, images } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";

const ModalPopup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useSharedValue(0);

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      scaleValue.value = withSpring(1, { useNativeDriver: true });
    } else {
      setTimeout(() => setShowModal(false), 200);
      scaleValue.value = withSpring(0, { useNativeDriver: true });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalPopup;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
