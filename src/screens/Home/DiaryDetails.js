import { View, Text, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import main_styles from '../../assets/styles/main_styles'
import axios from 'axios'
import Variable_string from '../../constants/Variable_string'
import { Colors } from '../../assets/colors'
import Icons_path from '../../constants/Icons_path'
import new_styles from './new_styles'

const DiaryDetails = ({ navigation, route }) => {

  useEffect(() => {
    showDiary()
  }, [])

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [time, setTime] = useState("")
  const [isLoading, setLoading] = useState(false)
  const diary_id = route.params.diary_id

  const goBackHome = () => {
    navigation.goBack()
  }

  const getDiary = async (token) => {
    setLoading(true)
    const api_url = Variable_string.BASE_URL + "diary/" + diary_id;

    await axios.get(api_url, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    }).then((response) => {
      const result = response.data.data
      setTitle(result.title)
      setContent(result.content)
      setTime(result.lastEdited)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    });

  }
  const showDiary = async () => {
    try {
      const access_token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
      if (access_token != null) {
        getDiary(access_token)
        console.log("AT:", access_token)
      } else {
        console.log("User un login")
      }
    } catch (error) {
      console.log('Error: ' + error)
    }
  }
  return (
    <SafeAreaView style={new_styles.container}>
      <ActivityIndicator
        size={40}
        animationDuration={1500}
        color={Colors.PRIMARY}
        animating={isLoading ? true : false}
        style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
        hidesWhenStopped={true} />
      <ScrollView style={new_styles.main}>
        <View style={new_styles.headerBox}>
          <Text style={new_styles.headerText}>{title}</Text>
        </View>
        <View style={new_styles.diary}>
        <Text style={new_styles.textDiary} >{title}</Text>
          <Text style={new_styles.textDiary} >{content}</Text>
          <Text style={{...new_styles.textDiary,fontSize:12}} >{time}</Text>
        </View>
        <View style={new_styles.buttonDiaryView}>
          <TouchableOpacity onPress={() => saveDiary()}
            style={{ ...new_styles.buttonDiary, backgroundColor: Colors.PRIMARY }}>
            <Text style={new_styles.titleButtonDiary}>
              {Variable_string.EDIT}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { goBackHome() }} style={{ ...new_styles.buttonDiary, backgroundColor: Colors.SMOKE }}>
            <Text style={new_styles.titleButtonDiary}>
              {Variable_string.CANCEL}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default DiaryDetails