import { View, Text, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import main_styles from '../../assets/styles/main_styles'
import axios from 'axios'
import Variable_string from '../../constants/Variable_string'
const Home = ({ navigation, route }) => {
    useEffect(() => {
        getAccessToken()
    }, [accessToken])
    const [accessToken, setAccessToken] = useState(route.params)

    const [content, setContent] = useState([])
 
    const clearAccessToken = async () => {
        try {
            await AsyncStorage.removeItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
                .then(() => {
                    getAccessToken()
                })
        } catch (error) {
            console.log('Error: ' + error)
        }
    }
    const getAccessToken = async () => {
        try {
            const access_token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
            if (access_token != null) {
                setAccessToken(access_token)
                fetchData(access_token)
                console.log(accessToken)
            } else {
                setAccessToken("")
                setContent([])
                console.log("User un login")
            }
        } catch (error) {
            console.log('Error: ' + error)
        }
    }

    const fetchData = async (token) => {
        const api_url = "http://192.168.1.15:8080/diary/all"
        await axios.get(api_url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                const content = response.data.data
                setContent(content)
            }).catch((error) => {
                console.log(error)
            })
    }

    const dataRender = ({ item }) => {
        const content = item.content.slice(0,30) + "..."
        const title = item.title
        const date = item.lastEdited

        return (
            <TouchableOpacity>
                <View style={main_styles.item}>
                    <Text style={{ color: 'rgba(0,0,0,1)', fontSize: 20, fontWeight: 'bold' }}>
                        {title}
                    </Text>
                    <Text style={main_styles.text}>
                        {content}
                    </Text>
                    <Text style={main_styles.text}>
                        {date}
                    </Text>
                </View>
            </TouchableOpacity>

        )
    }
    return (
        <SafeAreaView>
            <FlatList
                style={main_styles.flatlist}
                renderItem={dataRender}
                data={content.reverse()}
                keyExtractor={(item, index) => { index.toString() }}
                ListHeaderComponent={
                    <View style={main_styles.button}>
                        <Text style={main_styles.text}>List of Diary</Text>
                    </View>
                }
               />
        </SafeAreaView>
    )
}

export default Home