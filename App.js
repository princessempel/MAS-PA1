import { StatusBar } from 'expo-status-bar';
import { Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import { WeatherData } from './src/WeatherData';

import { Amplify, API } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports)

const myAPI = 'apib01f9e91';
const path = '/users'

const Stack = createNativeStackNavigator();

const UserGuestBook = () => {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])

  function getUser(e) {
    let userID = e.input
    API.get(myAPI, path + '/' + userID)
      .then(response => {
        console.log(response)
        let newUsers = [...users]
        newUsers.push(response)
        setUsers(newUsers)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={[{color: 'white'}, styles.header]}>The App Guest Book</Text>
      <TextInput
        style={{padding: 10, borderRadius: 5}}
        backgroundColor='white'
        onChangeText={(e) => setInput(e)}
        placeholder='Enter Name'
        value={input}
        />
      <Pressable 
        style={styles.button}
        onPress={() => getUser({input})}>
        <Text>Add User</Text>
      </Pressable>
      {users.map((thisUser, index) => {
        return (
          <View>
            <Text style={{fontWeight: 'bold', color: 'white'}}>{thisUser.userID}</Text>
          </View>
        )
      })}
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
          onPress={() => navigation.navigate('Princess')}
          >
            <Text>Princess' World</Text>
        </Pressable>
        <UserGuestBook/>
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
    margin: 25,
    padding: 20
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
    backgroundColor: '#a4e1ff',
    alignItems: 'center',
    justifyContent: 'top',
  },
});

export default App;
