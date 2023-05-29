// import React, { useState } from "react";
// import { View, TouchableOpacity, Animated, Text } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { styles } from "./verticalprogressbar.style";
// import Confetti from "react-native-confetti";
// import { SIZES, FONT, COLORS } from "../../../constants";

// const VerticalProgressBar = ({ item }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const animationValue = new Animated.Value(0);

//   const handleClick = () => {
//     item.done = true;
//     setIsClicked(true);
//     Animated.timing(animationValue, {
//       toValue: 1,
//       duration: 400, // Change the duration as per your preference
//       useNativeDriver: false,
//     }).start();
//   };

//   const progressColor = animationValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["lightgray", "#B2FFBD"], // Change the colors as per your preference
//   });

//   return (
//     <TouchableOpacity onPress={handleClick}>
//       <View
//         style={{
//           width: 200,
//           height: 150,
//           borderRadius: 10,
//           backgroundColor: "lightgray",
//           overflow: "hidden",
//           alignItems: "center",
//           justifyContent: "center",
//           marginRight: 20,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: SIZES.medium,
//             fontFamily: FONT.regular,
//             color: COLORS.primary,
//             // marginTop: SIZES.small / 1.5,
//             textAlign: "center",
//           }}
//         >
//           {item.task_name}
//         </Text>
//         <FontAwesome name="check-circle" size={50} color="gray" />

//         <Animated.View
//           style={[
//             {
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               width: "100%",
//               alignItems: "center",
//               justifyContent: "center",
//             },
//             {
//               backgroundColor: progressColor,
//               height: animationValue.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ["0%", "100%"],
//               }),
//             },
//           ]}
//         >
//           <Text
//             style={{
//               fontSize: SIZES.medium,
//               fontFamily: FONT.regular,
//               color: COLORS.primary,
//               // marginTop: SIZES.small / 1.5,
//               textAlign: "center",
//             }}
//           >
//             {item.task_name}
//           </Text>
//           <FontAwesome name="check-circle" size={50} color="green" />
//         </Animated.View>

//         {/* {isClicked && (
//           <View
//             style={{
//               marginTop: -20,
//             }}
//           >
//             <FontAwesome name="check-circle" size={50} color="green" />
//           </View>
//         )} */}
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default VerticalProgressBar;
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SIZES, FONT, COLORS } from "../../../constants";

const VerticalProgressBar = ({ item }) => {
  const containerColor = useSharedValue("lightgray"); // Initial color
  const [iconColor, setIconColor] = useState("gray");
  const handleClick = () => {
    containerColor.value = COLORS.mintGreen; // Change the color when container is clicked
    setIconColor("green");
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: containerColor.value,
      // Create a linear gradient for the background color
      backgroundImage: `linear-gradient(to top, ${containerColor.value}, transparent)`,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: 200,
          height: 150,
          borderRadius: 10,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 20,
        },
        containerStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {item.task_name}
      </Text>
      <TouchableOpacity onPress={handleClick}>
        <FontAwesome name="check-circle" size={50} color={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default VerticalProgressBar;
