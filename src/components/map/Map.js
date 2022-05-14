import React,{useEffect,useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions,Text } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';


const API_URL=`https://api.openweathermap.org/data/2.5/weather?`
const API_KEY=`260bd33d9c9c3ab1719f5104298e78ae`

export default function Map() {
    const [latitude,setLatitude]=useState(0)
    const [longitude,setLongitude]=useState(0)
    const [responseData,setResponseData]=useState({})
useEffect(()=>{
   
  fetchPosition();
    },[])

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
                      })
        
                 let finalAPIEndPoint= `${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
                console.log(finalAPIEndPoint)

                await axios.get(finalAPIEndPoint).then((response)=>{
                     setResponseData(response.data)
                     console.log(response.data)
                })

                }
              
                else {
                    alert("Location permission denied")
                }
            }
            catch (err) {
                console.warn(err)
            }
            }

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
               <Text>haiyaa {responseData.name}</Text>
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