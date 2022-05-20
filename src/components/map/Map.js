import React,{useEffect,useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions,Text} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import WeatherData from '../weather/WeatherData';
import {Weather_API_KEY} from '@env'

const API_URL=`https://api.openweathermap.org/data/2.5/weather?`

Geocoder.init('AIzaSyCjRjVmAjLAuErbJdy4l1OOLA2EyUFhft8');

export default function Map() {
    const [refreshing, setRefreshing] = useState(false);
    const [latitude,setLatitude]=useState(0)
    const [longitude,setLongitude]=useState(0)
    const [responseData,setResponseData]=useState({})
    const [addressName,setAddressName]=useState('')
    const [unitsSystem,setUnitsSystem]=useState('metric')
useEffect(()=>{
   
  fetchPosition();
  
                  
    },[latitude,longitude])

    const onRefresh = (() => {
      setRefreshing(true);
      fetchPosition();
      wait(2000).then(() => setRefreshing(false));
    }, []);





    const fetchPosition=async()=>{
        try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                   await Geolocation.getCurrentPosition((position)=>{
                       setLatitude(position.coords.latitude)
                       setLongitude(position.coords.longitude)
                       console.log(position.coords)
                       console.log(Weather_API_KEY)
                      })
                      
                      let  finalAPIEndPoint=`${API_URL}lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}`
                    
                       axios.get(finalAPIEndPoint).then((response)=>{
                           setResponseData(response.data)
                           console.log(response.data)
                      })
                  
                }
              
                else {
                    alert("Location permission denied")
                }
            }
            catch (err) {
                console.log(err)
            }
            }



//    const getAddress=async()=>{
          
//     try {

//    await Geocoder.from(latitude, longitude)
// 		.then(json => {
//       var addressComponent = json.results[0].address_components[0];
// 			console.log(addressComponent);
// 		})
//   }
//   catch (err) {
//     console.log(err)
// }
//    }
return (
    <View>
      <MapView style={styles.map}
       initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0005,
      }}
      >
          <Marker 
          coordinate={{
            latitude : latitude, 
            longitude : longitude
         }}
          />
      </MapView>
           <View>
             

              <WeatherData currentWeather={responseData} refresh={onRefresh} refreshing={refreshing}/>
               
               
              
               
           </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});