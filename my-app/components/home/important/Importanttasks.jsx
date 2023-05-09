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
const ImportantTasks = () => {
  // const router = useRouter();
  // const isLoading = false;
  // const error = false;
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React developer",
  //   num_pages: 1,
  // });
  const data = [
    {
      job_id: 1,
      task_name: "Complete project report",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
    },
    {
      job_id: 2,
      task_name: "Prepare for meeting",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
    },
    {
      job_id: 3,
      task_name: "Follow up with clients",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
    },
    {
      job_id: 4,
      task_name: "Organize files",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
    },
  ];
  const isLoading = false;
  const error = false;

  const [selectedTask, setSelectedTask] = useState();

  const handleCardPress = (item) => {
    // router.push(`/job-details/${item.job_id}`);
    setSelectedTask(item.job_id);
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
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default ImportantTasks;
