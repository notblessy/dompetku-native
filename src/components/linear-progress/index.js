import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LinearProgress = ({ value }) => {
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

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          ...styles.container,
          width: `${value > 0 ? value : 20}%`,
          backgroundColor: value > 0 ? bgColor : null,
        }}
      >
        <Text style={{ color: `${value > 0 ? "white" : "#231c16"}` }}>
          {value}%
        </Text>
      </View>
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
