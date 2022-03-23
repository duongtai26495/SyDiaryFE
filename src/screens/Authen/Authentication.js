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

const Authentication = ({navigation, route}) => {
    const goToSignIn = () =>{
        navigation.dispatch(StackActions.replace(Navigation_path.SIGNIN))
    }
    const goToSignUp = () =>{
        navigation.dispatch(StackActions.replace(Navigation_path.SIGNUP))
    }
    return (
        <SafeAreaView style={authen_styles.container}>
            <Image source={Images_path.BG1} style={authen_styles.bg} />
            <ScrollView>
                <View style={authen_styles.container_authen}>
                    <View>
                        <Image source={Icons_path.LOGO_CIRCLE} style={authen_styles.logo} />
                        <Text style={authen_styles.headerAuthen}>{Variable_string.AUTHENHEADER}</Text>
                    </View>

                    <View style={authen_styles.authen_navi_button}>
                        <TouchableOpacity style={authen_styles.buttonGo} onPress={()=>goToSignIn()}>
                            <Text style={authen_styles.titleButton}>{Variable_string.SIGNIN}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>goToSignUp()} style={{ ...authen_styles.buttonGo, backgroundColor: Colors.PRIMARY }}>
                            <Text style={authen_styles.titleButton}>{Variable_string.SIGNUP}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Authentication