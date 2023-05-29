import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
// import { useRouter } from "expo-router";
import styles from "./tasks.style";
import { COLORS, SIZES } from "../../../constants";
// import useFetch from "../../../hook/useFetch";
import { TaskCard } from "../../";
const Tasks = () => {
  //   const router = useRouter();
  // const isLoading = false;
  // const error = false;
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React developer",
  //   num_pages: 1,
  // });
  // console.log(data);
  const data = [
    {
      task_id: 1,
      task_name: "Complete project report",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
    },
    {
      task_id: 2,
      task_name: "Prepare for meeting",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
    },
    {
      task_id: 3,
      task_name: "Follow up with clients",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
    },
    {
      task_id: 4,
      task_name: "Organize files",
      employer_logo: require("../../../assets/images/pranjeSudja.png"),
      description: "Potrebno je zavrsiti project report tako da bla bla nbla",
    },
  ];
  const isLoading = false;
  const error = false;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Prikaži sve</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((task) => (
            <TaskCard
              task={task}
              key={`task-${task?.task_id}`}
              handleNavigate={() =>
                /*router.push(`/job-details/${job.job_id}`)*/ console.log(
                  "Handle navigate"
                )
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Tasks;
