import React from 'react'
import { Text ,View ,Image,Button } from 'react-native'
import { useState ,useEffect} from 'react';
import Background from './Background'
import {ImageBackground} from 'react-native';
import {StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import {launchCameraAsync,useCameraPermissions,PermissionStatus} from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
function DiseasePrediction({navigation, route}) {
const [cameraPermissionInformation,requestPermission]=useCameraPermissions();
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


async function verifyPermissions(){
  if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
   const permissionResponse=await  requestPermission();
   return permissionResponse.granted;
  }
  if(cameraPermissionInformation.status === PermissionStatus.DENIED){
    Alert.alert('Insufficient Permissions!',
    'You need to grant camera permisssion to use this app');
    return false;
  }
  return true;
}

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    
});
console.log(result);
setImage(result.uri);
if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
}

 async function takeImagehandler(){
  const hasPermission=await verifyPermissions();
  if(!hasPermission){
    return;
  }
  const image=await launchCameraAsync({
    allowsEditing:true,
    aspect:[16,9],
    quality:0.5,
  })
  setImage(image.uri);
  console.log(image);

 }

 let imagepreview=<Text>No Image Taken</Text>
 if(image){
  imagepreview=<Image style={styles.Img}source={{uri:image}}/>
 }
  return (
    <ImageBackground
      source={require("./assets/leaves.jpeg")}
      style={styles.backgroundImage}>
        <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 35 ,fontWeight:'500',marginTop:20,marginBottom:20}}>Disease Detection</Text>
        <View style={styles.imagePreview}>
           {imagepreview}
         </View>
         <TouchableOpacity style={{marginTop:20}} >
             <Text style={styles.submit} onPress={takeImagehandler}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:1}} >
            <Text style={styles.submit} onPress={pickImage}>upload</Text>
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
  },
  imagePreview:{
    width:'70%',
    height:250,
    marginTop:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2BB789',
    borderRadius:20
  },
  Img:{
    width:'100%',
    height:'100%',
  }
    })
export default DiseasePrediction