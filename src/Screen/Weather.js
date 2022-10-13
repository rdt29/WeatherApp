import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-remix-icon';
import {Height} from '../Global/Height';

export default function Weather() {
  const [Data, setData] = useState('');

  const [Info, setInfo] = useState(false);

  const [city, setcity] = useState('Bhopal');
  const [loader, setloader] = useState(false);

  const [Imageurl, setImage] = useState(
    'https://i.pinimg.com/750x/9d/d3/36/9dd336c6cba1700dd1da531adbf6639b.jpg',
  );

  let unix_timestamp = Info == false ? '' : Data.dt;
  var date = new Date(unix_timestamp * 1000);
  var hours = '';
  hours = date.getHours();

  var minutes = '0' + date.getMinutes();

  var seconds = '0' + date.getSeconds();

  var formattedTime =
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  // sunrise timee

  let sun = Info == false ? '' : Data.sys.sunrise;
  var sundate = new Date(sun * 1000);

  var sunhours = sundate.getHours();

  var sunminutes = '0' + sundate.getMinutes();

  var sunseconds = '0' + sundate.getSeconds();

  var sunrise =
    sunhours + ':' + sunminutes.substr(-2) + ':' + sunseconds.substr(-2);

  // sunset timee

  let sunset = Info == false ? '' : Data.sys.sunset;
  var sunsetdate = new Date(sunset * 1000);

  var sunsethours = sunsetdate.getHours();

  var sunsetminutes = '0' + sunsetdate.getMinutes();

  var sunsetseconds = '0' + sunsetdate.getSeconds();

  var sunsetrise =
    sunsethours +
    ':' +
    sunsetminutes.substr(-2) +
    ':' +
    sunsetseconds.substr(-2);

  var cdate = new Date();
  var chrs = cdate.getHours();

  // main time

  const backgroundColor = 'transparent';
  // const backgroundColor = "red";
  let TextColor = '#fff';

  useEffect(() => {
    weather();
    // morning to evening clouds
  }, []);
  useEffect(() => {
    // hours = 13;
    if (Data) {
      // console.warn(Data.weather[0].main);
      //  clouds
      if (Data.weather[0].main == 'Clouds') {
        if (chrs > 6 && chrs < 18) {
          // console.warn('1');

          setImage(
            'https://i.pinimg.com/564x/91/b9/68/91b968d9af877469c8315729968dc79d.jpg',
          );
        } else {
          setImage(
            'https://i.pinimg.com/564x/af/e7/e3/afe7e3733c9556292f6064b61b7d364c.jpg',
          );
        }
      }
      //  rain and haze
      else if (
        Data.weather[0].main == 'Haze' ||
        Data.weather[0].main == 'Rain'
      ) {
        chrs;
        if (chrs > 6 && chrs < 18) {
          // console.warn('2');
          setImage(
            'https://i.pinimg.com/564x/d4/5a/ca/d45aca718832d10ca48ed1d146a3ef4a.jpg',
          );
        } else {
          setImage(
            'https://i.pinimg.com/564x/a3/fe/34/a3fe346229c5d5db07c7bb61580f9213.jpg',
          );
        }
        //  clear
      } else if (Data.weather[0].main == 'Clear') {
        // console.log('hours', chrs);
        if (chrs > 6 && chrs < 18) {
          setImage(
            'https://i.pinimg.com/564x/f8/76/ca/f876cac582a268922258e68932e34953.jpg',
          );
          // console.warn('3');
        } else {
          setImage(
            'https://i.pinimg.com/564x/94/9b/e8/949be8a971ed379e7837b887897b6a26.jpg',
          );
        }
      }

      // all else
      else {
        // console.warn('7');`
        setImage(
          'https://i.pinimg.com/750x/9d/d3/36/9dd336c6cba1700dd1da531adbf6639b.jpg',
        );
      }
    }
  }, [Data]);

  const weather = async () => {
    setInfo(false);
    setloader(true);

    try {
      if (city == '') {
        // alert('');
        ToastAndroid.showWithGravity(
          'please enter city',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setloader(false);
        return;
      }

      const Apikey = 'fb13997376f9d63ddaa64ca852cc9492';
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            city == '' ? 'Bhopal' : city.trim()
          }&units=metric&appid=${Apikey}`,
        )
        .then(function (response) {
          setData(response.data);

          setInfo(true);
          setloader(true);
        });
    } catch (error) {
      console.log(error);
      if (error == 'Error: Request failed with status code 404') {
        // alert("No city Found")
        ToastAndroid.showWithGravity(
          'No city Found',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          )
          setloader(false)
          setcity('')
        }
        else if (error == 'Error: Network Error') {
        // alert("No city Found")
        ToastAndroid.showWithGravity(
          'Please Check Your Internet conection ',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          );
          setloader(false)
          // setcity('')
         
      }
      else
      {
        ToastAndroid.showWithGravity(
          "error please Try Again",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          );
          setloader(false)
      }
    }
  };
  {
    if (Info == false) {
      return (
        // search view
        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/564x/9b/9c/9b/9b9c9b1477fe5d36622ed4edd1c547b2.jpg',
          }}
          resizeMode="cover"
          style={{flex: 1, justifyContent: 'center'}}>
          <StatusBar
            backgroundColor={backgroundColor}
            // barStyle={backgroundColor == '#fff' ? 'dark-content' : 'light-content'}
            translucent={true}
          />
          <Image
            style={{height: 150, width: 150, alignSelf: 'center'}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/7988/7988221.png',
            }}
          />
          <View
            style={{
              marginTop: 60,
              marginHorizontal: 10,
              height: 40,
              backgroundColor: '#fff',
              // marginTop: 40,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderRadius: 30,
            }}>
            <Icon name="ri-cloud-fill" size="30" color="#000" />

            <TextInput
              style={{
                // backgroundColor:"red",
                width: 250,
                flex: 1,
                fontSize: 18,
                color: '#000',
              }}
              value={city}
              onChangeText={setcity}
              placeholder="City Name"
              placeholderTextColor={'#bababa'}
              onSubmitEditing={() => weather()}
            />
            <TouchableOpacity onPress={() => weather()}>
              <Icon name="search-line" size="30" color="black" />
            </TouchableOpacity>
          </View>

          <View style={{flex: 0.4, paddingTop: 40}}>
            {loader == true ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              ''
            )}
          </View>
          <Text
            style={{
              // Top :  Height/2,
              alignSelf: 'center',
              fontSize: 10,
              letterSpacing: 1.5,
              color: '#ffd',
            }}>
            {' '}
            {'\u00A9'} Rajdeep Tiwari
          </Text>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={{uri: Imageurl}}
          resizeMode="cover"
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={{flex: 1, backgroundColor: backgroundColor}}>
            <StatusBar
              backgroundColor={backgroundColor}
              // barStyle={backgroundColor == '#fff' ? 'dark-content' : 'light-content'}
              translucent={true}
            />
            <ScrollView>
              {/* Search View */}

              <View
                style={{
                  marginTop: 60,
                  marginHorizontal: 10,
                  height: 40,
                  backgroundColor: '#fff',
                  // marginTop: 40,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderRadius: 30,
                }}>
                <Icon name="ri-cloud-fill" size="30" color="#000" />

                <TextInput
                  style={{
                    // backgroundColor:"red",
                    width: 250,
                    flex: 1,
                    fontSize: 18,
                    color: '#000',
                  }}
                  value={city}
                  onChangeText={setcity}
                  placeholder="City Name"
                  placeholderTextColor={'#bababa'}
                  onSubmitEditing={() => weather()}
                />
                <TouchableOpacity onPress={() => weather()}>
                  <Icon name="search-line" size="30" color="black" />
                </TouchableOpacity>
              </View>
              {/* bottom maim */}
              <View
                style={{
                  // backgroundColor: 'red',
                  flex: 1,
                }}>
                {/* weather  */}
                {/* Uper details */}
                <View
                  style={{
                    flexDirection: 'row',
                    //  backgroundColor:"red",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {/* uper left  */}
                  <View>
                    <Text
                      style={{
                        color: TextColor,
                        marginTop: 30,
                        marginLeft: 30,
                        fontSize: 30,
                      }}>
                      {Info == false ? 'City' : Data.name}
                    </Text>

                    <Text
                      style={{
                        color: TextColor,
                        marginTop: 10,
                        marginLeft: 30,
                        fontSize: 20,
                      }}>
                      {Info == false ? 'Country' : Data.sys.country}
                      {/* {Data.sys.country} */}
                    </Text>
                    <Text
                      style={{
                        color: TextColor,
                        marginTop: 10,
                        marginLeft: 30,
                        fontSize: 14,
                      }}>
                      {Info == false ? 'Time' : formattedTime}
                    </Text>
                  </View>
                  {/* uper right */}
                  <View
                    style={{
                      paddingRight: 20,
                      //  backgroundColor: 'red'
                    }}>
                    {/* humidity  */}
                    <View
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.74)',
                        borderRadius: 20,
                        paddingVertical: 2,
                        width: 80,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={{
                          uri: `https://cdn-icons-png.flaticon.com/512/7802/7802832.png`,
                        }}
                      />
                      <Text style={{color: TextColor}}>
                        {' '}
                        {Info === false ? 'humidity' : Data.main.humidity}
                      </Text>
                    </View>
                    {/* Wind  */}
                    <View
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.74)',
                        padding: 2,
                        width: 80,
                        borderRadius: 20,
                        marginVertical: 5,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={{
                          uri: `https://cdn-icons-png.flaticon.com/512/8145/8145770.png`,
                        }}
                      />
                      <Text style={{color: TextColor}}>
                        {' '}
                        {Info === false
                          ? 'Wind'
                          : (Data.wind.speed * 3.6).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* center cloud  */}
                <View
                  style={{
                    // backgroundColor:"#ff4",
                    flex: 0.9,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <View style={{alignItems: 'center'}}>
                    {Info == false ? (
                      ''
                    ) : (
                      <Image
                        style={{width: 100, height: 100}}
                        source={{
                          uri: `https://openweathermap.org/img/wn/${Data.weather[0].icon}.png`,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        color: TextColor,
                        fontWeight: '900',
                        fontSize: 24,
                        margin: 2,
                      }}>
                      {/* {Data.weather[0].main} */}
                      {Info === false ? 'Weather' : Data.weather[0].main}
                    </Text>
                    <Text
                      style={{
                        color: TextColor,
                        fontSize: 20,
                        marginBottom: 15,
                        fontWeight: '500',
                      }}>
                      {/* {Data.weather[0].main} */}
                      {Info === false
                        ? 'Weather details'
                        : Data.weather[0].description}
                    </Text>
                    {/* temp  */}
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: TextColor,
                          fontSize: 52,
                          fontWeight: '700',
                        }}>
                        {Info === false ? 'Temp' : Data.main.temp}
                        {/* {Data.main.temp} */}
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          color: TextColor,
                          fontWeight: '900',
                        }}>
                        {' '}
                        {'\u00b0' + 'C'}
                      </Text>
                    </View>
                    {/* Hign low temp */}
                    {/* <View style={{flexDirection: 'row'}}>
              
                <View style={{flexDirection: 'row', marginRight: 20}}>
                <Icon name="ri-arrow-up-line" size="20" color="#fff" />
                  <Text
                  style={{color: TextColor, fontSize: 18, fontWeight: '400'}}>
                    {Info === false ? 'maxTemp' : Data.main.temp_max}
                    
                    </Text>
                    <Text
                    style={{fontSize: 18, color: TextColor, fontWeight: '300'}}>
                    {' '}
                    {'\u00b0' + 'C'}
                    </Text>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                <Icon name="ri-arrow-down-line" size="22" color="#fff" />
                <Text
                style={{color: TextColor, fontSize: 18, fontWeight: '400'}}>
                    {Info === false ? 'minTemp' : Data.main.temp_min}
                    
                    </Text>
                  <Text
                  style={{fontSize: 18, color: TextColor, fontWeight: '300'}}>
                    
                    {'\u00b0' + 'C'}
                    </Text>
                    </View>
                  </View>  */}
                    {/* feels like  */}
                    <View
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.74)',
                        borderRadius: 20,
                        paddingVertical: 5,
                        width: 120,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={
                          Info == false
                            ? ''
                            : {
                                uri: `https://openweathermap.org/img/wn/${Data.weather[0].icon}.png`,
                              }
                        }
                      />
                      <Text style={{color: TextColor, fontSize: 22}}>
                        {' '}
                        {Info === false ? 'Feels like' : Data.main.feels_like}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* bottom deatils */}
                <View
                  style={{
                    flex: 1,
                    // backgroundColor:"red",
                    flexDirection: 'row',
                  }}>
                  {/* Sunrise */}
                  <View
                    style={{
                      marginTop: 100,
                      // bottom: 10,
                      // backgroundColor: 'rgba(0, 0, 0, 0.74)',
                      borderRadius: 20,
                      paddingVertical: 2,
                      width: 100,
                      backgroundColor: 'transparent',

                      // flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={{
                        uri: `https://cdn-icons-png.flaticon.com/512/7246/7246563.png`,
                      }}
                    />
                    <Text style={{color: TextColor}}>
                      {' '}
                      {Info === false ? 'Sunrise' : sunrise}
                    </Text>
                  </View>
                  {/* sunset */}
                  <View
                    style={{
                      marginTop: 100,
                      backgroundColor: 'rgba(0, 0, 0, 0.74)',
                      backgroundColor: 'transparent',
                      borderRadius: 20,
                      paddingVertical: 2,
                      width: 100,
                      // flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={{
                        uri: `https://cdn-icons-png.flaticon.com/512/2294/2294957.png`,
                      }}
                    />
                    <Text style={{color: TextColor}}>
                      {' '}
                      {Info === false ? 'SunSet' : sunsetrise}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <Text
              style={{
                bottom: 10,

                alignSelf: 'center',
                fontSize: 10,
                letterSpacing: 1.5,
                color: '#ffd',
              }}>
              {' '}
              {'\u00A9'} Rajdeep Tiwari
            </Text>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({});
