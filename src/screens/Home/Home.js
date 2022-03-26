import { View, Text, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
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
import new_styles from './new_styles'
import edit_styles from './edit_styles'
const Home = ({ navigation, route }) => {

    useEffect(() => {
        onRefresh()

    }, [accessToken])


    const [accessToken, setAccessToken] = useState()
    const [diaries, setDiaries] = useState([])
    const [isFetching, setFetching] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isNewDiary, setNewDiaryState] = useState(false)
    const [isEditState, setEditState] = useState(false)

    const contentRef = useRef()
    const contentEditRef = useRef()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [titleEdit, setTitleEdit] = useState("")
    const [contentEdit, setContentEdit] = useState("")
    const [idEdit, setIdEdit] = useState()

    const insertDiary = async () => {
        try {
            const token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE);
            if (token != null) {
                setLoading(true)
                const api_url = Variable_string.BASE_URL + "diary/create";
                const Diary = {
                    title: title,
                    content: content
                }
                await axios.post(api_url, Diary, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                }).then(() => {
                    setLoading(false)
                    setNewDiaryState(false)
                    onRefresh()
                }).catch((error) => {
                    setLoading(false)
                    console.log("Error 5: ", error)
                });

            }
        } catch (error) {
            console.log("Error 1: ", error)
        }

    }

    const newDiaryView = () => {
        if (isNewDiary) {
            return (
                <ScrollView style={new_styles.newDiaryFullView}>
                    <View style={new_styles.headerBox}>
                        <Text style={new_styles.headerText}>{Variable_string.NEWDIARY.toUpperCase()}</Text>
                    </View>
                    <View style={new_styles.diary}>
                        <TextInput
                            onSubmitEditing={() => contentRef.current.focus()}
                            style={new_styles.textDiary}
                            placeholder={Variable_string.TITLE + "..."}
                            placeholderTextColor={Colors.PRIMARY}
                            onChangeText={(value) => setTitle(value)}
                            returnKeyType='next' />
                        <TextInput
                            ref={contentRef}
                            numberOfLines={20}
                            multiline={true}
                            textAlignVertical="top"
                            onChangeText={(value) => setContent(value)}
                            style={new_styles.textDiary}
                            placeholder={Variable_string.CONTENT + "..."}
                            placeholderTextColor={Colors.PRIMARY} />
                    </View>
                    <View style={new_styles.buttonDiaryView}>
                        <TouchableOpacity
                            onPress={() => { setNewDiaryState(false) }}
                            style={{
                                ...new_styles.buttonDiary,
                                backgroundColor: Colors.LIGHT,
                                borderWidth: 1,
                                borderColor: Colors.SECONDARY,
                                marginEnd: 3
                            }}>
                            <Text style={{ ...new_styles.titleButtonDiary, color: Colors.SECONDARY }}>
                                {Variable_string.CANCEL}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => insertDiary()}
                            style={{
                                ...new_styles.buttonDiary,
                                backgroundColor: Colors.PRIMARY,
                                marginStart: 3
                            }}>
                            <Text style={new_styles.titleButtonDiary}>
                                {Variable_string.SAVE}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )
        }
    }

    const getAccessToken = async () => {
        try {
            const access_token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE)
            if (access_token != null) {
                setAccessToken(access_token)
                getDiaries(access_token)
                console.log("AT:", access_token)
            } else {
                setLoading(false)
                setFetching(false)
                setAccessToken("")
                console.log("User un login")
                navigation.dispatch(StackActions.replace(Navigation_path.AUTHENROUTE))
            }
        } catch (error) {
            console.log('Error 2: ' + error)
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
                setFetching(false)
                setLoading(false)
                setDiaries(content)
            }).catch((error) => {
                console.log("Error 6: ", error)
                setFetching(false)
                setLoading(false)
            })
    }

    const deleteDiary = async (id) => {
        try {
            const token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE);
            if (token != null) {
                const api_url = Variable_string.BASE_URL + "diary/delete/" + id;
                await axios.delete(api_url, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then((response) => {
                    console.log(response.data.status)
                    onRefresh()
                }).catch((error) => {
                    console.log("Delete failed :", error)
                })
            }
        } catch (error) {
            console.log("Get token error: ", error)
        }

    }

    const dataRender = ({ item }) => {
        const content = item.content.slice(0, 50) + "..."
        const title = item.title
        const date = item.lastEdited
        const diary_id = item.id
        return (
            <View key={diary_id} style={home_styles.diaryBox}>
                <TouchableOpacity onPress={() => { navigation.navigate(Navigation_path.DIARYDETAILS, { diary_id: item.id }) }}>
                    <Text numberOfLines={1} style={home_styles.diaryTitle}>{title}</Text>
                    <Text numberOfLines={1} style={home_styles.diaryDesc}>{content}</Text>
                    <Text style={home_styles.diaryTime}>{date}</Text>
                </TouchableOpacity>
            </View>

        )
    }

    const dataHiddenRender = ({ item }) => {
        return (

            <View style={home_styles.hiddenView}>
                <TouchableOpacity onPress={() => { oPenEditDiaryContentView(item.id) }} style={{ ...home_styles.hiddenBox, backgroundColor: Colors.PRIMARY }}>
                    <Image source={Icons_path.EDIT} style={home_styles.iconHiddenBox} />
                    <Text style={home_styles.titleHiddenBox}>
                        {Variable_string.EDIT}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { deleteDiary(item.id) }} style={{ ...home_styles.hiddenBox, backgroundColor: Colors.RED }}>
                    <Image source={Icons_path.DELETE} style={home_styles.iconHiddenBox} />
                    <Text style={home_styles.titleHiddenBox}>
                        {Variable_string.DELETE}
                    </Text>
                </TouchableOpacity>
            </View>

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
                <TouchableOpacity onPress={() => setNewDiaryState(true)} activeOpacity={0.6} style={home_styles.emptyBoxAddNew}>
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
                <TouchableOpacity style={home_styles.addButton} onPress={() => setNewDiaryState(true)}>
                    <Image source={Icons_path.NEW} style={home_styles.addButtonImage} />
                </TouchableOpacity>
            )
        }
    }

    const onRefresh = () => {
        setFetching(true);
        getAccessToken()
    }

    const oPenEditDiaryContentView = async (id) => {
        setLoading(true)
        try {
            const token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE);
            if (token != null) {
                const url_api = Variable_string.BASE_URL + "diary/" + id
                axios.get(url_api,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then((response) => {
                        const result = response.data;
                        console.log(result)
                        setTitleEdit(result.data.title)
                        setContentEdit(result.data.content)
                        setIdEdit(result.data.id)
                        setEditState(true)
                        setLoading(false)
                    }).catch((error) => {
                        setLoading(false)
                        console.log("Error 3: ", error)
                    })
            }
        } catch (error) {
            setLoading(false)
            console.log("Error 4: ", error)
        }
    }

    const editDiaryView = () => {
        if (isEditState) {
            return (

                <ScrollView style={edit_styles.editDiaryFullView}>
                    <View style={new_styles.headerBox}>
                        <Text style={new_styles.headerText}>{Variable_string.EDITDIARY}</Text>
                    </View>
                    <View style={edit_styles.editDiaryView}>
                        <TextInput
                            style={edit_styles.formEditDiary}
                            placeholder={Variable_string.TITLE}
                            placeholderTextColor={Colors.PRIMARY}
                            value={titleEdit}
                            onChangeText={(value) => { setTitleEdit(value) }}
                            onSubmitEditing={() => { contentEditRef.current.focus() }} />
                        <TextInput
                            ref={contentEditRef}
                            style={edit_styles.formEditDiary}
                            placeholder={Variable_string.CONTENT}
                            placeholderTextColor={Colors.PRIMARY}
                            numberOfLines={10}
                            multiline={true}
                            textAlignVertical="top"
                            onChangeText={(value) => { setContentEdit(value) }}
                            value={contentEdit}
                            onSubmitEditing={() => { contentEditRef.current.focus() }} />

                    </View>
                    <View style={new_styles.buttonDiaryView}>
                        <TouchableOpacity
                            onPress={() => { setEditState(false) }}
                            style={{
                                ...new_styles.buttonDiary,
                                backgroundColor: Colors.LIGHT,
                                borderWidth: 1,
                                borderColor: Colors.SECONDARY,
                                marginEnd: 3
                            }}>
                            <Text style={{ ...new_styles.titleButtonDiary, color: Colors.SECONDARY }}>
                                {Variable_string.CANCEL}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => saveEditDiary()}
                            style={{
                                ...new_styles.buttonDiary,
                                backgroundColor: Colors.PRIMARY,
                                marginStart: 3
                            }}>
                            <Text style={new_styles.titleButtonDiary}>
                                {Variable_string.SAVE}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )
        }
    }

    const saveEditDiary = async () => {
        setLoading(true)
        try {
            const token = await AsyncStorage.getItem(Variable_string.ACCESS_TOKEN_FROM_STORAGE);
            if (token != null) {
                const api_url = Variable_string.BASE_URL + "diary/edit/" + idEdit;
                axios.put(api_url, {
                    title: titleEdit,
                    content: contentEdit
                },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then((response) => {
                        console.log(response.data)
                        setEditState(false)
                        setLoading(false)
                        onRefresh()
                    }).catch((error) => {
                        setLoading(false)
                        console.log(error)
                    })
            }
        } catch (error) {
            setLoading(false)
            console.log("Error 7", error)
        }
    }

    return (
        <SafeAreaView>
            {buttonAdd()}
            {newDiaryView()}
            {editDiaryView()}
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
                renderHiddenItem={
                    dataHiddenRender
                }
                leftOpenValue={100}
                rightOpenValue={-100}
            />
        </SafeAreaView>
    )
}

export default Home