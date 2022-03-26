import { RefreshControl, View, Text, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import authen_styles from './authen_styles'
import axios from 'axios'
import Navigation_path from '../../constants/Navigation_path'
import Variable_string from '../../constants/Variable_string'
import Icons_path from '../../constants/Icons_path'
import Images_path from '../../constants/Images_path'
import main_styles from '../../assets/styles/main_styles'
import { Colors } from '../../assets/colors'
const Profile = ({ navigation, route }) => {

    useEffect(() => {
        checkLogin()

    }, [isLogin])

    const cPasswordRef = useRef()

    const [avatar, setAvatar] = useState(Images_path.DEFAULT)
    const [fullName, setFullName] = useState(Variable_string.FULLNAME)
    const [username, setUsername] = useState(Variable_string.USERNAME)
    const [email, setEmail] = useState(Variable_string.EMAIL)
    const [newPassword, setNewPassword] = useState()
    const [cNewPassword, setCNewPassword] = useState()

    const [isLogin, setLogin] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isFetching, setFetching] = useState(false)
    const [isUpdatePw, setUpdatePw] = useState(false)
    const [isUpdated, setUpdated] = useState(false)
    const [isSignOut, setSignOut] = useState(false)


    const toggleChangePw = () => setUpdatePw(previousState => !previousState)

    const checkLogin = async () => {
        setLoading(true)
        try {
            const token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE);
            if (token !== null) {
                getUserProfile(token)
                console.log("AccessToken from Storage:", token)
                setLogin(true)
                setLoading(false)
            } else {
                setLogin(false)
                console.log("AccessToken is null")
                setLoading(false)
                navigation.dispatch(StackActions.replace(Navigation_path.AUTHENROUTE))
            }
        } catch (error) {
            console.log("Error check access token : " + error)
        }
    }

    const SignOut = async () => {
        try {
            await AsyncStorage.removeItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
            await AsyncStorage.removeItem(Variable_string.USERNAME_STORAGE)
                .then(() => {
                    checkLogin()
                })
        } catch (error) {

        }
    }

    const changePassword = async () => {

        const url_api = Variable_string.BASE_URL + "user/change_password"
        if (newPassword != null) {

            try {
                const token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE);
                if (token !== null) {
                    await axios.put(url_api,
                        {
                            password: newPassword
                        },
                        {
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        }).then((respone) => {
                            const result = respone.data
                            if (result.status === 'SUCCESS') {
                                console.log(result.status)
                                setUpdatePw(false)
                                setUpdated(true)
                            }
                        })
                } else {
                    setLogin(false)
                    console.log("AccessToken is null")
                    navigation.dispatch(StackActions.replace(Navigation_path.AUTHENROUTE))
                }
            } catch (error) {
                console.log("Error check access token : " + error)
            }
        }
    }

    const pwUpdated = () => {
        if (isUpdated) {
            return (
                <View style={authen_styles.updatedViewFull}>
                    <View style={authen_styles.updatedView}>
                        <Text style={authen_styles.updatedPwTitle}>{Variable_string.PWUPDATEDWARN}</Text>
                        <TouchableOpacity onPress={() => { SignOut() }} style={authen_styles.updatePwButton}>
                            <Text style={authen_styles.updatePwText}>{Variable_string.AGREE}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    const updatePasswordView = () => {
        if (isUpdatePw) {
            return (
                <View style={authen_styles.changePwViewFull}>

                    <View style={authen_styles.changePwView}>
                        <Text style={authen_styles.titleUpdatePw}>{Variable_string.UPDATEPW}</Text>
                        <View style={authen_styles.newPwInput}>
                            <Image source={Icons_path.PASSWORD} style={authen_styles.iconInput} />
                            <TextInput
                                autoCapitalize='none'
                                secureTextEntry={true}
                                style={authen_styles.input}
                                placeholder={Variable_string.NEWPW}
                                placeholderTextColor={Colors.PRIMARY}
                                onChangeText={(value) => setNewPassword(value)}
                            />

                        </View>
                        <View style={authen_styles.newPwInput}>
                            <Image source={Icons_path.PASSWORD} style={authen_styles.iconInput} />
                            <TextInput
                                ref={cPasswordRef}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                style={authen_styles.input}
                                placeholder={Variable_string.CNEWPW}
                                placeholderTextColor={Colors.PRIMARY}
                                onChangeText={(value) => setCNewPassword(value)}
                            />

                        </View>
                        <TouchableOpacity onPress={() => changePassword()} style={authen_styles.updatePwButton}>
                            <Text style={authen_styles.updatePwText}>{Variable_string.DONE}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleChangePw()} style={{ ...authen_styles.updatePwButton, backgroundColor: Colors.SMOKE }}>
                            <Text style={authen_styles.updatePwText}>{Variable_string.CANCEL}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        }
    }

    const getUserProfile = async (token) => {
        
        setLoading(true)

        const FULLNAME = await AsyncStorage.getItem(Variable_string.FULLNAME_STORAGE);
        const USERNAME = await AsyncStorage.getItem(Variable_string.USERNAME_STORAGE);
        const EMAIL = await AsyncStorage.getItem(Variable_string.EMAIL_STORAGE);

        if(FULLNAME != null && USERNAME != null && EMAIL != null){
            setFullName(FULLNAME)
            setEmail(EMAIL)
            setUsername(USERNAME)
            setLoading(false)
            setFetching(false)
        }else{
            const username_storage = await AsyncStorage.getItem(Variable_string.USERNAME_STORAGE)
            console.log("Username: " + username_storage)
            if (username_storage != null) {
                const url_api = Variable_string.BASE_URL + "user/profile/" + username_storage;
                await axios.get(url_api, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                }).then((response) => {
                    const result = response.data.data
                    const fName = result.fullName
                    const mail = result.email
                    const uname = result.username
                    setFullName(fName)
                    setEmail(mail)
                    setUsername(uname)
                    
                    AsyncStorage.setItem(Variable_string.FULLNAME_STORAGE, fName)
                    AsyncStorage.setItem(Variable_string.USERNAME_STORAGE, mail)
                    AsyncStorage.setItem(Variable_string.EMAIL_STORAGE, uname)
    
                    setLoading(false)
                    setFetching(false)
                }).catch((error) => {
                    setLoading(false)
                    setFetching(false)
                    console.log("Fetch user: ", error)
                })
            } else {
                setLoading(false)
            }
        }
      

    }
    const onRefresh = () => {
        setFetching(true);
        checkLogin()
    };

    const signOutConfirm = () => {
        if (isSignOut) {
            return (
                <View style={authen_styles.signOutViewFull}>
                    <View style={authen_styles.signOutView}>
                        <Text style={authen_styles.signOutHeader}>{Variable_string.CONFIRMSIGNOUT}</Text>
                        <View style={authen_styles.confirmSignOutView} >
                            <TouchableOpacity 
                            onPress={()=>setSignOut(false)}
                            style={{
                                ...authen_styles.buttonConfirmSignOut,
                                backgroundColor: Colors.LIGHT,
                                borderWidth: 1,
                                borderColor: Colors.SECONDARY
                            }}>
                                <Text style={{ ...authen_styles.titleButton, color: Colors.SECONDARY }}>{Variable_string.CANCEL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>{SignOut()}}
                            style={{ 
                                ...authen_styles.buttonConfirmSignOut, 
                                backgroundColor: Colors.SECONDARY }}>
                                <Text style={authen_styles.titleButton}>{Variable_string.AGREE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            )
        }
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
            {pwUpdated()}
            {updatePasswordView()}
            {signOutConfirm()}
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
                }
                style={authen_styles.mainProfile}>
                <View style={authen_styles.topViewProfile}>
                    <Image source={avatar} style={authen_styles.avatar} />
                    <Text style={authen_styles.fullName}>{fullName}</Text>
                    <Text style={authen_styles.username}>{username}</Text>
                </View>
                <View style={authen_styles.titleView}>
                    <Text style={authen_styles.titleBox}>{Variable_string.ACCOUNTINFO}</Text>
                    <View style={authen_styles.titleLine} />
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={authen_styles.boxFunction}>
                    <Image source={Icons_path.INFO} style={authen_styles.iconsBox} />
                    <Text style={authen_styles.titleFunction}>{Variable_string.ACCOUNTINFO}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => toggleChangePw()}
                    activeOpacity={0.7}
                    style={authen_styles.boxFunction}>
                    <Image source={Icons_path.CHANGEPW} style={authen_styles.iconsBox} />
                    <Text style={authen_styles.titleFunction}>{Variable_string.CHANGEPW}</Text>
                </TouchableOpacity>


                <TouchableOpacity style={authen_styles.buttonSignOut} onPress={() => { setSignOut(true) }}>
                    <Text style={authen_styles.titleButton}>Sign out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile