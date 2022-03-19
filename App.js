import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainTab from './src/navigations/MainTab'
const App = () => {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  )
}

export default App