import React from 'react'
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import Logo from '../../../assets/icon.png'

import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useAuth } from '../../libs/contexts/auth';


const SignUpScreen = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { onLogin } = useAuth();

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [retypePass, setRetypePass] = React.useState('')

  return (
    <View style={styles.root}>
     <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
      <CustomInput placeholder="Name" value={name} setValue={setName} />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secured />
      <CustomInput placeholder="Re-type Password" value={retypePass} setValue={setRetypePass} secured />
      <CustomButton text="Sign Up" type="PRIMARY" onPress={() => onLogin({email, password})}/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F4F2',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 50,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 100,
    marginVertical: 30,
  }
})

export default SignUpScreen