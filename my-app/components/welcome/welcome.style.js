import { StyleSheet } from "react-native";

import { COLORS, FONT,SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  containerGreet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  userName: {
    // fontFamily: FONT.regular,
    fontSize: SIZES.h1,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    // fontFamily: FONT.bold,
    fontSize: SIZES.h2,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    // fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    backgroundColor: activeJobType === item ? "#f57db1" : "#f0b9d0",
    borderColor: activeJobType === item ? COLORS.primary : "#f57db1",

  }),
  tabText: (activeJobType, item) => ({
    // fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.primary : COLORS.gray,
  }),

  
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#f57db1",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  
  
  
  quoteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  
  welcomeMessage: {
    fontSize: 60,
    fontWeight: 'bold',
    color: COLORS.primary,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
  }
  

});

export default styles;
