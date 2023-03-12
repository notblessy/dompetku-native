import React, { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomMultiselect = ({
  placeholder,
  title,
  items,
  searchPlaceholder,
  searchable,
  handleSearch,
  selectedItems,
  onSelectItem,
}) => {
  const [show, setShow] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleModal = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setShow(!show);
    }
  };

  const onPress = () => {
    setShow(!show);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
      <Modal
        style={styles.modalWrapper}
        isVisible={show}
        onBackdropPress={toggleModal}
        avoidKeyboard
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title_SM}>{title}</Text>
          {searchable ? (
            <View>
              <Ionicons style={styles.itemIcon} name="search" size={20} />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor="#efeae6"
                  style={styles.input}
                  onChangeText={handleSearch}
                  placeholder={searchPlaceholder}
                />
              </View>
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
                        setSelectedCategories((prev) => [...prev, selected]);
                        if (selected.selected) {
                          onSelectItem((prev) => [...prev, selected.id]);
                        } else {
                          onSelectItem(
                            selectedItems?.filter((d) => d !== selected.id)
                          );
                        }
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
      </Modal>
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
  title_SM: {
    fontSize: 20,
    color: "#231c16",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
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
  modalWrapper: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#F7F4F2",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 500,

    width: "100%",
    padding: 15,
    paddingBottom: 15,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    borderColor: "#e8e8e8",
    borderWidth: 1,
  },
  input: {
    paddingVertical: Platform.OS === "ios" ? 13 : 9,
  },
});

export default CustomMultiselect;
