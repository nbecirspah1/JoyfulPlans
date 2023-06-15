import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  textInput: {
    flexGrow: 1,
    flexShrink: 1,
    color: COLORS.primary,
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
    marginBottom: SIZES.base,
    fontSize: 25,
    // fontWeight: "bold",
    paddingVertical: SIZES.smallPadding,
  },
  descriptionInput:{
    // backgroundColor: COLORS.white,
    flexGrow: 1,
    flexShrink: 1,
    color: COLORS.primary,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    marginBottom: 20,
    fontSize: 15,
    // fontWeight: "bold",
    paddingBottom: SIZES.smallPadding,
    // borderRadius: 20

  },
  formContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: SIZES.padding,
    backgroundColor: "#f9f9f9",
  },
  label: {
    marginBottom: SIZES.smallPadding,
    // fontWeight: "bold",
  },
  rowContainer: {
 
      flexDirection: "row",
      alignItems: "center",

    
  },
  rowContainerNaslov: {
 
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30
  
},
  icon: {
    marginLeft: 16,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tabText: (activeJobType, item) => ({
    // fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.primary : COLORS.gray,
  }),
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    backgroundColor: activeJobType === item ? "#f57db1" : "#f0b9d0",
    borderColor: activeJobType === item ? COLORS.primary : "#f57db1",

  }),

});

export default styles;
