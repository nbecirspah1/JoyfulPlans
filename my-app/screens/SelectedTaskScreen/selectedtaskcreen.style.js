import { StyleSheet } from "react-native";
import {SIZES} from "../../constants"
// import { COLORS, SHADOWS, SIZES } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff", // Set your desired background color
  },
  progressBarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarsWrapper: {
    flexDirection: "row",
  },
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.h1,
    color: COLORS.secondary,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#A7A5FF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
});
export default styles;
