import { View, Text, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import main_styles from '../../assets/styles/main_styles'
import axios from 'axios'
import Variable_string from '../../constants/Variable_string'
import home_styles from './home_styles'
import { Colors } from '../../assets/colors'
import Icons_path from '../../constants/Icons_path'
import Navigation_path from '../../constants/Navigation_path'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
const Home = ({ navigation, route }) => {

    useEffect(() => {
        onRefresh()

    }, [accessToken, isRefresh])

    const newDiary = () => {
        navigation.navigate(Navigation_path.NEWDIARY, {
            onGoBack: (value) => {
                setRefresh(value)
            }
        })
    }

    const [accessToken, setAccessToken] = useState()
    const [diaries, setDiaries] = useState([])
    const [isFetching, setFetching] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isRefresh, setRefresh] = useState("0")
    const [isLogin, setLogin] = useState(false)


    const getAccessToken = async () => {
        try {
            const access_token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
            if (access_token != null) {
                setLogin(true)
                setAccessToken(access_token)
                getDiaries(access_token)
                console.log("AT:", access_token)
            } else {
                setLogin(false)
                setLoading(false)
                setFetching(false)
                setAccessToken("")
                console.log("User un login")
                navigation.dispatch(StackActions.replace(Navigation_path.AUTHENROUTE))
            }
        } catch (error) {
            console.log('Error: ' + error)
        }
    }

    const getDiaries = async (token) => {
        setLoading(true)
        const api_url = Variable_string.BASE_URL + "diary/all"
        await axios.get(api_url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                const content = response.data.data
                setRefresh("0")
                setFetching(false)
                setLoading(false)
                setDiaries(content)
            }).catch((error) => {
                setRefresh("0")
                console.log(error)
                setFetching(false)
                setLoading(false)
            })
    }


    const dataRender = ({ item }) => {
        const content = item.content.slice(0, 50) + "..."
        const title = item.title
        const date = item.lastEdited
        const diary_id = item.id
        return (
            <View key={diary_id} style={home_styles.diaryBox}>
                <TouchableOpacity onPress={() => { navigation.navigate(Navigation_path.DIARYDETAILS, { diary_id: item.id }) }}>
                    <Text style={home_styles.diaryTitle}>{title}</Text>
                    <Text style={home_styles.diaryDesc}>{content}</Text>
                    <Text style={home_styles.diaryTime}>{date}</Text>
                </TouchableOpacity>
            </View>

        )
    }

    const dataHiddenRender = () => {
        return (
                <TouchableHighlight style={home_styles.hiddenDeleteBox}>
                    <Text>
                        {Variable_string.DELETE}
                    </Text>
                </TouchableHighlight>

        )
    }

    const headerComponent = () => {
        return (
            <View style={home_styles.headerBox}>
                <Text style={home_styles.titleHeader}>
                    {Variable_string.SYDIARY.toUpperCase()}
                </Text>
            </View>
        )
    }

    const emptyDiary = () => {
        return (
            <View style={home_styles.emptyBox}>
                <TouchableOpacity onPress={() => newDiary()} activeOpacity={0.6} style={home_styles.emptyBoxAddNew}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={home_styles.textEmpty}>{Variable_string.NODIARY}</Text>
                        <Text style={home_styles.textEmpty}>{Variable_string.PREESSADDNEW}</Text>
                    </View>
                    <Image source={Icons_path.ADDNEW} style={home_styles.iconAddnew} />
                </TouchableOpacity>
            </View>
        )
    }

    const buttonAdd = () => {
        if (diaries != 0) {
            return (
                <TouchableOpacity style={home_styles.addButton} onPress={() => newDiary()}>
                    <Image source={Icons_path.NEW} style={home_styles.addButtonImage} />
                </TouchableOpacity>
            )
        }
    }
    const onRefresh = () => {
        setFetching(true);
        getAccessToken()
    };

    return (
        <SafeAreaView>
            {buttonAdd()}
            <ActivityIndicator
                size={40}
                animationDuration={1500}
                color={Colors.PRIMARY}
                animating={isLoading ? true : false}
                style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
                hidesWhenStopped={true} />
            <SwipeListView
                style={home_styles.flatlist}
                renderItem={dataRender}
                data={diaries}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={onRefresh}
                refreshing={isFetching}
                ListHeaderComponent={
                    headerComponent()
                }
                ListEmptyComponent={
                    emptyDiary()
                }
                renderHiddenItem={(data, rowMap) => (
                    dataHiddenRender()
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        </SafeAreaView>
    )
}

export default Home