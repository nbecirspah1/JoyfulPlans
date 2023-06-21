import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";


const styles = StyleSheet.create({

  rowContainer: {
 
      flexDirection: "row",
      alignItems: "center",

    
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
  icon: {
    marginLeft: 16,
  },
});

export default styles;
