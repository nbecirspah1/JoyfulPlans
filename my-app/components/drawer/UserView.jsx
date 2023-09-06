import React, { useState, useEffect, useContext } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { Title, Caption } from "react-native-paper";
import { images, COLORS } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { Feather, FontAwesome } from "@expo/vector-icons";

const UserView = () => {
  const [pic, setPic] = useState(null);
  const {
    userInfo,
    isLoading,
    isParent,
    uploadProfileImageChild,
    uploadProfileImageParent,
  } = useContext(AuthContext);
  const [src, setSrc] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  useEffect(() => {
    requestMediaLibraryPermission();
    if (userInfo.user.profile_image) {
      const base64WithoutPrefix = userInfo.user.profile_image.substring(
        userInfo.user.profile_image.indexOf(",") + 1
      );
      setSrc(
        `https://drive.google.com/uc?export=view&id=${base64WithoutPrefix}`
      );
    }
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

  return (
    <View
      style={{
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <Spinner visible={isLoading} />
      <TouchableOpacity onPress={uploadImage}>
        {!pic && (
          <Image
            source={src ? { uri: src } : images.profile}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderColor: COLORS.primary,
              borderWidth: 2,
              marginBottom: 10,
              resizeMode: "contain",
            }}
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
              marginBottom: 10,
              resizeMode: "contain",
            }}
            source={{ uri: pic }}
          />
        )}
      </TouchableOpacity>
      {pic &&
        !isParent &&
        showAlert &&
        Alert.alert(
          "Sačuvaj promjene",
          "Da li želite sačuvati izmjene koje ste napravili?",
          [
            {
              text: "DA",
              onPress: () => {
                setShowAlert(false);
                uploadProfileImageChild(pic);
              },
            },
            {
              text: "NE",
              onPress: () => {
                setPic(false);
                setShowAlert(false);
              },
            },
          ]
        )}

      {pic &&
        isParent &&
        showAlert &&
        Alert.alert(
          "Sačuvaj promjene",
          "Da li želite sačuvati izmjene koje ste napravili?",
          [
            {
              text: "DA",
              onPress: () => {
                setShowAlert(false);
                uploadProfileImageParent(pic);
              },
            },
            {
              text: "NE",
              onPress: () => {
                setPic(false);
                setShowAlert(false);
              },
            },
          ]
        )}

      <Title style={{ color: COLORS.primary }}>{userInfo.user.name}</Title>
      <TouchableOpacity onPress={uploadImage}>
        <Caption>
          Promijeni profilnu sliku{" "}
          <Feather
            name="edit"
            size={15}
            style={{
              marginRight: 16,
            }}
          />
        </Caption>
      </TouchableOpacity>
    </View>
  );
};

export default UserView;
