import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import LinearProgress from "../../components/linear-progress";
import Modal from "react-native-modal";

import { useBudgets } from "../../libs/hooks/budget";
import { useCurrency } from "../../libs/hooks/currency";
import { useWallets } from "../../libs/hooks/wallet";
import CustomMultiselect from "../../components/custom-multiselect";
import { useOptionCategories } from "../../libs/hooks/category";

const BudgetScreen = ({ navigation }) => {
  const { data: budgets, loading, success } = useBudgets();
  const { data: categories, onSearch } = useOptionCategories();
  const { data: wallets } = useWallets();
  const { data: currencies } = useCurrency();

  const [searchValue, setSearchValue] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [openCurrency, setOpenCurrency] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);

  const [currency_id, setCurrency] = useState(null);
  const [wallet, setWallets] = useState(null);

  const toggleModal = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setModalVisible(!isModalVisible);
      if (success) {
        setCurrency(null);
      }
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
      <Text style={styles.title}>Budgets</Text>
      <ScrollView>
        {budgets?.data
          ? budgets?.data.map((b) => {
              return (
                <View style={styles.progressContainer}>
                  <View style={styles.budgetTextWrapper}>
                    <View>
                      <Text style={styles.budgetName}>{b.name}</Text>
                      <Text style={styles.budgetLeftOut}>
                        left out IDR {b.left_out}
                      </Text>
                    </View>
                    <View style={styles.budgetAmountWrapper}>
                      <Text style={styles.budgetAmount}>
                        IDR {b.amount.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <LinearProgress value={b.progress} />
                  </View>
                </View>
              );
            })
          : null}
        <View style={styles.buttonWrapper}>
          <CustomButton
            text="Add Budget"
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
            <Text style={styles.title_SM}>Add Budget</Text>
            <View style={styles.root}>
              <CustomInput placeholder="Budget Name" />
              <CustomInput placeholder="Amount" type="numeric" />
              {/* <DropDownPicker
                style={styles.dropDownPicker}
                placeholderStyle={{
                  color: '#231c16'
                }}
                dropDownContainerStyle={{
                  borderColor: '#f7f4f2',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                placeholder="Select Currency"
                open={openCurrency}
                setOpen={setOpenCurrency}
                items={currencies?.data ? currencies?.data.map((c) => {
                  return {
                    label: c.name,
                    value: c.id
                  }
                }) : null}
                value={currency_id}
                setValue={setCurrency}
              />
              <DropDownPicker
                style={styles.dropDownPicker}
                placeholderStyle={{
                  color: '#231c16',
                }}
                dropDownContainerStyle={{
                  borderColor: '#f7f4f2',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                placeholder="Select Wallet"
                open={openWallet}
                setOpen={setOpenWallet}
                items={wallets?.data ? wallets?.data.map((c) => {
                  return {
                    label: c.name,
                    value: c.id
                  }
                }) : null}
                value={wallet}
                setValue={setWallets}
              /> */}
              <CustomMultiselect
                style={{ zIndex: 100 }}
                placeholder="Select Categories"
                searchable
                searchPlaceholder="Search Category"
                items={categories}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={() => onSearch(searchValue)}
              />
              <View style={styles.gap}></View>
              <CustomButton
                style={{ top: 130 }}
                text="Add Budget"
                type="PRIMARY"
                isLoading={loading}
              />
            </View>
          </View>
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
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 50,
    color: "#231c16",
    marginBottom: 10,
  },
  title_SM: {
    fontSize: 30,
    color: "#231c16",
    marginTop: 10,
    marginBottom: 15,
  },
  progressContainer: {
    paddingBottom: 20,
    marginBottom: 15,
    borderColor: "#e0d6ce",
    borderBottomWidth: 1,
  },
  budgetTextWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 3,
  },
  budgetName: {
    color: "#231c16",
    fontSize: 16,
    fontWeight: "bold",
  },
  budgetLeftOut: {
    fontSize: 12,
  },
  budgetAmountWrapper: {
    flex: 1,
    alignItems: "flex-end",
  },
  budgetAmount: {
    color: "#231c16",
    paddingTop: 6,
    fontWeight: "bold",
    fontSize: 16,
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
    height: 500,

    width: "100%",
    padding: 15,
    paddingBottom: 15,
  },
  dropDownPicker: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default BudgetScreen;
