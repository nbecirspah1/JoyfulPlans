import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
// import { useRouter } from "expo-router";
import styles from "./importanttasks.style";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { ImportantTaskCard } from "../../";
// import useFetch from "../../../hook/useFetch";
const ImportantTasks = ({ navigation, activeTaskType2 }) => {
  // const router = useRouter();
  // const isLoading = false;
  // const error = false;
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React developer",
  //   num_pages: 1,
  // });
  // const activeTaskType = useState(getActiveTaskType());
  const data = [
    {
      task_id: 1,
      task_name: "Complete project report",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
      date: "04/06/2023",
      subtasks: [
        {
          task_id: 1,
          task_name: "1. podtask",
          description: "1.opis",
          done: false,
        },
        {
          task_id: 2,
          task_name: "2. podtask",
          description: "2.opis",
          done: false,
        },
        {
          task_id: 3,
          task_name: "3. podtask",
          description: "3.opis",
          done: false,
        },
        {
          task_id: 4,
          task_name: "4. podtask",
          description: "4.opis",
          done: false,
        },
        {
          task_id: 5,
          task_name: "5. podtask",
          description: "5.opis",
          done: false,
        },
      ],
    },
    {
      task_id: 2,
      task_name: "Prepare for meeting",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
      date: "04/06/2023",
      subtasks: [
        {
          task_id: 1,
          task_name: "1. podtask",
          description: "1.opis",
          done: false,
        },
        {
          task_id: 2,
          task_name: "2. podtask",
          description: "2.opis",
          done: false,
        },
      ],
    },
    {
      task_id: 3,
      task_name: "Follow up with clients",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
      date: "06/06/2023",
      subtasks: [
        {
          task_id: 1,
          task_name: "1. podtask",
          description: "1.opis",
          done: false,
        },
        {
          task_id: 2,
          task_name: "2. podtask",
          description: "2.opis",
          done: false,
        },
      ],
    },
    {
      task_id: 4,
      task_name: "Organize files",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
      date: "15/06/2023",
      subtasks: [
        {
          task_id: 1,
          task_name: "1. podtask",
          description: "1.opis",
          done: false,
        },
        {
          task_id: 2,
          task_name: "2. podtask",
          description: "2.opis",
          done: false,
        },
      ],
    },
  ];
  const isLoading = false;
  const error = false;
  const currentDate = new Date();

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedCurrentDate = currentDate.toLocaleDateString("en-GB", options);

  // Get the start and end dates of the current week

  const firstDayOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay();

  // Adjust the day to Monday (1) if it's Sunday (0)
  if (dayOfWeek === 0) {
    firstDayOfWeek.setDate(currentDate.getDate() - 6);
  } else {
    firstDayOfWeek.setDate(currentDate.getDate() - (dayOfWeek - 1));
  }

  console.log("FIRST DAY OF WEEK", firstDayOfWeek);

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  const filteredData = data.filter((item) => {
    if (activeTaskType2 === "Danas") {
      return formattedCurrentDate === item.date;
    } else if (activeTaskType2 === "Sedmica") {
      const [day, month, year] = item.date.split("/");
      const taskDate = new Date(year, month - 1, day);

      return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
    } else if (activeTaskType2 === "Sve") {
      return true; // Include all items when "Sve" is selected
    } else {
      return false; // Exclude all other cases
    }
  });
  const [selectedTask, setSelectedTask] = useState();
  const handleCardPress = (item) => {
    // router.push(`/job-details/${item.job_id}`);
    setSelectedTask(item.task_id);
    // formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));
    // navigation.navigate("SelectedTask", { data: item });
    navigation.navigate("NestedDrawer", {
      screen: "SelectedTask",
      params: { data: item },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Važni zadaci</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>{activeTaskType2}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Nešto nije uredu</Text>
        ) : filteredData.length === 0 ? (
          <Text>Nema novih zadataka</Text>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <ImportantTaskCard
                item={item}
                selectedTask={selectedTask}
                handleCardPress={handleCardPress}
              />
              // <View>
              //   <Text>{item.task_name}</Text>
              // </View>
            )}
            keyExtractor={(item) => item?.task_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default ImportantTasks;
