import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React,{useState, useRef} from 'react'
import axios from 'axios'

const App = () => {

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [fullName, setFullName] = useState()
  const [password, setPassword] = useState()
  const [status, setStatus] = useState()
  

  const Register = async () =>{
      const User ={
        fullName : fullName,
        email : email,
        password : password,
        username : username
      }
        const api_url = "http://192.168.1.15:8080/user/register"
        await axios.post(api_url, User)
          .then((response)=>{
            setStatus(response.data.msg)
          })
          .catch((error)=>{
            if (error.response) {
              setStatus(error.response.data.msg)
            }
          })
  }

  return (
    <SafeAreaView>
      <View style={{padding:10,backgroundColor:'rgba(255,255,255,1)'}}>
          <TextInput 
          placeholder='Full name' 
          underlineColorAndroid={'rgba(20,20,20,1)'}
          style={{color:'rgba(0,0,0,1)'}} 
          placeholderTextColor={'rgba(0,0,0,1)'}
          onChangeText={(value)=>{setFullName(value)}}/>
          <TextInput 
          placeholder='Username' 
          style={{color:'rgba(0,0,0,1)'}} 
          placeholderTextColor={'rgba(0,0,0,1)'}
          underlineColorAndroid={'rgba(20,20,20,1)'}
          onChangeText={(value)=>{setUsername(value)}}/>
          <TextInput 
          placeholder='Email'
          style={{color:'rgba(0,0,0,1)'}} 
          placeholderTextColor={'rgba(0,0,0,1)'}
          underlineColorAndroid={'rgba(20,20,20,1)'}
          onChangeText={(value)=>{setEmail(value)}}/>
          <TextInput 
          placeholder='Password' 
          secureTextEntry={true} 
          placeholderTextColor={'rgba(0,0,0,1)'}
          style={{color:'rgba(0,0,0,1)'}} 
          underlineColorAndroid={'rgba(20,20,20,1)'} 
          onChangeText={(value)=>{setPassword(value)}}/>
          <TouchableOpacity 
          style={{backgroundColor:'rgba(244,233,11,1)', padding:10, borderRadius:5,elevation:5, shadowColor:'rgba(22,32,0,1)'}}
          onPress={()=>{Register()}}>
            <Text style={{color:'rgba(0,0,0,1)'}} >Register</Text>
          </TouchableOpacity>
          <Text style={{margin:10,color:'rgba(100,0,10,1)', fontSize:20, fontWeight:'bold', alignSelf:'center'}}>{status}</Text>
      </View> 
    </SafeAreaView>
  )
}

export default App