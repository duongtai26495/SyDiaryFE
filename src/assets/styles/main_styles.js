import { StyleSheet, Dimensions } from 'react-native'
const textColor = 'rgba(0,0,0,1)';
const background = 'rgba(255,255,255,1)';
const main_styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flex:1,
        backgroundColor:background,
        padding:10,
        },
    input:{
        color:textColor,
        padding:10,
        fontSize:15,
    },
    button:{
        backgroundColor:'rgba(200,100,100,1)',
        marginTop:10,
        borderRadius:5,
        padding:10,
    },
    text:{
        color:textColor,
        fontSize:15,
    },
    item:{
        width:'100%',
        marginVertical:5,
        borderColor:'rgba(50,50,50,1)',
        borderWidth:1,
        padding:5,
    },
    flatlist:{
        height:'100%',
        width:'100%',
        padding:5,
    },
    indicator: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
      },
      stopIndicator: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
      },
})
export default main_styles