import { View, Text, TouchableOpacity, FlatList } from "react-native";
// import { useRouter } from "expo-router";
import { useState, useEffect, useContext } from "react";
import styles from "./tasks.style";
import { COLORS, SIZES } from "../../../constants";
import ShowSelectedTaskContext from "../../../app/showSelectedTaskContext";
// import useFetch from "../../../hook/useFetch";
import { TaskCard, AddCommonCard } from "../../";
const Tasks = ({
  navigation,
  activeTaskType2,
  setNumberOfTasks,
  isParent,
  data,
}) => {
  const isLoading = false;
  const error = false;
  const [selectedTask, setSelectedTask] = useState();
  const [src, setSrc] = useState(null);
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
      return formattedCurrentDate === item.deadline;
    } else if (activeTaskType2 === "Sedmica") {
      const [day, month, year] = item.deadline.split("/");
      const taskDate = new Date(year, month - 1, day);

      return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
    } else if (activeTaskType2 === "Sve") {
      return true; // Include all items when "Sve" is selected
    } else {
      return false; // Exclude all other cases
    }
  });
  useEffect(() => {
    setNumberOfTasks(filteredData.length);
  }, [filteredData]);

  const { setShowSelectedTask } = useContext(ShowSelectedTaskContext);

  const handleAddPress = () => {
    navigation.navigate("MyDrawer", {
      screen: "Dodaj Zadatak",
    });
  };

  return (
    <ShowSelectedTaskContext.Provider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Zadaci</Text>
          <TouchableOpacity>
            <Text style={styles.headerBtn}>{activeTaskType2}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : filteredData.length === 0 ? (
            <Text>Nema novih zadataka</Text>
          ) : (
            //   <FlatList
            //     data={filteredData}
            //     renderItem={({ item, index }) => {
            //       return (
            //         <TaskCard
            //           item={item}
            //           selectedTask={selectedTask}
            //           isParent={isParent}
            //           navigation={navigation}
            //           setSelectedTask={setSelectedTask}
            //           setShowSelectedTask={setShowSelectedTask}
            //         />
            //       );
            //     }}
            //     keyExtractor={(item) => item?.task_id}
            //     contentContainerStyle={{ rowGap: SIZES.small }}
            //   />
            <View>
              {filteredData.map((item, index) => (
                <TaskCard
                  key={item.task_id}
                  item={item}
                  selectedTask={selectedTask}
                  isParent={isParent}
                  navigation={navigation}
                  setSelectedTask={setSelectedTask}
                  setShowSelectedTask={setShowSelectedTask}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </ShowSelectedTaskContext.Provider>
  );
};

export default Tasks;
