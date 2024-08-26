import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutForm from './screens/CheckoutForm';
import Summary from './screens/Summary';
import { Provider } from 'react-redux';
import { store } from './store'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator options={{ headerShown: false}} initialRouteName="CheckoutForm">
        <Stack.Screen options={{ headerShown: false}}  name="CheckoutForm" component={CheckoutForm} />
        <Stack.Screen options={{ headerShown: false}} name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
