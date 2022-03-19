import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import{
    Home,
    NewDiary,
    DiaryDetails
} from '../screens'

const HomeRoute = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen name='HomePage' component={Home} options={{headerShown:false, animation:'slide_from_right'}} />
        <Stack.Screen name='NewDiary' component={NewDiary} options={{headerShown:false, animation:'slide_from_right'}} />
        <Stack.Screen name='DiaryDetails' component={DiaryDetails} options={{headerShown:false, animation:'slide_from_right'}} />
    </Stack.Navigator>
  )
}

export default  HomeRoute