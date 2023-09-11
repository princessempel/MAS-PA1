import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const API_KEY = 'a80b06def9bea139f738e134d55bf900'
const Stack = createNativeStackNavigator();

const WeatherData = ({cityID}) => {
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

function PrincessScreen() {
  
  return (
    <View style={styles.princess_container}>
      <StatusBar style="auto" />
      <ScrollView>
        <Text style={[{verticalAlign: 'top'}, styles.header]}>Welcome to Princess' World!</Text>
        <View style={{display: 'inline-block', verticalAlign: 'middle'}}>
          <WeatherData cityID={'1701668'}/>
          <WeatherData cityID={'4221552'}/>
          <WeatherData cityID={'4180439'}/>
          <WeatherData cityID={'5809844'}/>
        </View>
      </ScrollView>
    </View>
  )
}

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/universe-background.jpeg')} 
        style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width}}
        imageStyle={{opacity: 0.8}} />
      <View style={[{position: 'absolute'}, styles.container]}>
        <StatusBar style="auto" />
        <Text style={[{color: 'white'}, styles.header]}>Welcome to Our Universe!</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Princess')}>
            <Text>Princess' World</Text>
        </Pressable>
      </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Princess' component={PrincessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    verticalAlign: 'top',
    margin: 20,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#a4e1ff'
  },

  princess_container: {
    flex: 1,
    backgroundColor: '#a4e1ff',
    alignItems: 'center',
    justifyContent: 'top',
  },

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
});

export default App;
