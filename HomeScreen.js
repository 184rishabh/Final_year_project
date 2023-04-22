import {View, StyleSheet, Text,TouchableOpacity,Image} from 'react-native';
import Background from './Background';


const Home = ({navigation, route}) => {
  return (
    <Background>
     <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
     <Text style={{ color: 'white', fontSize: 50 ,marginLeft:30,fontWeight:'500',marginTop:20,}}>Farming Easy</Text>
     <Image style={{height:250,width:250,marginLeft:30,marginTop:25,borderRadius:40}} source={require("./assets/farmer.jpeg")}></Image>
     <Text style={{color:'white',fontSize:20,textAlign:'center',marginTop:20,fontWeight:600,marginLeft:30}}>A one stop solution for farming </Text>
     <View style={{width:300,backgroundColor:'white',height:3,marginLeft:30,marginTop:10}}></View>
      <View style={styles.view}>
      <TouchableOpacity style={{marginLeft:30}}>
        <Text style={styles.mybtn} onPress={() =>
          navigation.navigate('Crop')
        }>Crop Recommendation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft:30}}>
        <Text style={styles.mybtn1} onPress={() =>
          navigation.navigate('Disease')
        }>Disease Detection</Text>
      </TouchableOpacity>
      </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
mybtn:{
  color:'white', 
  fontSize:20,
  backgroundColor:'white',
  color:'black',
  width:250,
  margin:10,
  padding: 10,
  borderRadius:50,
  textAlign:'center'
},
mybtn1:{
  color:'white', 
  fontSize:20,
  backgroundColor:'#2BB789',
  color:'black',
  width:250,
  margin:10,
  padding: 10,
  borderRadius:50,
  textAlign:'center',
  color:'white',
  fontWeight:500
},
view:{
  marginTop:30
}
})

export default Home;
