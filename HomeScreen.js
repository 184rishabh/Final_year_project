import {View, StyleSheet, Text,TouchableOpacity,Image} from 'react-native';
import {ImageBackground} from 'react-native';

const Home = ({navigation, route}) => {
  return (
    <ImageBackground
      source={require("./assets/leaves.jpeg")}
      style={styles.backgroundImage}>
      <View style={styles.container}>
         <Text style={styles.appname}>Farming Easy</Text>
          <Image
            style={styles.appimage}
            source={require("./assets/farmer.jpeg")}
          ></Image>

          <Text style={styles.appdescription}>
            A one stop solution for farming
          </Text>

        <View style={styles.underline}>

        </View>
        <View style={styles.view}>
          <TouchableOpacity>
            <Text
              style={styles.mybtn}
              onPress={() => navigation.navigate("Crop")}
            >
              Crop Recommendation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.mybtn1}
              onPress={() => navigation.navigate("Disease")}
            >
              Disease Detection
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
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
  appname:{
     color: 'white',
      fontSize: 50,
      fontWeight:'500',
      marginTop:10,
    },
  appimage:
  {height:250,
    width:250,
    borderRadius:40,
    marginTop:40,
  },
  appdescription:{
    color:'white',
    fontSize:20,
    fontWeight:600,
    marginTop:20
  },
  underline:{width:300,
    backgroundColor:'white',
    height:3,
    marginTop:5
  },
  mybtn:{
    marginTop:40,
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
})

export default Home;
