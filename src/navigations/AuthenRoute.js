import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import{
    SignIn, SignUp, Authentication
} from '../screens'

const AuthenRoute = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator 
    mode="modal"
    initialRouteName='Authentication'
    options={{
      headerShown: false,
      presentation: true,
      animationEnabled: true,
    }}>
        <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false, animation:'slide_from_right'}} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false, animation:'slide_from_left'}} />
        <Stack.Screen name='Authentication' component={Authentication} options={{headerShown:false, animation:'slide_from_right'}} />
    </Stack.Navigator>
  )
}

export default  AuthenRoute