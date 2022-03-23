import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, ScrollView, Switch, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogBox } from 'react-native';
import authen_styles from './authen_styles'
import Navigation_path from '../../constants/Navigation_path'
import Icons_path from '../../constants/Icons_path'
import { Colors } from '../../assets/colors'
import Variable_string from '../../constants/Variable_string'
import main_styles from '../../assets/styles/main_styles'
import Images_path from '../../constants/Images_path'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
const SignIn = ({ navigation, route }) => {
    useEffect(() => {
        getRememberState()
    }, [])

    const [username, setUsername] = useState(usernameRem)
    const [password, setPassword] = useState(passwordRem)
    const [usernameRem, setUsernameRem] = useState()
    const [passwordRem, setPasswordRem] = useState()

    const [remember, setRemember] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const passwordRef = useRef()

    const toggleRemember = () => setRemember(previousState => !previousState);

    const gotoSignUp = () => {
        navigation.dispatch(StackActions.replace('SignUp'))
    }
    const gotoHome = (token) => {
        navigation.dispatch(StackActions.replace(Navigation_path.MAINTAB, { accessToken: token }))
    }

    const clearAccessToken = async () => {
        try {
            await AsyncStorage.removeItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
                .then(() => {
                    console.log("Access token is null")
                })
        } catch (error) {
            console.log(error)
        }
    }

    const saveRememberState = async () => {
        await AsyncStorage.setItem(Variable_string.REMEMBER_STATE, remember ? 'true' : 'false').then(() => {
            if (remember) {
                AsyncStorage.setItem(Variable_string.USERNAME_REMEMBER, username);
                AsyncStorage.setItem(Variable_string.PASSWORD_REMEMBER, password);
            } else {
                AsyncStorage.removeItem(Variable_string.USERNAME_REMEMBER);
                AsyncStorage.removeItem(Variable_string.PASSWORD_REMEMBER);
            }
        })

    }

    const getRememberState = async () => {
        const rememberState = await AsyncStorage.getItem(Variable_string.REMEMBER_STATE)
        if (rememberState != null) {
            if (rememberState === 'true') {
                setRemember(true)
                getRememberValue()
            } else {
                setRemember(false)
                await AsyncStorage.removeItem(Variable_string.USERNAME_REMEMBER)
                await AsyncStorage.removeItem(Variable_string.PASSWORD_REMEMBER)
            }
        }
    }

    const getRememberValue = async () => {
        const usernameValue = await AsyncStorage.getItem(Variable_string.USERNAME_REMEMBER)
        const passwordValue = await AsyncStorage.getItem(Variable_string.PASSWORD_REMEMBER)
        if (usernameValue != null || passwordValue !== null) {
            setUsernameRem(usernameValue)
            setPasswordRem(passwordValue)
            setUsername(usernameValue)
            setPassword(passwordValue)
        } else {
            await AsyncStorage.setItem(Variable_string.REMEMBER_STATE, 'false')
        }
    }

    const saveAccessToken = async (token) => {
        try {
            await AsyncStorage.setItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE, token).then(() => {

                console.log('Save access token success: ' + token)
                saveRememberState()
                gotoHome(token)
            }).catch((error) => {
                console.log("Error save token: " + error)
            })
        } catch (err) {
            console.log('Error save access token')
        }
    }

    const dataLogin = ({
        'username': username,
        'password': password
    });


    const Login = async () => {
        setLoading(true)
        if (username != null || password != null) {
            clearAccessToken()
            const formData = new FormData();
            for (const name in dataLogin) {
                formData.append(name, dataLogin[name]);
            }
            const api_url = Variable_string.BASE_URL + "auth/login"

            await fetch(api_url, {
                method: 'POST',
                body: formData
            }).then((response) => {
                const result = response.json()
                result.then(data => {
                    const token = data.access_token
                    setLoading(false)
                    saveAccessToken(token)
                    saveUsername()
                }).catch((error) => {
                    setLoading(false)
                    console.log("Login Failed: ", error)
                })
            }).catch((error) => {
                setLoading(false)
                console.log("Login Failed: ", error)
            })
        }
    }

    const saveUsername = async () => {
        await AsyncStorage.setItem(Variable_string.USERNAME_STORAGE, username)
            .then(() => {
                console.log("Username saved", username);
            })
    }


    return (
        <SafeAreaView style={authen_styles.container}>
            <ActivityIndicator
                size={40}
                animationDuration={1500}
                color={Colors.PRIMARY}
                animating={isLoading ? true : false}
                style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
                hidesWhenStopped={true} />
            <Image source={Images_path.BG1} style={authen_styles.bg} />
            <ScrollView style={authen_styles.main}>
                <View>
                    {/* <Image source={Icons_path.LOGO_CIRCLE} style={authen_styles.logo} /> */}
                    <Text style={authen_styles.header}>
                        {Variable_string.WCBACK}
                    </Text>
                </View>
                <View style={authen_styles.authen_form}>
                    <View style={authen_styles.inputLogin}>
                        <Image source={Icons_path.USERNAME} style={authen_styles.iconInput} />
                        <TextInput
                            value={username}
                            returnKeyType='next'
                            onSubmitEditing={() => { passwordRef.current.focus() }}
                            autoCapitalize='none'
                            style={authen_styles.input}
                            placeholder={Variable_string.USERNAME}
                            placeholderTextColor={Colors.PRIMARY}
                            onChangeText={(value) => setUsername(value)}
                        />
                    </View>
                    <View style={authen_styles.inputLogin}>
                        <Image source={Icons_path.PASSWORD} style={authen_styles.iconInput} />
                        <TextInput
                            value={password}
                            ref={passwordRef}
                            onSubmitEditing={() => { Login() }}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            style={authen_styles.input}
                            placeholder={Variable_string.PASSWORD}
                            placeholderTextColor={Colors.PRIMARY}
                            onChangeText={(value) => setPassword(value)}
                        />

                    </View>
                    <View style={authen_styles.rememberView}>
                        <Text style={authen_styles.rememberText} >{Variable_string.REMEMBER}</Text>
                        <Switch
                            trackColor={{ false: Colors.DARK, true: Colors.PRIMARY }}
                            thumbColor={remember ? Colors.SECONDARY : Colors.LIGHT}
                            ios_backgroundColor={Colors.WHITE}
                            onValueChange={toggleRemember}
                            value={remember} />
                    </View>

                    <TouchableOpacity
                        style={authen_styles.buttonGo}
                        onPress={() => Login()}>
                        <Text style={authen_styles.titleButton}>
                            {Variable_string.GO.toUpperCase()}
                        </Text>
                        <Image source={Icons_path.GO} style={authen_styles.iconInput} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => gotoSignUp()}>
                        <Text style={authen_styles.navitext}>{Variable_string.NOTHAVEACCOUNT}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn