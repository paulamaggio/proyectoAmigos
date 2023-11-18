import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register'
import Login from '../screens/Login'
import TabNavigation from './TabNavigation'
import Comments from '../screens/Comments';
import InfoAdicional from '../screens/InfoAdicional';
import PerfilAmigo from '../screens/PerfilAmigo';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
          <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown: false}}/>
          <Stack.Screen name='Comments' component={Comments} /> 
          <Stack.Screen name='InfoAdicional' component={InfoAdicional} options={{headerShown:false}}/>
          <Stack.Screen name='PerfilAmigo' component={PerfilAmigo} /> 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }