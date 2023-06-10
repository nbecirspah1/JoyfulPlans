import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { images, COLORS } from "../../constants";
import { Title, Caption } from "react-native-paper";

const UserView = () => {
  return (
    <View
      style={{ height: 200, alignItems: "center", justifyContent: "center" }}
    >
      <Image
        source={images.profile}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          borderColor: COLORS.primary,
          borderWidth: 4,
          marginBottom: 10,
        }}
      />
      <Title style={{ color: COLORS.primary }}>Username</Title>
      <Caption style={{ color: COLORS.primary }}>Hello!</Caption>
    </View>
  );
};
export default UserView;
