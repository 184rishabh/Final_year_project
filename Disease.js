import React from 'react'
import { Text ,View ,Image,Button } from 'react-native'
import { useState ,useEffect} from 'react';
import Background from './Background'

import {StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';

function DiseasePrediction({navigation, route}) {

const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [camera, setCamera] = useState(null);
const [image, setImage] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);
useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
})();
  }, []);
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
    }
  }
 if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
      </View>
      <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
       <Button title="Take Picture" onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
   </View>
  //   <Background>
  //   <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  //    <Text style={{ color: 'white', fontSize: 35 ,marginLeft:30,fontWeight:'500',marginTop:20,marginBottom:20}}>Disease Detection</Text>
  //    <Image
  //       style={{height:250,width:250,marginLeft:35,borderRadius:10}}
  //       source={require("./assets/leaf.png")}
  //     />
  //    <TouchableOpacity style={{marginLeft:40,marginTop:20}} >
  //      <Text style={styles.submit}>Camera</Text>
  //    </TouchableOpacity>
  //    <TouchableOpacity style={{marginLeft:40,marginTop:1}} >
  //      <Text style={styles.submit}>upload</Text>
  //    </TouchableOpacity>
  //    </View>
     
  // </Background> 
  )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor:'white',
      width:250,
      borderRadius:20,
      height:40,
      marginLeft:20
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
    },
    cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
    })
export default DiseasePrediction