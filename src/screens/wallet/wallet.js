import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit";
import {Picker} from '@react-native-picker/picker';
import { useWallets } from "../../libs/hooks/wallet";

import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

import CustomButton from '../../components/custom-button';
import Modal from "react-native-modal";
import CustomInput from "../../components/custom-input";

const WalletScreen = ({ navigation }) => {
  const { data: wallets, onAdd, loading } = useWallets();
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [name, setName] = useState(null)
  const [initial_balance, setInitialBalance] = useState(0)
  const [currency_id, setCurrency] = useState(null)

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 2},
    {label: 'Banana', value: 1}
  ]);

  const totalWealth = wallets?.data?.reduce((w, a) => {
    return w + a.initial_balance
  }, 0);


  const toggleModal = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss()
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const handleSubmit = () => {
    onAdd({name, initial_balance, currency_id})
    setModalVisible(!isModalVisible)
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
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
        <View onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
              datasets: [
                {
                  data: [
                    Math.random() * 50,
                    Math.random() * 23,
                    Math.random() * 30,
                    Math.random() * 40,
                    Math.random() * 55,
                    Math.random() * 55,
                    Math.random() * 61,
                    Math.random() * 24,
                  ],
                  strokeWidth: 2,
                  color: (opacity) => `rgba(147,118,93, 80)`
                },
                {
                  data: [5,22,36,27,8,40,33, 20],
                  strokeWidth: 2,
                  color: (opacity) => `rgba(83,131,105, 80)`
                },
                {
                  data: [26,20,5,20,24,2,33, 33],
                  strokeWidth: 2,
                  color: (opacity) => `rgba(88,87,130, 80)`
                }
              ],
              legend: ["BCA", "DBS", "CASH"]
            }
          
          }
            width={chartParentWidth - 30}
            height={220}
            yAxisInterval={1}
            withVerticalLines={false}
            withHorizontalLines={true}
            fromZero
            chartConfig={{
              backgroundColor: "#F7F4F2",
              backgroundGradientFrom: "#F7F4F2",
              backgroundGradientTo: "#F7F4F2",
              useShadowColorFromDataset: true,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(47,38,30, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(47,38,30, ${opacity})`,
              style: {
                borderRadius: 20,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "6",
              }
            }}
            bezier
            style={{
              borderRadius: 5,
              paddingTop: 10,
              paddingRight: 40,
            }}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rp. {totalWealth?.toLocaleString()}</Text>
          <Text style={styles.cardText}>Total Wealth</Text>
        </View>
        <View>
        {
            wallets?.data?.map((w) => {
              return (
                <View key={w.id} style={styles.listWrapper}>
                  <Ionicons style={styles.icon} name="card" size="45px"/>
                  <View>
                    <Text style={styles.listItemTitle}>{w.name}</Text>
                    <Text style={styles.listItemDate}>{Moment(w.created_at).format('DD MMM YYYY')}</Text>
                  </View>
                  <Text style={styles.listItemText}>Rp. {w.initial_balance.toLocaleString()}</Text>
                </View>
              )
            })
        }
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton  text="Add Wallet" type="PRIMARY_SM" onPress={toggleModal} />
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
              <CustomInput placeholder="Wallet Name" value={name} setValue={setName} />
              <CustomInput placeholder="Amount" type="numeric" value={initial_balance} setValue={setInitialBalance} />
              <DropDownPicker
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
                open={open}
                setOpen={setOpen}
                items={items}
                setItems={setItems}
                value={currency_id}
                setValue={setCurrency}
              />
              <View style={styles.gap}></View>
              <CustomButton text="Add Wallet" type="PRIMARY" isLoading={loading} onPress={handleSubmit}/>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gap: {
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F4F2',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: '50%',
    color: '#231c16',
    marginBottom: 10,
  },
  title_SM: {
    fontSize: '30%',
    color: '#231c16',
    marginTop: 10,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#538369',
    borderRadius: '5px',
    marginVertical: 10
  },
  cardTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    color: '#efeae6',
    fontWeight: 'bold'
  },
  cardText: {
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    color: '#efeae6',
  },
  listWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efe6e6',
    borderRadius: '5px',
    marginBottom: 10,
  },
  icon: {
    color: '#3b2f25',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  listItemTitle: {
    color: '#3b2f25',
    fontSize: '12px',
    fontWeight: 'bold',
    paddingTop: 13,
  },
  listItemDate: {
    color: '#3b2f25',
    fontSize: '10px'
  },
  listItemText: {
    textAlign: 'right',
    flex: 1,
    color: '#3b2f25',
    fontSize: '14px',
    paddingTop: 17,
    paddingHorizontal: 15,
  },
  buttonWrapper: {
    flex: 1,
    alignItems:'center',
    marginBottom: 50
  },
  modalWrapper: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#F7F4F2',

    width: '100%',
    padding: 10,
    paddingBottom: 50,
  },

  dropDownPicker: {
    borderColor: '#f7f4f2',
    borderWidth: 1,
    borderRadius: 5,
  }
})

export default WalletScreen
