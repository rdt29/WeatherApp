import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

export default function SplashScreen({navigation}) {
  const redirect = () => {
    setTimeout( () => {
     
      navigation.replace('Weather');
    }, 1500);
  };

  useEffect(() => {
    redirect();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#0C0C1E'}}>
      <StatusBar backgroundColor={'#0C0C1E'}></StatusBar>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 250, width: 250}}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/7988/7988221.png',
          }}
        />
    <Text style={{color:"#8F99FE" , marginTop: 30 ,alignSelf:"center", fontSize:18 }}>Weather App</Text>
      </View>
      <Text style={{color: '#fff', bottom: 70, alignSelf: 'center' , letterSpacing:1.5,}}>
        Developed By {'\u00A9'} Rajdeep Tiwari
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
