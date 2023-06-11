import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";

export default function AnimatedTyping(props) {
  let [text, setText] = useState("");
  let [cursorColor, setCursorColor] = useState("transparent");
  let [messageIndex, setMessageIndex] = useState(0);
  let [textIndex, setTextIndex] = useState(0);
  let [timeouts, setTimeouts] = useState({
    cursorTimeout: undefined,
    typingTimeout: undefined,
    firstNewLineTimeout: undefined,
    secondNewLineTimeout: undefined,
  });

  let textRef = useRef(text);
  textRef.current = text;

  let cursorColorRef = useRef(cursorColor);
  cursorColorRef.current = cursorColor;

  let messageIndexRef = useRef(messageIndex);
  messageIndexRef.current = messageIndex;

  let textIndexRef = useRef(textIndex);
  textIndexRef.current = textIndex;

  let timeoutsRef = useRef(timeouts);
  timeoutsRef.current = timeouts;

  let typingAnimation = () => {
    if (textIndexRef.current < props.text[messageIndexRef.current].length) {
      setText(
        textRef.current +
          props.text[messageIndexRef.current].charAt(textIndexRef.current)
      );
      setTextIndex(textIndexRef.current + 1);

      let updatedTimeouts = { ...timeoutsRef.current };
      updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 50);
      setTimeouts(updatedTimeouts);
    } else if (messageIndexRef.current + 1 < props.text.length) {
      setMessageIndex(messageIndexRef.current + 1);
      setTextIndex(0);

      let updatedTimeouts = { ...timeoutsRef.current };
      updatedTimeouts.firstNewLineTimeout = setTimeout(newLineAnimation, 120);
      updatedTimeouts.secondNewLineTimeout = setTimeout(newLineAnimation, 200);
      updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 280);
      setTimeouts(updatedTimeouts);
    } else {
      clearInterval(timeoutsRef.current.cursorTimeout);
      setCursorColor("transparent");

      if (props.onComplete) {
        props.onComplete();
      }
    }
  };

  let newLineAnimation = () => {
    setText(textRef.current + "\n");
  };

  let cursorAnimation = () => {
    if (cursorColorRef.current === "transparent") {
      setCursorColor("#f57db1");
    } else {
      setCursorColor("transparent");
    }
  };
  const words = text.split(" ");

  useEffect(() => {
    let updatedTimeouts = { ...timeoutsRef.current };
    updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
    updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250);
    setTimeouts(updatedTimeouts);

    return () => {
      clearTimeout(timeoutsRef.current.typingTimeout);
      clearTimeout(timeoutsRef.current.firstNewLineTimeout);
      clearTimeout(timeoutsRef.current.secondNewLineTimeout);
      clearInterval(timeoutsRef.current.cursorTimeout);
    };
  }, []);

  return (
    <Text style={styles.text}>
      {words[0]}
      <Text style={styles.text1}> {words[1]}</Text>
      <Text style={{ color: cursorColor, fontSize: 45 }}>|</Text>
    </Text>
  );
}

let styles = StyleSheet.create({
  text: {
    color: "#f57db1",
    fontWeight: 700,
    fontSize: 40,
    padding: 20,
    marginBottom: 90,
    // alignSelf: "stretch",
  },
  text1: {
    color: "#00D1FF",
    fontWeight: 700,
    fontSize: 40,
    padding: 20,
    marginBottom: 90,
    // alignSelf: "stretch",
  },
});
