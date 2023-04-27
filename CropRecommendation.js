import React from 'react'
import { Text ,View,Button ,Keyboard} from 'react-native'
import {ImageBackground} from 'react-native';
import {StyleSheet, TextInput,TouchableOpacity,Alert} from 'react-native';
import { useState,useEffect } from 'react';

import axios from 'axios'


function CropRecommendation({navigation, route}) {
  const [nitrogen, setnitrogen] = useState('')
  const [phosphorus, setphosphorus] = useState('')
  const [potassium, setpotassium] = useState('')
  const [temp, settemp] = useState('')
  const [humidity, sethumidity] = useState('')
  const [ph, setph] = useState('')
  const [rain, setrain] = useState('')
  const [result, setresult] = useState('')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false); 

  const handletempchange = (text) => {
    if (text === '') {
      settemp('');
    } else {
      const intValue = parseInt(text.replace(/[^0-9]/g, ''));
      if (intValue >= 1 && intValue <= 50) {
        settemp(`${intValue}`);
      }
      else{
        Alert.alert("Enter Temprature between 1 to 50")
      }
    }
  }

 const handlepchange=(p)=>{
  if(p===''){
    setph('');
  }else{
    const phvalue=parseInt(p.replace(/[^0-9]/g,''));
    if(phvalue>=5 && phvalue<=8){
      setph(`${phvalue}`);
    }else{
      Alert.alert("Enter Ph between 5 to 8")
    }
  }

 }
  const fetchapi=()=>{

    if (!nitrogen) {
      Alert.alert('Nitrogen Value is required');
      return;
    }
    if (!phosphorus) {
      Alert.alert('Phosphorus Value is required');
      return;
    }
    if (!potassium) {
      Alert.alert('Potassium Value is required');
      return;
    }
    if (!temp) {
      Alert.alert('Temprature Value is required');
      return;
    }
    if (!humidity) {
      Alert.alert('Humidity Value is required');
      return;
    }
    if (!ph) {
      Alert.alert('Ph Value is required');
      return;
    }
    if (!rain) {
      Alert.alert('Rain Value is required');
      return;
    }
    

    axios.post('https://harvestify-production.up.railway.app/predict',
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

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
  }, []);
  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  const handleCloseNumericKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
    source={require("./assets/leaves.jpeg")}
    style={styles.backgroundImage}>
      <View style={styles.container}>
      {isKeyboardOpen && (
        <Text onPress={handleCloseNumericKeyboard} style={{color:"white",fontSize:20,fontWeight:800}}>
          Close Keyboard
        </Text>
      )}
      <Text style={styles.title}>
        Crop 
      </Text>
      <Text style={styles.title1}>
        Recommendation
      </Text>
      <Text style={{color:'white',fontSize:40,fontWeight:600,margin:5}}>{result}</Text>
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
        onChangeText={handletempchange}
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
        onChangeText={handlepchange}
      />
       <TextInput
        style={styles.input}
        placeholder="Rain"
        keyboardType="numeric"
        value={rain}
        onChangeText={newText => setrain(newText)}
      />
      <TouchableOpacity onPress={fetchapi} style={{width:"70%"}}>
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
 title:{
  color: 'white',
  fontSize: 40,
  fontWeight:'700',
  marginTop:10,
},
title1:{
  color: 'white',
  fontSize: 40,
  fontWeight:'700',
},
  input: {
    height: "10%",
    margin: 6,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    width:"70%",
    borderRadius:20,
    height:40,
  },
  submit:{
  color:'white', 
  fontSize:20,
  backgroundColor:'#2BB789',
  color:'black',
  width:"100%",
  padding: 10,
  marginTop:6,
  borderRadius:50,
  textAlign:'center',
  }
  })
export default CropRecommendation