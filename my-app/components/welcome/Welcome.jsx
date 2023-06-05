import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import styles from "./welcome.style";
import { icons, SIZES, COLORS } from "../../constants";
import { Feather, FontAwesome } from "@expo/vector-icons";
const taskTypes = ["Danas", "Sedmica", "Sve"];

const Welcome = ({
  setActiveTaskType2,
  numberOfImportantTasks,
  numberOfTasks,
}) => {
  const [activeTaskType, setActiveTaskType] = useState("Sve");
  const [greeting, setGreeting] = useState("");
  const [iconName, setIconName] = useState("");

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime < 12) {
      setGreeting("Dobro jutro!");
      setIconName("sunrise");
    } else if (currentTime < 18) {
      setGreeting("Dobar dan!");
      setIconName("sun");
    } else {
      setGreeting("Dobro veče!");
      setIconName("moon");
    }
  }, []);
  const currentDate = new Date();
  const daysOfWeek = [
    "nedjelja",
    "ponedjeljak",
    "utorak",
    "srijeda",
    "četvrtak",
    "petak",
    "subota",
  ];
  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

  return (
    <View>
      <View style={styles.container}>
        <View
          styles={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {iconName === "sunrise" && (
            <Feather
              name={iconName}
              size={40}
              color={COLORS.primary}
              style={{
                marginRight: 16,
              }}
            />
          )}
          {iconName === "sun" && (
            <FontAwesome
              name={iconName}
              size={40}
              color={COLORS.primary}
              style={{
                marginRight: 16,
              }}
            />
          )}
          {iconName === "moon" && (
            <FontAwesome
              name={iconName}
              size={40}
              color={COLORS.primary}
              style={{
                marginRight: 16,
              }}
            />
          )}
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: COLORS.primary,
            }}
          >
            {greeting}
          </Text>
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              textAlign: "center",
              color: COLORS.secondary,
              // fontWeight: "bold",
            }}
          >
            Broj neurađenih zadataka
          </Text>
        </View>
        <View style={styles.quoteContainer}>
          <Text style={styles.welcomeMessage}>
            {numberOfImportantTasks + numberOfTasks}
          </Text>

          <FontAwesome
            name="tasks"
            size={30}
            color="#000"
            style={styles.quoteIcon}
          />
          {numberOfImportantTasks.length === 0 ? (
            <Text>Česitam ti!</Text>
          ) : (
            <Text></Text>
          )}
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
