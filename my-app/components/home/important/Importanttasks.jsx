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
import { ImportantTaskCard } from "../../";
// import useFetch from "../../../hook/useFetch";
const ImportantTasks = ({ navigation }) => {
  // const router = useRouter();
  // const isLoading = false;
  // const error = false;
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React developer",
  //   num_pages: 1,
  // });
  const data = [
    {
      task_id: 1,
      task_name: "Complete project report",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
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

  const [selectedTask, setSelectedTask] = useState();

  const handleCardPress = (item) => {
    // router.push(`/job-details/${item.job_id}`);
    setSelectedTask(item.task_id);
    // formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));
    navigation.navigate("SelectedTask", { data: item });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Važni zadaci</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Prikaži sve</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Nešto nije uredu</Text>
        ) : (
          <FlatList
            data={data}
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
