import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../assets/colors';
const textColor = 'rgba(0,0,0,1)';
const background = 'rgba(255,255,255,1)';
const width = Dimensions.get('screen').width;
const widthComponent = width/1.1
const new_styles = StyleSheet.create({

    newDiaryFullView:{
        position:'absolute',
        width:'100%',
        height:'100%',
        zIndex:99,
        backgroundColor:Colors.WHITE,
    },
    headerBox:{
        width:'100%',
        backgroundColor:Colors.SECONDARY,
        padding:10,
    },
    headerText:{
        color:Colors.WHITE,
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center'
    },
    diary:{
        marginVertical:15,
        alignSelf:'center',
        width:widthComponent,
        padding:10,
        borderRadius:15,
        backgroundColor:Colors.WHITE,
        elevation:5,
        shadowColor:Colors.BLACK,
    },
    textDiary:{
        width:'100%',
        color:Colors.SECONDARY,
        backgroundColor:Colors.WHITE,
        fontSize:20,
        padding:5,
    },
    titleButtonDiary:{
        color:Colors.WHITE,
        fontSize:15,
        fontWeight:'bold',
    },
    buttonDiary:{
        flex:1,
        borderRadius:10,
        padding:10,
        marginVertical:5,
    },
    buttonDiaryView:{
        alignSelf:'center',
        width:widthComponent,
        flexDirection:'row',
    }
})
export default new_styles