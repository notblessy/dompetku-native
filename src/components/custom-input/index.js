import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secured, type }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secured}
        keyboardType={type ? type : "none"}
        placeholderTextColor="#efeae6"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 13,
    marginVertical: 5,
  },
  input: {
    paddingVertical: Platform.OS === "ios" ? 13 : 9,
  },
});

export default CustomInput;
