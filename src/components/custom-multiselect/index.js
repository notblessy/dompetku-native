import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CustomMultiselect = ({searchValue, setSearchValue, searchPlaceholder, searchable, placeholder}) => {
    const [ show, setShow ] = useState(false)
    const onPress = () => {
        setShow(!show)
    }

    return (
        <View>
          <TouchableOpacity style={styles.container} onPress={onPress}>
            {
              show ? <Text>Hide</Text> : <Text>{placeholder}</Text>
            }
          </TouchableOpacity>
          <View style={{...styles.dropDownContainer, display: show ? 'flex' : 'none',}}>
            {
              searchable ?
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholderTextColor="#efeae6"
                    style={styles.input}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    placeholder={searchPlaceholder}
                  />
                </View>
              : null
            }
            <ScrollView style={styles.dropDownWrapper}>
              <TouchableOpacity style={styles.itemButtom}>
                  <Text style={styles.itemSelected}>INI MENU 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButtom}>
                  <Text>INI MENU 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButtom}>
                  <Text>INI MENU 3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButtom}>
                  <Text>INI MENU 4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButtom}>
                  <Text>INI MENU 5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButtom}>
                  <Text>INI MENU 6</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
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
  dropDownContainer: {
    position: "absolute",
    width: '100%',
    top: 51,
    elevation: 51,
    zIndex: 9,

    backgroundColor: "#FFF",
    maxHeight: 150,

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
  },
  itemButtom: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  itemSelected: {
    color: "#836953"
  },
  inputContainer: {
    width: '100%',
    padding: 13,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
})

export default CustomMultiselect;