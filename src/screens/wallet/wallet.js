import { ScrollView, StyleSheet, Text, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';


const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallets</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Rp. 53043995</Text>
        <Text style={styles.cardText}>Total Wealth</Text>
      </View>
      <ScrollView>
        <View style={styles.listWrapper}>
          <Ionicons style={styles.icon} name="card" size="45px"/>
          <View>
            <Text style={styles.listItemTitle}>BCA Wallet</Text>
            <Text style={styles.listItemDate}>20 May 2022</Text>
          </View>
          <Text style={styles.listItemText}>Rp. 4750000</Text>
        </View>
      </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: '#534335',
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
    backgroundColor: '#e7e0da',
    borderRadius: '5px',
  },
  icon: {
    color: '#3b2f25',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  listItemTitle: {
    color: '#3b2f25',
    fontSize: '14px',
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
    fontSize: '16px',
    paddingTop: 17,
    paddingHorizontal: 15,
  }
})

export default WalletScreen
