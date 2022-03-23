import { StyleSheet, Dimensions } from 'react-native'
import NativeHeadlessJsTaskSupport from 'react-native/Libraries/ReactNative/NativeHeadlessJsTaskSupport';
import { Colors } from '../../assets/colors'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const widthComponent = width / 1.2
const main_styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: Colors.LIGHT,
        alignItems: 'center'
    },
    main: {
        width: '100%',
        height: '100%',
        marginVertical: 10,
    },
    mainProfile:{
        width: '100%',
        height: '100%',
        marginVertical: 10,
    },
    logo: {
        width: width / 4,
        height: width / 4,
        alignSelf: 'center',
        marginTop: width/4
    },
    authen_form: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    input: {
        width: '100%',
        color: Colors.SECONDARY,
        fontSize: 15,
        marginEnd: 5,
        alignItems: 'center',
    },
    buttonGo: {
        width: widthComponent,
        backgroundColor: Colors.SECONDARY,
        padding: 10,
        borderRadius: 25,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center',
    },
    buttonSignOut:{
        width:widthComponent,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 25,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center',
    },
    titleButton: {
        color: Colors.WHITE,
        fontSize: 20,
        alignSelf: 'center',
        marginEnd: 20,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 30,
        color: Colors.SECONDARY,
        fontWeight: 'bold',
        marginTop: height / 10,
        width:widthComponent,
        alignSelf:'center'
    },
    inputLogin: {
        width: widthComponent,
        color: Colors.SECONDARY,
        fontSize: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        alignSelf:'center',        
        marginVertical: 5,
        paddingHorizontal:10,
        flexDirection: 'row',
        elevation:3,
        shadowColor:Colors.DARK,
    },
    iconInput: {
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    rememberView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width:widthComponent,
        alignSelf:'center',
    },
    rememberText: {
        color: Colors.SECONDARY,
        alignSelf: 'center'
    },
    iconSecu: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    avatar: {
        width: width / 3,
        height: width / 3,
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical:20,
    },
    fullName: {
        fontWeight: 'bold',
        fontSize: 25,
        color: Colors.SECONDARY,
        alignSelf: 'center',
    },
    username: {
        fontSize: 15,
        color: Colors.DARK,
        alignSelf: 'center',
    },
    bg: {
        width: '100%',
        height: '100%',
        flex: 1,
        position: 'absolute',
        resizeMode: 'cover',
        zIndex: 0,
    },
    navitext: {
        color: Colors.RED,
        alignSelf: 'center',
        fontSize: 15,
    },
    topViewProfile:{
        width:widthComponent,
        alignSelf:'center',
        padding:30,
        marginTop:5,
        elevation:10,
        backgroundColor:Colors.WHITE,
        shadowColor:Colors.DARK,
        borderRadius:10,
    },
    boxFunction:{
        marginVertical:10,
        width:widthComponent,
        alignSelf:'center',
        padding:20,
        elevation:10,
        backgroundColor:Colors.WHITE,
        shadowColor:Colors.DARK,
        borderRadius:10,
        flexDirection:'row',
    },
    titleBox:{
        marginVertical:10,
        color:Colors.SECONDARY,
        alignSelf:'center',
        fontWeight:'bold'
    },
    titleView:{
        flexDirection:'row',
        width:widthComponent,
        alignSelf:'center',
        overflow:'hidden',
    },
    titleLine:{
        alignSelf:'center',
        width:'100%',
        marginStart:5,
        backgroundColor:Colors.SECONDARY,
        height:1,
        marginTop:5,
    },
    iconsBox:{
        width:30,
        height:30,
        alignSelf:'center',
    },
    titleFunction:{
        color:Colors.SECONDARY,
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'center',
        marginHorizontal:10,
    },
    headerAuthen:{
        marginVertical:20,
        fontSize:30,
        color:Colors.SECONDARY,
        fontWeight:'bold',
        alignSelf:'center'
    },
    container_authen:{
        justifyContent:'space-between',
        flex:1,
    },
    authen_navi_button:{
        marginTop:width/5
    },
    changePwView:{
        width:'100%',
        backgroundColor:Colors.WHITE,
        elevation:5,
        shadowColor:Colors.BLACK,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingHorizontal:15,
        paddingVertical:25,
        position:'absolute',
        bottom:0,
        alignSelf:'center',
    },
    newPwInput:{
        color:Colors.SECONDARY,
        padding:5,
        width:'100%',
        borderRadius:10,
        backgroundColor:Colors.LIGHT,
        marginBottom:10,
        flexDirection:'row'
    },
    updatePwButton:{
        width:'100%',
        backgroundColor:Colors.SECONDARY,
        padding:15,
        borderRadius:10,
        marginBottom:10,
    },
    updatePwText:{
        color:Colors.WHITE,
        fontSize:15,
        alignSelf:'center',
        fontWeight:'bold'
    },
    changePwViewFull:{
        width:'100%',
        height:'100%',
        position:'absolute',
        bottom:0,
        backgroundColor:Colors.BLACK_TRANS_5,
        zIndex:20,
    },
    titleUpdatePw:{
        color:Colors.SECONDARY,
        fontSize:19,
        fontWeight:'bold',
        marginBottom:20,
        alignSelf:'center'
    },
    updatedViewFull:{
        backgroundColor:Colors.WHITE_TRANS_6,
        width:'100%',
        height:'100%',
        zIndex:99,
        justifyContent:'center'
    },
    updatedView:{
        width:widthComponent,
        elevation:3,
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        padding:20,
        alignSelf:'center'
    },
    updatedPwTitle:{
        color:Colors.SECONDARY,
        marginVertical:20
    }

})
export default main_styles