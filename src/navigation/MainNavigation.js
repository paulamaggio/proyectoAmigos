import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register'
import Login from '../screens/Login'
import TabNavigation from './TabNavigation'

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
          <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }