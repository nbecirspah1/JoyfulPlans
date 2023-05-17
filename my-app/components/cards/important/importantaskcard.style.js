import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: (selectedTask, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedTask === item.task_id ? COLORS.paleGreen : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  // logoContainer: (selectedTask, item) => ({
  //   width: 80,
  //   height: 80,
  //   backgroundColor: selectedTask === item.job_id ? "#FFF" : COLORS.white,
  //   borderRadius: SIZES.medium,
  //   justifyContent: "center",
  //   alignItems: "center",
  // }),
  // logoImage: {
  //   width: "100%",
  //   height: "100%",
  // },
  logoContainer: (selectedTask, item) => ({
    width: 100,
    height: 100,
    backgroundColor: selectedTask === item.task_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // add this to clip the image to the circle
    alignSelf: "center", // add this to center the container horizontally
  }),
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // add this to adjust the image to the shape of the container
  },
  
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedTask, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedTask === item.task_id ? COLORS.white : COLORS.paleGreen,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedTask) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedTask === item.task_id ? COLORS.white : COLORS.paleGreen,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
