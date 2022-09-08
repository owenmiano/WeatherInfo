import React,{useContext} from 'react'
import { ApiContext } from '../context/ApiContext'
import LoaderScreen from './LoaderScreen'
import {SafeAreaView} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import WeatherInfoScreen from './WeatherInfoScreen'
import MapScreen from './MapScreen'

//Screen names
const MapName = "Location";
const WeatherInfo = "Weather";

const Tab = createBottomTabNavigator();

function Temporary() {
    const {forecast,refreshing}=useContext(ApiContext)
   
  return (
  
    <NavigationContainer>
      <Tab.Navigator  
      initialRouteName={MapName}
      screenOptions={({route})=>({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if(rn === MapName){
            iconName=focused ? 'location' : 'location-outline'
          }else if(rn === WeatherInfo){
            iconName=focused ? 'cloud' : 'cloud-outline'
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: '#e91e63',
        headerShown:false,
        postion:'absolute',
    })
    }
   
       
   
    >
      <Tab.Screen name={MapName} component={MapScreen} />
      <Tab.Screen name={WeatherInfo} component={WeatherInfoScreen} />
    </Tab.Navigator>

    </NavigationContainer>
    
  )
}

export default Temporary