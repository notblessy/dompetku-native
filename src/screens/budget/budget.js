import { ScrollView, StyleSheet, Text, View } from "react-native"
import CustomButton from "../../components/custom-button";
import LinearProgress from "../../components/linear-progress"
import { useBudgets } from "../../libs/hooks/budget";

const BudgetScreen = ({ navigation }) => {
  const { data: budgets } = useBudgets()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets</Text>
      <ScrollView>
        {
          budgets?.data ? budgets?.data.map((b) => {
            return (
              <View style={styles.progressContainer}>
                <View style={styles.budgetTextWrapper}>
                  <View>
                    <Text style={styles.budgetName}>{b.name}</Text>
                    <Text style={styles.budgetLeftOut}>left out IDR {b.left_out}</Text>
                  </View>
                  <View style={styles.budgetAmountWrapper}>
                    <Text style={styles.budgetAmount}>IDR {b.amount.toLocaleString()}</Text>
                  </View>
                </View>
                <View>
                  <LinearProgress value={b.progress} />
                </View>
              </View>
            )
          }) : null
        }
        <View style={styles.buttonWrapper}>
          <CustomButton  text="Add Wallet" type="PRIMARY_SM" onPress="" />
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
                open={openDropDown}
                setOpen={setOpenDropDown}
                items={currencies?.data ? currencies?.data.map((c) => {
                  return {
                    label: c.name,
                    value: c.id
                  }
                }) : null}
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

export default BudgetScreen
