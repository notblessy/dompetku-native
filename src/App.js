import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthProvider, useAuth } from './libs/contexts/auth';

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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Budgets" component={BudgetsScreen} />
    </Stack.Navigator>
  )
}



function SignIn({ navigation }) {
  const { onLogin } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign In Screen</Text>
      <Button
       title="Sign in"
       onPress={() => onLogin()}
      />
    </View>
  );
}

function Register({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign In Screen</Text>
      <Button
        title="Sign Up Screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Nav = () => {
  const { user } = useAuth()
  console.log(user)

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
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
    }
   
  </NavigationContainer>
  )
}

export default function App() {
  return (
     <AuthProvider>
      <Nav />
     </AuthProvider>
  );
}
