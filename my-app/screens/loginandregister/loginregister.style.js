import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');
import {COLORS } from "../../constants"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "#d0e051",

  },
  button: {
    backgroundColor: COLORS.icon,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
    marginLeft: 5, 
  },
  bottomContainer: {
    justifyContent: 'center',
    height: height / 3,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    paddingLeft: 10
  },
  codeInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    textAlign: 'center', 
  },
  
  formButton: {
    backgroundColor: COLORS.icon,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 60,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: 'center'
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    borderRadius: 50,
    top: -30
  },
   buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;