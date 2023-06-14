import React, { useState, useEffect, useContext } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { Title } from "react-native-paper";
import { images, COLORS } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const UserView = () => {
  const [pic, setPic] = useState(null);
  const { userInfo, isLoading, uploadProfileImage } = useContext(AuthContext);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    requestMediaLibraryPermission();
    if (userInfo.user.profile_image) {
      setSrc(userInfo.user.profile_image);
    } else {
      setSrc(images.profile);
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
    }
  };

  return (
    <View
      style={{ height: 200, alignItems: "center", justifyContent: "center" }}
    >
      <Spinner visible={isLoading} />
      <TouchableOpacity onPress={uploadImage}>
        {!pic && (
          <Image
            source={src}
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
      {pic && (
        <TouchableOpacity>
          <Title
            style={{ color: COLORS.primary }}
            onPress={() => {
              uploadProfileImage(pic);
            }}
          >
            Save Changes
          </Title>
        </TouchableOpacity>
      )}
      <Title style={{ color: COLORS.primary }}>User Name</Title>
    </View>
  );
};

export default UserView;
