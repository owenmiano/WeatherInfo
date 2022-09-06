import React,{useContext} from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View ,RefreshControl,Image, Dimensions} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Humidity from 'react-native-vector-icons/MaterialCommunityIcons'
import Wind from 'react-native-vector-icons/MaterialCommunityIcons'
import Pressure from 'react-native-vector-icons/MaterialCommunityIcons'
import { ApiContext } from '../../context/ApiContext'
import Temperature from 'react-native-vector-icons/FontAwesome5'
import {COLORS} from '../utils/index'

const {PRIMARY_COLOR,SECONDARY_COLOR,BORDER_COLOR}=COLORS

function WeatherInfo() {
    const {forecast,refreshing,loadForecast}=useContext(ApiContext)
    let {name,
        main:{temp,feels_like,pressure,humidity},
        weather:[details],
        wind:{speed},
    }=forecast;
    const {icon,main,description}=details;
    const iconUrl=`https://openweathermap.org/img/wn/${icon}@4x.png`
  return (
   <SafeAreaView style={styles.container}>
      <ScrollView
        style={{marginTop:50}}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadForecast}
            />
        }
       >
           <Text style={styles.title}>Current Weather</Text>
           <Text style={{alignItems:'center',textAlign:'center'}}>Your Location: {name}</Text>
           <View style={styles.current}>
           <Image source={{uri: iconUrl}} style={styles.weatherIcon}/>
            <View style={{marginRight:20}}>
            <Text style={styles.currentTemp}>{temp} °C</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text> 
            </View>
           </View>
           
             <View style={styles.extraInfo}>
                 <View style={styles.Info}>
                 <Temperature name="temperature-low" size={25} color={PRIMARY_COLOR}/>
                   <Text>Feels like :</Text>  
                    <Text style={styles.textSecondary}>{feels_like} °C</Text>
                 </View>
                 <View style={styles.Info}>
                 <Humidity name={humidity >60 ? "water" : humidity >40 ? "water-outline": "water-off-outline" } size={25} color={PRIMARY_COLOR}/>
                   <Text>Humidity :</Text>  
                    <Text style={styles.textSecondary}>{humidity} %</Text>
                 </View>
                 
             </View>
             <View style={styles.extraInfo}>
                 <View style={styles.Info}>
                 <Pressure name="speedometer" size={30} color={PRIMARY_COLOR}/>
                   <Text>Pressure :</Text>  
                   <Text style={styles.textSecondary}>{pressure} hPa</Text>
                 </View>
                 <View style={styles.Info}>
                 <Wind name="weather-windy" size={30} color={PRIMARY_COLOR}/>
                   <Text>Wind Speed :</Text>  
                   <Text style={styles.textSecondary}>{speed} m/s</Text>
                 </View>
                 
             </View>
       </ScrollView>
       </SafeAreaView>

    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECDBBA'
    },
    title:{
          alignItems:'center',
          textAlign:'center',
          fontSize:29,
          color:'#C84B31',
          fontWeight:"bold",
    },
    current:{
          flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
        },
    weatherIcon:{
        width:200,
        height:200,
        },
        currentTemp:{
            fontSize:15,
            fontWeight:'bold',
           
        },
        weatherDescription:{
            fontWeight:'bold',
            fontSize:15,
            
        },
       Info:{
        width:Dimensions.get('screen').width/2.5,
        backgroundColor:'blue',
        padding:10,
        borderRadius:15,
        justifyContent:'center'
       },
       extraInfo:{
         flexDirection:'row',
         marginTop:5,
         justifyContent:'space-between',
         padding:10
       },
       textPrimary:{
        fontSize:13,
        fontWeight:'700',
        color:PRIMARY_COLOR
    },
    textSecondary:{
      fontSize:15,
      color:SECONDARY_COLOR,
      fontWeight:'700',
      marginTop:5
    }
        
})
export default WeatherInfo