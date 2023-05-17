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

const taskTypes = ["Higijena", "Kućni poslovi", "Škola"];
const Welcome = () => {
  const [activeTaskType, setActiveTaskType] = useState("Škola");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Zdravo nejla!</Text>
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
      {/* <View style={styles.searchhello}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="What are you looking for?"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          ></Image>
        </TouchableOpacity>
      </View> */}

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
