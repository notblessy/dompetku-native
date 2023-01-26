import { StyleSheet, Text, TouchableOpacity } from "react-native"


const CustomButton = ({onPress, text, type}) => {
  const buttonType = type ? type : "PRIMARY"
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${buttonType}`]]}>
      <Text style={[styles.text, styles[`text_${buttonType}`]]}>{text}</Text>
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
})

export default CustomButton;