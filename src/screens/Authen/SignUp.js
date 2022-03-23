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
const SignUp = ({ navigation, route }) => {

  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [cPassword, setCPassword] = useState()
  const [gender, setGender] = useState()

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const cPasswordRef = useRef()

  const [isLoading, setLoading] = useState(false)

  const gotoSignIn = () => {
    navigation.dispatch(StackActions.replace(Navigation_path.SIGNIN))
  }

  const Register = async () => {
    setLoading(true)
    const User = {
      fullName: fullName,
      email: email,
      username: username,
      password: password
    }
    const api_url = Variable_string.BASE_URL + "user/register"
    await axios.post(api_url, User)
      .then((response) => {
        console.log(response.data)
        setLoading(false)
        removeRemember()
        gotoSignIn();
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false)
          console.log(error)
        }
      })
  }

  const removeRemember = async () => {
    await AsyncStorage.setItem(Variable_string.REMEMBER_STATE, 'false')
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
      <Image source={Images_path.BG2} style={authen_styles.bg} />
      <ScrollView style={authen_styles.main}>
        <View>
          {/* <Image source={Icons_path.LOGO_CIRCLE} style={authen_styles.logo} /> */}
          <Text style={authen_styles.header}>
            {Variable_string.CRACCOUNT}
          </Text>
        </View>
        <View style={authen_styles.authen_form}>
          <View style={authen_styles.inputLogin}>
            <Image source={Icons_path.FULLNAME} style={authen_styles.iconInput} />
            <TextInput
              returnKeyType='next'
              onSubmitEditing={() => { emailRef.current.focus() }}
              autoCapitalize='words'
              style={authen_styles.input}
              placeholder={Variable_string.FULLNAME}
              placeholderTextColor={Colors.PRIMARY}
              onChangeText={(value) => setFullName(value)}
            />
          </View>
          <View style={authen_styles.inputLogin}>
            <Image source={Icons_path.EMAIL} style={authen_styles.iconInput} />
            <TextInput
              ref={emailRef}
              returnKeyType='next'
              onSubmitEditing={() => { usernameRef.current.focus() }}
              autoCapitalize='none'
              style={authen_styles.input}
              placeholder={Variable_string.EMAIL}
              placeholderTextColor={Colors.PRIMARY}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={authen_styles.inputLogin}>
            <Image source={Icons_path.USERNAME} style={authen_styles.iconInput} />
            <TextInput
              ref={usernameRef}
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
              ref={passwordRef}
              onSubmitEditing={() => { cPasswordRef.current.focus() }}
              autoCapitalize='none'
              secureTextEntry={true}
              style={authen_styles.input}
              placeholder={Variable_string.PASSWORD}
              placeholderTextColor={Colors.PRIMARY}
              onChangeText={(value) => setPassword(value)}
            />

          </View>
          <View style={authen_styles.inputLogin}>
            <Image source={Icons_path.PASSWORD} style={authen_styles.iconInput} />
            <TextInput
              ref={cPasswordRef}
              onSubmitEditing={() => { Register() }}
              autoCapitalize='none'
              secureTextEntry={true}
              style={authen_styles.input}
              placeholder={Variable_string.CPASSWORD}
              placeholderTextColor={Colors.PRIMARY}
              onChangeText={(value) => setCPassword(value)}
            />

          </View>

          <TouchableOpacity
            style={authen_styles.buttonGo}
            onPress={() => Register()}>
            <Text style={authen_styles.titleButton}>
              {Variable_string.GO.toUpperCase()}
            </Text>
            <Image source={Icons_path.GO} style={authen_styles.iconInput} />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => gotoSignIn()}>
            <Text style={authen_styles.navitext}>{Variable_string.HAVEACCOUNT}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp