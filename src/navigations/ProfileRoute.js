import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import{
    Profile,
    SignIn,
    SignUp
} from '../screens'

const ProfileRoute = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='ProfilePage'>
        <Stack.Screen name='ProfilePage' component={Profile} options={{headerShown:false, animation:'slide_from_right'}} />
        <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false, animation:'slide_from_right'}} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false, animation:'slide_from_right'}} />
    </Stack.Navigator>
  )
}

export default  ProfileRoute