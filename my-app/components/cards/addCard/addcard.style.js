import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container:{
    width: 250,
    padding: SIZES.xLarge,
    marginLeft: 16,
    // backgroundColor: selectedTask === item.task_id  ? COLORS.paleGreen : "#FFF",
    backgroundColor:  "#ACAC9A" ,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
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
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#ACAC9A",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
    overflow: "hidden", // add this to clip the image to the circle
    alignSelf: "center", // add this to center the container horizontally
  },
  logoImage: {
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
  },
  
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.primary,
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color:  COLORS.white ,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color:  COLORS.white
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
