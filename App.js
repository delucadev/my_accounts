import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Accounts from './src/pages/Accounts';
import NewAccount from './src/pages/NewAccount';
import Details from './src/pages/Details';
import Login from './src/pages/Login';
import NewUser from './src/pages/NewUser';

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Novo Usuario"
          component={NewUser}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Minhas Contas"
          component={Accounts}
          options={{
            headerTintColor:"#D9042B",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Nova Conta"
          component={NewAccount}
          options={{
            headerTintColor:"#D9042B"
          }}
        />
        <Stack.Screen
          name="Detalhes"
          component={Details}
          options={{
            headerTintColor:"#D9042B"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}