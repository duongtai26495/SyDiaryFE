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