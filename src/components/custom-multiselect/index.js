import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CustomMultiselect = ({value, setValue, placeholder, secured, type}) => {
    const [ show, setShow ] = useState(false)
    const onPress = () => {
        setShow(!show)
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text>Select Category</Text>
        </TouchableOpacity>
        <View>

        </View>
        <ScrollView style={{...styles.dropDown, display: show ? 'flex' : 'none'}}>
            <TouchableOpacity style={styles.itemButtom}>
                <Text>INI MENU NNYA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
                <Text>INI MENU NNYA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
                <Text>INI MENU NNYA</Text>
            </TouchableOpacity>
        </ScrollView>
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
    elevation: 50,
    zIndex: 10
  },
  dropDown: {
    position: "absolute",
    bottom: 45,
    backgroundColor: "#FFF",
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    marginVertical: 5,

    elevation: 51,
    zIndex: 9
  },
  itemButtom: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  }
})

export default CustomMultiselect;