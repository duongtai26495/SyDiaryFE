import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../assets/colors';
const textColor = 'rgba(0,0,0,1)';
const background = 'rgba(255,255,255,1)';
const width = Dimensions.get('screen').width;
const widthComponent = width/1.1
const edit_styles = StyleSheet.create({
    editDiaryFullView:{
        width:'100%',
        height:'100%',
        position:'absolute',
        zIndex:99,
        backgroundColor:Colors.WHITE,
    },
    editDiaryView:{
        width:widthComponent,
        borderRadius:15,
        shadowColor:Colors.BLACK,
        backgroundColor:Colors.WHITE,
        elevation:3,
        padding:10,
        marginTop:20,
        alignSelf:'center',
        marginVertical:20,
    },
    formEditDiary:{
        color:Colors.SECONDARY,
    }

})
export default edit_styles
