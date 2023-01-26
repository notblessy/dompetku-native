import * as React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../../libs/contexts/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SignInScreen, SignUpScreen } from '../../screens/auth';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Budgets"
        onPress={() => navigation.navigate('Budgets')}
      />
    </View>
  );
}

function BudgetsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Budgets Screen</Text>
      <Button
        title="Go to Budgets... again"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function Account({ navigation }) {
  const { onLogout } = useAuth()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Account Screen</Text>
      <Button
        title="Logout"
        onPress={(e) => {
          e.preventDefault();
          onLogout()
        }}
      />
    </View>
  );
}

function HomeTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Budgets" component={BudgetsScreen} />
    </Stack.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NavBar = ({value, setValue, placeholder, secured}) => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
    {user ?
       <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Budgets') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />
        <Tab.Screen name="Budgets" component={BudgetsScreen} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    :
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
    }
   
  </NavigationContainer>
  )
}

export default NavBar;