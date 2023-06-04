import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import styles from "./welcome.style";
import { icons, SIZES } from "../../constants";

const taskTypes = ["Danas", "Sedmica", "Sve"];

const Welcome = ({ setActiveTaskType2 }) => {
  const [activeTaskType, setActiveTaskType] = useState("Sve");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Zdravo, Nejla!</Text>
        <View style={styles.quoteContainer}>
          <Text style={styles.welcomeMessage}>Sretno sa novim zadacima!</Text>

          <FontAwesome
            name="smile-o"
            size={24}
            color="#000"
            style={styles.quoteIcon}
          />
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={taskTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeTaskType, item)}
              onPress={() => {
                setActiveTaskType(item);
                setActiveTaskType2(item);
                // router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeTaskType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
