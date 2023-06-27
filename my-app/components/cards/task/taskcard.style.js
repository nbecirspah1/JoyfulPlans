import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: (item) => ({
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: item.category === "Kuća" ? "#FBEA73" : item.category === "Higijena" ? "#D4ADF8" : COLORS.lightWhite,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: {
     backgroundColor: COLORS.white,
    width: 50,
    height: 50,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // add this to clip the image to the circle
    alignSelf: "center", // add this to center the container horizontally
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // add this to adjust the image to the shape of the container

  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
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
