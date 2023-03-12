import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { useWallets } from "../../libs/hooks/wallet";

import Moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

import CustomButton from "../../components/custom-button";
import Modal from "react-native-modal";
import CustomInput from "../../components/custom-input";
import { useCurrency } from "../../libs/hooks/currency";

const WalletScreen = ({ navigation }) => {
  const { data: wallets, onAdd, loading, success } = useWallets();
  const { data: currencies } = useCurrency();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);

  const [name, setName] = useState(null);
  const [initial_balance, setInitialBalance] = useState(0);
  const [currency_id, setCurrency] = useState(null);

  const totalWealth = wallets?.data?.reduce((w, a) => {
    return w + a.initial_balance;
  }, 0);

  const toggleModal = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setModalVisible(!isModalVisible);
      if (success) {
        setName(null);
        setInitialBalance(0);
        setCurrency(null);
      }
    }
  };

  const handleSubmit = () => {
    onAdd({ name, initial_balance, currency_id });
    setModalVisible(!isModalVisible);
    if (success) {
      setName(null);
      setInitialBalance(0);
      setCurrency(null);
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
      <Text style={styles.title}>Wallets</Text>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Rp. {totalWealth?.toLocaleString()}
          </Text>
          <Text style={styles.cardText}>Total Wealth</Text>
        </View>
        <View>
          {wallets?.data?.map((w) => {
            return (
              <View key={w.id} style={styles.listWrapper}>
                <Ionicons style={styles.icon} name="card" size={45} />
                <View>
                  <Text style={styles.listItemTitle}>{w.name}</Text>
                  <Text style={styles.listItemDate}>
                    {Moment(w.created_at).format("DD MMM YYYY")}
                  </Text>
                </View>
                <Text style={styles.listItemText}>
                  Rp. {w.initial_balance.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            text="Add Wallet"
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
            <Text style={styles.title_SM}>Add Wallet</Text>
            <View style={styles.root}>
              <CustomInput
                placeholder="Wallet Name"
                value={name}
                setValue={setName}
              />
              <CustomInput
                placeholder="Amount"
                type="numeric"
                value={initial_balance}
                setValue={setInitialBalance}
              />
              <DropDownPicker
                style={styles.dropDownPicker}
                placeholderStyle={{
                  color: "#231c16",
                }}
                dropDownContainerStyle={{
                  borderColor: "#f7f4f2",
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                placeholder="Select Currency"
                open={openDropDown}
                setOpen={setOpenDropDown}
                items={
                  currencies?.data
                    ? currencies?.data.map((c) => {
                        return {
                          label: c.name,
                          value: c.id,
                        };
                      })
                    : null
                }
                value={currency_id}
                setValue={setCurrency}
              />
              <View style={styles.gap}></View>
              <CustomButton
                text="Add Wallet"
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
    backgroundColor: "#efe6e6",
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    color: "#3b2f25",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  listItemTitle: {
    color: "#3b2f25",
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 13,
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

export default WalletScreen;
