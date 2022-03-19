import { View, Text, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import authen_styles from './authen_styles'
import axios from 'axios'
import Navigation_path from '../../constants/Navigation_path'
import Variable_string from '../../constants/Variable_string'
const Profile = ({ navigation, route }) => {

    useEffect(()=>{
        checkLogin()
    },[isLogin])

    const [access_token, setAccessToken] = useState(route.params)
    const [isLogin, setLogin] = useState(false)

    const checkLogin = async () => {
        try {
            const token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE);
            if (token !== null) {
                setAccessToken(token)
                setLogin(true)
                console.log("AccessToken from Storage:",access_token)
            } else {
                setLogin(false)
                console.log("AccessToken is null")
                navigation.dispatch(StackActions.replace(Navigation_path.SIGNIN))
            }
        } catch (error) {
            console.log("Error check access token : "+ error)
        }   
    }

    const SignOut = async () =>{
        try {
            await AsyncStorage.removeItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
            .then(()=>{
                setAccessToken()
                checkLogin()
            })
        } catch (error) {
            
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <TouchableOpacity onPress={()=>{SignOut()}}>
                    <Text>Sign out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile