import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeRoute from '../navigations/HomeRoute'
import Icons_path from '../constants/Icons_path'
import { Colors } from '../assets/colors'
import { Profile } from '../screens'
const Tab = createMaterialBottomTabNavigator()
const iconSize = 25
const MainTab = () => {
  
    return (
        <Tab.Navigator
            initialRouteName='Home'
            shifting={true}
            activeColor={Colors.LIGHT}
            inactiveColor={Colors.PRIMARY}
            barStyle={{ backgroundColor: Colors.SECONDARY }}
            options={{
                headerShown: false,
                presentation: true,
                animationEnabled: true,
              }}>
            <Tab.Screen
                name='Home'
                component={HomeRoute}
                options={{
                    headerShown: false,
                    animation: true,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={Icons_path.HOME}
                                resizeMode='contain'
                                style={{
                                    width: iconSize,
                                    height: iconSize,
                                    tintColor: focused ? Colors.WHITE : Colors.PRIMARY
                                }}
                            />
                        </View>
                    )
                }} />

            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                    animation: true,
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity>
                            <Image
                                source={Icons_path.PROFILE}
                                resizeMode='contain'
                                style={{
                                    width: iconSize,
                                    height: iconSize,
                                    tintColor: focused ? Colors.WHITE : Colors.PRIMARY
                                }}
                            />
                        </TouchableOpacity>
                    )
                }} />
        </Tab.Navigator>
    )
}

export default MainTab