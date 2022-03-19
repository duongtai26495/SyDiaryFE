import { StyleSheet, Dimensions } from 'react-native'
import NativeHeadlessJsTaskSupport from 'react-native/Libraries/ReactNative/NativeHeadlessJsTaskSupport';
import { Colors } from '../../assets/colors'
const width = Dimensions.get('screen').width;
const widthComponent = width/1.2
const main_styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flex:1,
        backgroundColor:Colors.WHITE,
        padding:10,
        alignItems:'center'
        },
        main:{
            width:widthComponent,
            height:'100%',
        },
        logo:{
            width:width/4,
            height:width/4,
            alignSelf:'center',
            marginTop:20,
        },
        authen_form:{
            width:'100%',
            alignSelf:'center',
            marginVertical:10,
        },
        input:{
            width:'100%',
          color:Colors.SECONDARY,
          fontSize:15,
          marginEnd:5,
          alignItems:'center',
        },
        buttonGo:{
            width:'100%',
            backgroundColor:Colors.SECONDARY,
            padding:15,
            borderRadius:5,
            marginVertical:10,
            elevation:3,
            shadowColor:Colors.DARK,
            flexDirection:'row',
            justifyContent:'center'
        },
        titleButton:{
            color:Colors.WHITE,
            fontSize:20,
            alignSelf:'center',
            marginEnd:20,
            fontWeight:'bold',
        },
        header:{
            fontSize:25,
            color:Colors.SECONDARY,
            fontWeight:'bold',
            marginTop:25,
        },
        inputLogin:{
            width:'100%',
            color:Colors.SECONDARY,
            fontSize:15,
            padding:5,
            backgroundColor:Colors.WHITE,
            borderRadius:5,
            borderWidth:0.5,
            borderColor:Colors.PRIMARY,
            marginVertical:10,
            flexDirection:'row'
        },
        iconInput:{
            width:20,
            height:20,
            alignSelf:'center',
        },
        rememberView:{
            flexDirection:'row',
            justifyContent:'flex-end'
        },
        rememberText:{
            color:Colors.SECONDARY,
            alignSelf:'center'
        },
        iconSecu:{
            width:20,
            height:20,
            alignSelf:'center'
        }
        
})
export default main_styles