import { ScrollView, StyleSheet, Text, View } from "react-native"
import LinearProgress from "../../components/linear-progress"

const BudgetScreen = ({ navigation }) => {
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets</Text>
      <ScrollView>
        <View style={styles.progressContainer}>
          <View style={styles.budgetTextWrapper}>
            <View>
              <Text style={styles.budgetName}>Home</Text>
              <Text style={styles.budgetLeftOut}>left out IDR 1293849</Text>
            </View>
            <View style={styles.budgetAmountWrapper}>
              <Text style={styles.budgetAmount}>IDR 2.000.000</Text>
            </View>
          </View>
          <View>
            <LinearProgress value={89} />
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.budgetTextWrapper}>
            <View>
              <Text style={styles.budgetName}>Food & Drink</Text>
              <Text style={styles.budgetLeftOut}>left out IDR 1293849</Text>
            </View>
            <View style={styles.budgetAmountWrapper}>
              <Text style={styles.budgetAmount}>IDR 1.000.000</Text>
            </View>
          </View>
          <View>
            <LinearProgress value={33} />
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.budgetTextWrapper}>
            <View>
              <Text style={styles.budgetName}>Internet</Text>
              <Text style={styles.budgetLeftOut}>left out IDR 1293849</Text>
            </View>
            <View style={styles.budgetAmountWrapper}>
              <Text style={styles.budgetAmount}>IDR 800.000</Text>
            </View>
          </View>
          <View>
            <LinearProgress value={78} />
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.budgetTextWrapper}>
            <View>
              <Text style={styles.budgetName}>Health Care</Text>
              <Text style={styles.budgetLeftOut}>left out IDR 1293849</Text>
            </View>
            <View style={styles.budgetAmountWrapper}>
              <Text style={styles.budgetAmount}>IDR 800.000</Text>
            </View>
          </View>
          <View>
            <LinearProgress value={25} />
          </View>
        </View>
      </ScrollView>
    
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
    fontSize: 50,
    color: '#231c16',
    marginBottom: 10,
  },
  progressContainer: {
    paddingBottom: 20,
    marginBottom: 15,
    borderColor: '#e0d6ce',
    borderBottomWidth: '1px'
  },
  budgetTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 3
  },
  budgetName: {
    color: '#231c16',
    fontSize: 16,
    fontWeight: 'bold'
  },
  budgetLeftOut: {
    fontSize: 12
  },
  budgetAmountWrapper: {
    flex: 1,
    alignItems: 'flex-end'
  },
  budgetAmount: {
    color: '#231c16',
    paddingTop: 6,
    fontWeight: 'bold',
    fontSize: 16
  },
})

export default BudgetScreen
