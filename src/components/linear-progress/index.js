import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const LinearProgress = ({ value }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  let bgColor = "";

  if (value > 0 && value < 30) {
    bgColor = "#3D426B";
  } else if (value >= 30 && value < 50) {
    bgColor = "#538369";
  } else if (value >= 50 && value < 80) {
    bgColor = "#ffb347";
  } else if (value >= 80) {
    bgColor = "#ff5747";
  } else {
    bgColor = "#d8ccc2";
  }

  const startProgressBar = () => {
    Animated.timing(animation, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const progressValue = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });

  startProgressBar();

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={{
          ...styles.container,
          width: progressValue,
          backgroundColor: value > 0 ? bgColor : null,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: `${value > 0 ? "white" : "#231c16"}`,
            position: "absolute",
            padding: 12,
            includeFontPaddixng: false,
            width: 100,
          }}
        >
          {value}%
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#d8ccc2",
    width: "100%",
    borderRadius: 5,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
  },
});

export default LinearProgress;
