import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomMultiselect = ({
  placeholder,
  items,
  searchValue,
  setSearchValue,
  searchPlaceholder,
  searchable,
  onSearch,
}) => {
  const [show, setShow] = useState(false);
  const onPress = () => {
    setShow(!show);
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {show ? (
          <View style={styles.label}>
            <Text>{placeholder}</Text>
            <Ionicons style={styles.iconDown} name="caret-up" size={15} />
          </View>
        ) : (
          <View style={styles.label}>
            <Text>{placeholder}</Text>
            <Ionicons style={styles.iconDown} name="caret-down" size={15} />
          </View>
        )}
      </TouchableOpacity>
      <View
        style={{ ...styles.dropDownContainer, display: show ? "flex" : "none" }}
      >
        {searchable ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="#efeae6"
              style={styles.input}
              value={() => searchValue}
              onChangeText={setSearchValue}
              onChange={onSearch}
              placeholder={searchPlaceholder}
            />
          </View>
        ) : null}
        <ScrollView style={styles.dropDownWrapper}>
          {/* <TouchableOpacity style={styles.itemButtom}>
            <Text style={{ ...styles.item, color: "#836953" }}>INI MENU 1</Text>
            <Ionicons
              style={{ ...styles.itemIcon, color: "#836953" }}
              name="checkmark-circle"
              size={20}
            />
          </TouchableOpacity> */}
          {items
            ? items.map((data) => {
                return (
                  <TouchableOpacity style={styles.itemButtom}>
                    <Text>{data.name}</Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    padding: 13,
    marginVertical: 5,
    elevation: 50,
    zIndex: 10,
  },
  label: {
    flexDirection: "row",
  },
  dropDownContainer: {
    position: "absolute",
    width: "100%",
    top: 51,
    elevation: 51,
    zIndex: 9,

    backgroundColor: "#FFF",
    maxHeight: 150,

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
  },
  iconDown: {
    textAlign: "right",
    flex: 1,
    color: "#231c16",
  },
  itemButtom: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  itemIcon: {
    textAlign: "right",
    flex: 1,
  },
  item: {
    paddingTop: 3,
  },
  inputContainer: {
    width: "100%",
    padding: 13,
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
  },
});

export default CustomMultiselect;
