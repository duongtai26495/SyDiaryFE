import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Variable_string from './src/constants/Variable_string'
import ProfileRoute from './src/navigations/ProfileRoute'
import MainStack from './src/navigations/MainStack'
const App = () => {

  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  )
}

export default App