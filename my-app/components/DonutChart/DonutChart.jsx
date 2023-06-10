import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Circle, G, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  useDerivedValue,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DonutChart = ({ progress, previousProgressValue }) => {
  const CIRCUMFERENCE = 700;
  const R = CIRCUMFERENCE / (2 * Math.PI);
  const STROKE_WIDTH = 20;
  const HALF_CIRCLE = R + STROKE_WIDTH;
  const DIAMETER = HALF_CIRCLE * 2;

  const progressValue = useSharedValue(previousProgressValue);
  useEffect(() => {
    if (!progress) {
      progressValue.value = withTiming(0, { duration: 2000 });
    } else {
      progressValue.value = withTiming(progress, { duration: 2000 });
    }
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCUMFERENCE * (1 - progressValue.value),
    };
  }, []);

  const animatedText = useDerivedValue(() => {
    return `${Math.floor(progressValue.value * 100)}%`;
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ReText
        style={{ fontSize: 30, fontWeight: "900", position: "absolute" }}
        text={animatedText}
      />
      <Svg
        width={DIAMETER}
        height={DIAMETER}
        viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
      >
        <G origin={`${HALF_CIRCLE}, ${HALF_CIRCLE}`} rotation={-90}>
          <AnimatedCircle
            animatedProps={animatedProps}
            fill={"transparent"}
            r={R}
            cx={"50%"}
            cy={"50%"}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            stroke={interpolateColor(
              progressValue.value,
              [0, 0.5, 1.0],
              ["#fc4128", "#fcd008", "#24fc08"]
            )}
          />
          <Circle
            fill={"transparent"}
            stroke={"black"}
            r={R}
            cx={"50%"}
            cy={"50%"}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeOpacity={0.2}
          />
        </G>
      </Svg>
    </View>
  );
};

export default DonutChart;
