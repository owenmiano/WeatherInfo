import React from 'react'
import { StyleSheet, View,Text,Image,ScrollView,RefreshControl} from 'react-native';
import {COLORS} from '../utils/index'
import Temperature from 'react-native-vector-icons/FontAwesome5'
import Humidity from 'react-native-vector-icons/MaterialCommunityIcons'
import Wind from 'react-native-vector-icons/MaterialCommunityIcons'
import Pressure from 'react-native-vector-icons/MaterialCommunityIcons'
import Location from 'react-native-vector-icons/Entypo'


const {PRIMARY_COLOR,SECONDARY_COLOR,BORDER_COLOR}=COLORS

function WeatherData({currentWeather,refresh,refreshing}) {
    let {name,
        main:{temp,feels_like,pressure,humidity},
        weather:[details],
        wind:{speed},
    }=currentWeather
    const {icon,main,description}=details;
    const iconUrl=`https://openweathermap.org/img/wn/${icon}@4x.png`
  return (
       <View style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      >
<View style={styles.weatherDetailsRow}>
         <View style={styles.weatherDetailsBox}>
           {/* feels like section */}
           <View style={styles.weatherDetailsRow}>
             <View style={{backgroundColor:SECONDARY_COLOR}}>
             <Image source={{uri: iconUrl}} style={styles.weatherIcon}/>
             </View>
             
            
         
           <View style={styles.weatherDetailsItems}>
             <View style={{flexDirection:'row',alignItems:'center'}}>
             <Location name="location-pin" size={30} style={{marginRight:5}} />
              <Text>{name}</Text> 
             </View>
           
             <Text style={styles.textPrimary}>{temp} °</Text>
             <Text style={styles.weatherDescription}>{description}</Text>
             <Text style={styles.textSecondary}>{main}</Text> 
            </View>
        </View>
        </View>
        </View>    
        
           
        
<View style={{...styles.weatherDetailsRow,borderTopWidth:1,borderTopColor:BORDER_COLOR}}>
         <View style={{...styles.weatherDetailsBox, borderRightWidth:1,borderRightColor: BORDER_COLOR}}>
           {/* feels like section */}
           <View style={styles.weatherDetailsRow}>
           <Temperature name="temperature-low" size={25} color={PRIMARY_COLOR}/>
           <View style={styles.weatherDetailsItems}>
           <Text>Feels like :</Text>  
            <Text style={styles.textSecondary}>{feels_like} °</Text>
            </View>
            
           </View>
           
          </View>
          <View style={styles.weatherDetailsBox}>
            {/* humidity section */}
            <View style={styles.weatherDetailsRow}>
           <Humidity name="water" size={30} color={PRIMARY_COLOR}/>
           <View style={styles.weatherDetailsItems}>
           <Text>Humidity :</Text>  
            <Text style={styles.textSecondary}>{humidity} %</Text>
            </View>
            
           </View>
          </View>
          
           </View>
           <View style={{...styles.weatherDetailsRow,borderTopWidth:1,borderTopColor:BORDER_COLOR}}>
         <View style={{...styles.weatherDetailsBox, borderRightWidth:1,borderRightColor: BORDER_COLOR}}>
           {/* wind speeed section */}
           <View style={styles.weatherDetailsRow}>
           <Wind name="weather-windy" size={30} color={PRIMARY_COLOR}/>
           <View style={styles.weatherDetailsItems}>
           <Text>Wind Speed :</Text>  
            <Text style={styles.textSecondary}>{speed} m/s</Text>
            </View>
            
           </View>
           
          </View>
          <View style={styles.weatherDetailsBox}>
            {/* Pressure section */}
            <View style={styles.weatherDetailsRow}>
           <Pressure name="speedometer" size={30} color={PRIMARY_COLOR}/>
           <View style={styles.weatherDetailsItems}>
           <Text>Pressure :</Text>  
            <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
            
           </View>
          </View>
           
           </View>
           </ScrollView> 
       </View>
    
  )
}
const styles=StyleSheet.create({
       container:{
            marginTop:'auto',
            width:'100%',
           
            borderWidth:1,
            borderColor:BORDER_COLOR
            },
        weatherDetailsRow:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
        
        },
        weatherDetailsItems:{
           alignItems:'flex-end',
           justifyContent:'flex-end'
        },
        weatherDetailsBox:{
            flex:1,
            padding:20
        },

        weatherDescription:{
            textTransform:'capitalize'
        },
      weatherIcon:{
          width:100,
          height:100,
        
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
        marginTop:10
      }
})
export default WeatherData