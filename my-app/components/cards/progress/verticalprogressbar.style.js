import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 200,
    borderRadius: 10,
    backgroundColor: "lightgray",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  checkIconContainer: {
    marginTop: -20,
  },
});
export default styles;
