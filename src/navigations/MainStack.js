import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTab from './MainTab'
import AuthenRoute from './AuthenRoute'
import { DiaryDetails} from '../screens'
const MainStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator 
    mode="modal"
    initialRouteName='MainTab'
    options={{
      headerShown: false,
      presentation: true,
      animationEnabled: true,
    }}>
        <Stack.Screen name='MainTab' component={MainTab} options={{headerShown:false, animation:'slide_from_right'}} />
        {/* Not bottom tab */}
        <Stack.Screen name='AuthenRoute' component={AuthenRoute} options={{headerShown:false, animation:'slide_from_right'}} />
       <Stack.Screen name='DiaryDetails' component={DiaryDetails} options={{headerShown:false, animation:'slide_from_bottom'}} />
    </Stack.Navigator>
  )
}

export default MainStack