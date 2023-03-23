import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Modal, Platform, StyleSheet, View } from "react-native";

const CustomDatePicker = ({ isOpen, setOpen, onChange, date }) => {
  return (
    <Modal
      style={styles.modalWrapper}
      isVisible={isOpen}
      onBackdropPress={setOpen}
    >
      <View style={styles.picker}>
        <DateTimePicker
          mode="date"
          value={date}
          is24Hour
          display={Platform.OS === "android" ? "default" : "spinner"}
          onChange={onChange}
          textColor="dark"
          // style={{
          //   display: isOpen ? "flex" : "none",
          // }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
  picker: {
    backgroundColor: "#f00",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: 500,

    width: "100%",
    padding: 10,
    paddingVertical: 50,
  },
});

export default CustomDatePicker;
