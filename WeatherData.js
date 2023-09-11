import React, {useState} from 'react';

import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native';


const API_KEY = 'a80b06def9bea139f738e134d55bf900'

export const WeatherData = ({cityID}) => {
    const [cityName, setCityName] = useState('')
    const [temp, setTemp] = useState('')
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=imperial&appid=${API_KEY}`)
        .then(res => res.json()).then(data=> { 
          setCityName(data.name)
          setTemp(data.main.temp)
          setSunrise(new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US"))
          setSunset(new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US"))
          console.log(sunrise)
        })
  
    return (
      <View style={styles.weather_container}>
        <Text style={styles.city_name}>{cityName}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'left'}}>
          <FontAwesome5 name="temperature-high" size={24} color="black" style={{paddingBottom: 10, paddingRight: 5}}/>
          <Text style={{fontSize: 24}}>{temp}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'left'}}>
          <Feather name="sunrise" size={24} color="black" style={{paddingBottom: 10, paddingRight: 5}}/>
          <Text style={{fontSize: 24}}>{sunrise}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'left'}}>
          <Feather name="sunset" size={24} color="black" style={{paddingBottom: 10, paddingRight: 5}}/>
          <Text style={{fontSize: 24}}>{sunset}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    weather_container: {
        borderWidth: 2, 
        borderColor: 'black',
        borderRadius: 10,
        margin: 20,
        padding: 20,
        paddingLeft: 40,
        backgroundColor: '#f0e6b4'
      },
    
      city_name: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'left',
        marginBottom: 10
      }
})
