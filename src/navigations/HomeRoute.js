import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import{
    Home,
} from '../screens'

const HomeRoute = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator 
    mode="modal"
    initialRouteName='HomePage'
    options={{
      headerShown: false,
      presentation: true,
      animationEnabled: true,
    }}>
        <Stack.Screen name='HomePage' component={Home} options={{headerShown:false, animation:'slide_from_right'}} />
     </Stack.Navigator>
  )
}

export default  HomeRoute