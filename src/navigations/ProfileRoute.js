import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import{
    Profile,
    SignIn,
    SignUp,
    Authentication
} from '../screens'

const ProfileRoute = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator 
    initialRouteName='ProfilePage'
    options={{
      headerShown: false,
      presentation: true,
      animationEnabled: true,
    }}>
        <Stack.Screen name='ProfilePage' component={Profile} options={{headerShown:false, animation:'slide_from_right'}} />
    </Stack.Navigator>
  )
}

export default  ProfileRoute