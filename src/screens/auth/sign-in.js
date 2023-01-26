import React from 'react'
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import Logo from '../../../assets/icon.png'

import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useAuth } from '../../libs/contexts/auth';


const SignInScreen = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { onLogin } = useAuth();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <View style={styles.root}>
     <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secured />
      <CustomButton text="Sign In" type="PRIMARY" onPress={() => onLogin({email, password})}/>
      <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
        <Text style={{color: '#0b0907'}}>Don't have an account?</Text>
        <CustomButton text="Sign Up" type="TERTIARY" onPress={() => navigation.navigate("SignUp")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F4F2',
    alignItems: 'center',
    paddingTop: 150,
    paddingHorizontal: 50,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 100,
    marginVertical: 30,
  }
})

export default SignInScreen