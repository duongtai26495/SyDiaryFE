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

const NewDiary = ({navigation, route}) => {

    const contentRef = useRef()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isLoading, setLoading] = useState(false)

    const goBackHome = () =>{
        navigation.goBack(route.params.onGoBack("1"))
    }

    const insertDiary = async (token) =>{
        setLoading(true)
        const api_url = Variable_string.BASE_URL+"diary/create";
        const Diary = {
            title:title,
            content:content
        }
        await axios.post(api_url, Diary, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then(()=>{
            setLoading(false)
            goBackHome()
        }).catch((error)=>{
            setLoading(false)
            console.log(error)
        });

    }
    const saveDiary = async () => {
        try {
            const access_token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
            if (access_token != null) {
                insertDiary(access_token)
                console.log("AT:",access_token)
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
                <Text style={new_styles.headerText}>{Variable_string.NEWDIARY}</Text>
           </View>
           <View style={new_styles.diary}>
                <TextInput 
                onSubmitEditing={()=> contentRef.current.focus()}
                style={new_styles.textDiary} 
                placeholder={Variable_string.TITLE+"..."}
                placeholderTextColor={Colors.PRIMARY}
                onChangeText={(value)=>setTitle(value)}
                returnKeyType='next'/>
                <TextInput 
                ref={contentRef}
                numberOfLines={10}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value)=>setContent(value)}
                style={new_styles.textDiary} 
                placeholder={Variable_string.CONTENT+"..."}
                placeholderTextColor={Colors.PRIMARY}/>
           </View>
           <View style={new_styles.buttonDiaryView}>
           <TouchableOpacity onPress={()=>saveDiary()}
           style={{...new_styles.buttonDiary,backgroundColor:Colors.PRIMARY}}>
               <Text style={new_styles.titleButtonDiary}>
                    {Variable_string.SAVE}
               </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{goBackHome()}} style={{...new_styles.buttonDiary,backgroundColor:Colors.SMOKE}}>
               <Text style={new_styles.titleButtonDiary}>
                    {Variable_string.CANCEL}
               </Text>
           </TouchableOpacity>
           </View>
          
        </ScrollView>
    </SafeAreaView>
  )
}

export default NewDiary