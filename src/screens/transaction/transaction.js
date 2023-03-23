import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTransactions } from "../../libs/hooks/transaction";

import Moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import CustomButton from "../../components/custom-button";
import Modal from "react-native-modal";
import CustomInput from "../../components/custom-input";
import { useOptionCategories } from "../../libs/hooks/category";
import { useWallets } from "../../libs/hooks/wallet";
import CustomSelect from "../../components/custom-select";

const TransactionScreen = ({ navigation }) => {
  const {
    data: transactions,
    onAdd,
    onFilterType,
    loading,
    success,
  } = useTransactions();

  const { data: wallets } = useWallets();
  const { data: categories, onSearch } = useOptionCategories();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedWallet, setSelectedWallet] = useState({});

  const [activeTab, setActiveTab] = useState("ALL");

  const [spentAt, setSpentAt] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const placeholderCategories = selectedCategory?.label
    ? selectedCategory.label
    : "Select Category";

  const placeholderWallet = selectedWallet?.label
    ? selectedWallet.label
    : "Select Wallet";

  const toggleModal = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setModalVisible(!isModalVisible);
      if (success) {
        setDescription(null);
        setAmount(0);
      }
    }
  };

  const toggleDatePicker = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setOpenDatePicker(!openDatePicker);
    }
  };

  const onTimeChange = (event, newTime) => {
    if (Platform.OS === "android") {
      setOpenDatePicker(false);
    }

    if (event.type === "dismissed") {
      setOpenDatePicker(false);
      return;
    }

    if (event.type === "set") {
      setSpentAt(newTime);
    }

    if (event.type === "neutralButtonPressed") {
      setSpentAt(new Date(0));
    } else {
      setSpentAt(newTime);
    }
  };

  const handleSubmit = () => {
    onAdd({
      amount,
      category_id: selectedCategory?.value,
      wallet_id: selectedWallet?.value,
      spent_at: spentAt,
    });
    setModalVisible(!isModalVisible);
    if (success) {
      setDescription(null);
      setAmount(0);
      setSelectedCategory({});
      setSelectedWallet({});
      setSpentAt(new Date());
    }
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

  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: "#faca50", widthh: "100%", paddingTop: 80 }}
      >
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.buttonTabContainer}>
          <TouchableOpacity
            style={{
              ...styles.buttonTab,
              backgroundColor: activeTab === "INCOME" ? "#dae7e0" : "#efe6e6",
            }}
            onPress={() => {
              onFilterType("INCOME");
              setActiveTab("INCOME");
            }}
          >
            <Text style={{ textAlign: "center" }}>Incomes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.buttonTab,
              backgroundColor: activeTab === "ALL" ? "#dae7e0" : "#efe6e6",
            }}
            onPress={() => {
              onFilterType("");
              setActiveTab("ALL");
            }}
          >
            <Text style={{ textAlign: "center" }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.buttonTab,
              backgroundColor: activeTab === "EXPENSES" ? "#dae7e0" : "#efe6e6",
            }}
            onPress={() => {
              onFilterType("EXPENSES");
              setActiveTab("EXPENSES");
            }}
          >
            <Text style={{ textAlign: "center" }}>Expenses</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 30 }}>
        <View>
          {transactions?.records?.map((w) => {
            return (
              <View
                key={w.id}
                style={{
                  ...styles.listWrapper,
                  backgroundColor:
                    w.category.type === "INCOME" ? "#dae7e0" : "#efe6e6",
                }}
              >
                <Ionicons
                  style={{
                    ...styles.icon,
                    color: w.category.type === "INCOME" ? "#446b56" : "#534234",
                  }}
                  name={w.category.icon}
                  size={45}
                />
                <View>
                  <Text style={styles.listItemTitle}>
                    Rp. {w.amount.toLocaleString()}
                  </Text>
                  <Text style={styles.listItemDate}>
                    {w.category.name} From {w.wallet.name}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionDate}>
                    {Moment(w.spent_at).format("DD MMM YYYY")}
                  </Text>
                  <Text style={styles.transactionType}>{w.category.type}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            text="Add Transaction"
            type="PRIMARY_SM"
            onPress={toggleModal}
          />
        </View>
      </ScrollView>
      <View style={{ flex: 1 }}>
        <Modal
          style={styles.modalWrapper}
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          avoidKeyboard
        >
          <View style={styles.modalContainer}>
            <Text style={styles.title_SM}>Add Transaction</Text>
            <View style={styles.root}>
              <CustomSelect
                placeholder={placeholderCategories}
                title="Select Category"
                searchable
                searchPlaceholder="Search Category"
                handleSearch={onSearch}
                items={categories}
                selectedItem={selectedCategory}
                setSelectedItem={setSelectedCategory}
              />
              <CustomInput
                placeholder="Amount"
                type="numeric"
                value={amount}
                setValue={setAmount}
              />
              <CustomSelect
                placeholder={placeholderWallet}
                title="Select Wallet"
                items={wallets?.data}
                selectedItem={selectedWallet}
                setSelectedItem={setSelectedWallet}
              />
              <CustomInput
                placeholder="Description"
                value={description}
                setValue={setDescription}
              />

              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  style={styles.pickerLabel}
                  onPress={() => setOpenDatePicker(!openDatePicker)}
                >
                  <Text>Select Date</Text>
                </TouchableOpacity>
                <View style={styles.pickerLabel}>
                  <Text style={{ textAlign: "right" }}>
                    {Moment(spentAt).format("DD MMMM YYYY")}
                  </Text>
                </View>
              </View>
              <View style={styles.gap}></View>
              <CustomButton
                text="Add Transaction"
                type="PRIMARY"
                isLoading={loading}
                onPress={handleSubmit}
              />
            </View>
          </View>
          {/* <CustomDatePicker
            isOpen={openDatePicker}
            setOpen={toggleDatePicker}
            onChange={onTimeChange}
            date={date}
          /> */}
          <Modal
            style={styles.modalWrapper}
            isVisible={openDatePicker}
            onBackdropPress={toggleDatePicker}
          >
            <View style={styles.picker}>
              <DateTimePicker
                mode="date"
                value={spentAt}
                is24Hour
                display={Platform.OS === "android" ? "default" : "spinner"}
                onChange={onTimeChange}
                textColor="dark"
                style={{
                  display: openDatePicker ? "flex" : "none",
                }}
              />
              <View style={styles.gap} />
              <CustomButton
                text="Select Date"
                type="PRIMARY"
                onPress={() => setOpenDatePicker(!openDatePicker)}
              />
            </View>
          </Modal>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F4F2",
    // paddingHorizontal: 30,
  },
  title: {
    fontSize: 50,
    color: "#231c16",
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  buttonTabContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
  },
  buttonTab: {
    paddingVertical: 15,
    width: "33.3%",
  },
  title_SM: {
    fontSize: 30,
    color: "#231c16",
    marginTop: 10,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#538369",
    borderRadius: 5,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    color: "#efeae6",
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    color: "#efeae6",
  },
  listWrapper: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  listItemTitle: {
    color: "#3b2f25",
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 14,
  },
  listItemDate: {
    color: "#3b2f25",
    fontSize: 10,
  },
  listItemText: {
    textAlign: "right",
    flex: 1,
    color: "#3b2f25",
    fontSize: 14,
    paddingTop: 17,
    paddingHorizontal: 15,
  },
  transactionType: {
    textAlign: "right",
    color: "#3b2f25",
    fontSize: 10,
    paddingRight: 10,
    fontWeight: "bold",
  },
  transactionDate: {
    textAlign: "right",
    color: "#3b2f25",
    fontSize: 14,
    paddingTop: 13,
    paddingRight: 10,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
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
    minHeight: 600,

    width: "100%",
    padding: 10,
    paddingBottom: 50,
  },

  dropDownPicker: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },

  pickerContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    flexDirection: "row",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 13,
    marginVertical: 5,
  },
  pickerLabel: {
    paddingVertical: Platform.OS === "ios" ? 13 : 9,
    width: "50%",
  },
  picker: {
    backgroundColor: "#F7F4F2",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: 500,

    width: "100%",
    padding: 10,
    paddingVertical: 50,
  },
});

export default TransactionScreen;
