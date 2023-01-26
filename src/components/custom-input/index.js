import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secured}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secured}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    padding: 13,
    marginVertical: 5,
  },
  input: {
    
  }
})

export default CustomInput;