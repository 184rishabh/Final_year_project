import React from 'react'
import { Text ,View } from 'react-native'
import {ImageBackground} from 'react-native';
import Background from './Background'

import {StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { useState } from 'react';
import axios from 'axios'


function SecondScreen({navigation, route}) {
  const [nitrogen, setnitrogen] = useState(20)
  const [phosphorus, setphosphorus] = useState(20)
  const [potassium, setpotassium] = useState(20)
  const [temp, settemp] = useState(20)
  const [humidity, sethumidity] = useState(20)
  const [ph, setph] = useState(7)
  const [rain, setrain] = useState(20)
  const [result, setresult] = useState('')
  const fetchapi=()=>{
    axios.post('https://myproject-production-eb4b.up.railway.app/predict',
    {
      "nitrogen":nitrogen,
      "phosphorus":phosphorus,
      "potassium":potassium,
      "temp":temp,
      "humidity":humidity,
      "ph":ph,
      "rain":rain
  },{
      "headers": {
        'Content-Type': 'multipart/form-data',
      }
  } )
    .then(function (response) {
       setresult(response.data.crop)
       setnitrogen('')
       setphosphorus('')
       setpotassium('')
       settemp('')
       sethumidity('')
       setph('')
       setrain('')
       console.log(response.data.crop);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <ImageBackground
    source={require("./assets/leaves.jpeg")}
    style={styles.backgroundImage}>
      <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 30,fontWeight:'500',marginTop:30}}>Crop Recommendation</Text>
      <Text style={{color:'white',fontSize:30,fontWeight:600}}>{result}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nitrogen"
        keyboardType="numeric"
        value={nitrogen}
        onChangeText={newText => setnitrogen(newText)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phosphorus"
        keyboardType="numeric"
        value={phosphorus}
        onChangeText={newText => setphosphorus(newText)}
      />
      <TextInput
        style={styles.input}
        placeholder="Potassium"
        keyboardType="numeric"
        value={potassium}
        onChangeText={newText => setpotassium(newText)}
      />
      <TextInput
        style={styles.input}
        placeholder="Temperature"
        keyboardType="numeric"
        value={temp}
        onChangeText={newText => settemp(newText)}
      />
      <TextInput
        style={styles.input}
        placeholder="Humidity"
        keyboardType="numeric"
        value={humidity}
        onChangeText={newText => sethumidity(newText)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ph"
        keyboardType="numeric"
        value={ph}
        onChangeText={newText => setph(newText)}
      />
       <TextInput
        style={styles.input}
        placeholder="Rain"
        keyboardType="numeric"
        value={rain}
        onChangeText={newText => setrain(newText)}
      />
      <TouchableOpacity onPress={fetchapi}>
        <Text style={styles.submit}>Predict</Text>
      </TouchableOpacity>
      </View>
   </ImageBackground>   
  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
 },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    width:250,
    borderRadius:20,
    height:40,
  },
  submit:{
  color:'white', 
  fontSize:20,
  backgroundColor:'#2BB789',
  color:'black',
  width:250,
  margin:10,
  padding: 10,
  borderRadius:50,
  textAlign:'center',
  }
  })
export default SecondScreen