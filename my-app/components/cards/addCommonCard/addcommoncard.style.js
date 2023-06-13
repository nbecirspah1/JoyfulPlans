import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#ACAC9A",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginTop: 12
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#ACAC9A",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    // resizeMode: "cover", // add this to adjust the image to the shape of the container
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    // marginBottom:20
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
