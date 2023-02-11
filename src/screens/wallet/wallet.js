import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit";
import Ionicons from 'react-native-vector-icons/Ionicons';


const WalletScreen = () => {
  const [chartParentWidth, setChartParentWidth] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallets</Text>
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
