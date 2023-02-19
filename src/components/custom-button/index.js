import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"


const CustomButton = ({onPress, text, type, isLoading}) => {
  const buttonType = type ? type : "PRIMARY"
  const loading = isLoading ? isLoading : false
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${buttonType}`]]}>
      {
        isLoading ?
          <ActivityIndicator color="white" />
        :
          <Text style={[styles.text, styles[`text_${buttonType}`]]}>{text}</Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container_PRIMARY: {
    backgroundColor: '#836953',
    width: '100%',
    
    padding: 10,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
  text_PRIMARY: {
    color: 'white',
  },
  container_TERTIARY: {
    
  },
  text_TERTIARY: {
    color: '#231c16',
    paddingLeft: 3,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    flex: 1,
  },
  container_PRIMARY_SM: {
    backgroundColor: '#836953',
    width: '60%',
    
    padding: 10,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
  text_PRIMARY_SM: {
    color: 'white',
  },
})

export default CustomButton;