import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const LinearProgress = ({value}) => {
  let bgColor = ''
  if (value < 30) {
    bgColor = '#3D426B'
  } else if (value >= 30 && value < 50 ) {
    bgColor = '#538369'
  } else if (value >= 50 && value < 80) {
    bgColor = '#ffb347'
  } else if (value >= 80 && value < 100) {
    bgColor = '#ff5747'
  } else {
    bgColor = '#538369'
  }

  return (
    <View style={styles.wrapper}>
      <View style={{...styles.container, width: `${value}%`, backgroundColor: bgColor}}>
        <Text style={styles.text}>{value}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#d8ccc2',
    width: '100%',
    borderRadius: 5,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10
  },
  text: {
    color: 'white',
  }
})

export default LinearProgress;