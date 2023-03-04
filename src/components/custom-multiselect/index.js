import React, { useEffect, useState } from "react";
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
  searchPlaceholder,
  searchable,
  onChange,
  onSelect,
}) => {
  const [show, setShow] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onPress = () => {
    setShow(!show);
  };

  items?.map((item) => {
    selectedCategories.map((selected) => {
      if (item.id === selected.id) {
        item.selected = selected.selected ? selected.selected : false;
        return item;
      }
      return item;
    });
    return item;
  });

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
              onChangeText={onChange}
              placeholder={searchPlaceholder}
            />
          </View>
        ) : null}
        <ScrollView style={styles.dropDownWrapper}>
          {items
            ? items.map((data) => {
                return (
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => {
                      const selected = {
                        ...data,
                        selected: !data.selected,
                      };
                      onSelect(selected);
                      setSelectedCategories((prev) => [...prev, selected]);
                    }}
                  >
                    <Text
                      style={{
                        color: data?.selected ? "#836953" : "#231c16",
                        paddingVertical: 3,
                      }}
                    >
                      {data.name}
                    </Text>
                    <Ionicons
                      style={{
                        ...styles.itemIcon,
                        display: data?.selected ? "flex" : "none",
                      }}
                      name="checkmark-circle"
                      size={20}
                    />
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
  itemButton: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  itemIcon: {
    textAlign: "right",
    flex: 1,
    color: "#836953",
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
