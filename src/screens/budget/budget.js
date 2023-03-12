import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import LinearProgress from "../../components/linear-progress";
import Modal from "react-native-modal";
import CustomMultiselect from "../../components/custom-multiselect";

import { useBudgets } from "../../libs/hooks/budget";
import { useCurrency } from "../../libs/hooks/currency";
import { useWallets } from "../../libs/hooks/wallet";
import { useOptionCategories } from "../../libs/hooks/category";

const BudgetScreen = ({ navigation }) => {
  const { data: budgets, onAdd, loading, success } = useBudgets();
  const { data: categories, onSearch } = useOptionCategories();
  const { data: wallets } = useWallets();
  const { data: currencies } = useCurrency();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWallets, setSelectedWallets] = useState([]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const placeholderCategories =
    selectedCategories.length > 0
      ? `Select Categories (${selectedCategories.length} selected)`
      : "Select Categories";

  const placeholderWallets =
    selectedWallets.length > 0
      ? `Select Wallets (${selectedWallets.length} selected)`
      : "Select Wallets";

  const toggleModal = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setModalVisible(!isModalVisible);
      if (success) {
        setName(null);
        setAmount(0);
        setSelectedCategories([]);
        setSelectedWallets([]);
      }
    }
  };

  const handleSubmit = () => {
    onAdd({
      name,
      amount,
      category_ids: selectedCategories,
      wallet_ids: selectedWallets,
    });
    setModalVisible(!isModalVisible);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {budgets?.data
          ? budgets?.data.map((b) => {
              return (
                <View key={b.id} style={styles.progressContainer}>
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
              <CustomInput
                placeholder="Budget Name"
                value={name}
                setValue={setName}
              />
              <CustomInput
                placeholder="Amount"
                type="numeric"
                value={amount}
                setValue={setAmount}
              />
              <CustomMultiselect
                placeholder={placeholderCategories}
                title="Select Categories"
                searchable
                searchPlaceholder="Search Category"
                handleSearch={onSearch}
                items={categories}
                selectedItems={selectedCategories}
                onSelectItem={setSelectedCategories}
              />
              <CustomMultiselect
                placeholder={placeholderWallets}
                title="Select Wallets"
                items={wallets?.data}
                selectedItems={selectedWallets}
                onSelectItem={setSelectedWallets}
              />
              <View style={styles.gap}></View>
            </View>
            <View>
              <CustomButton
                text="Add Budget"
                type="PRIMARY"
                isLoading={loading}
                onPress={handleSubmit}
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
});

export default BudgetScreen;
