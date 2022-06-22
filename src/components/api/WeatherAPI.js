import React,{useEffect,useState} from 'react';
import { StyleSheet, View,Text, ScrollView,RefreshControl} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WeatherData from '../weather/WeatherData';
import {Weather_API_KEY} from '@env'

const API_URL=`https://api.openweathermap.org/data/2.5/weather?`



function WeatherAPI() {
  const [errorMessage,setErrorMessage]=useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const [latitude,setLatitude]=useState(0)
    const [longitude,setLongitude]=useState(0)
    const [responseData,setResponseData]=useState(null)
  
   
useEffect(()=>{

    fetchPosition();
},[])

const onRefresh =(() => {
  setRefreshing(true);
  fetchPosition();
  wait(2000).then(() => setRefreshing(false));
}, []);





    const fetchPosition=async()=>{
        try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    setErrorMessage("Location dddpermission denied")
                    alert("Location permission denied")
                }
                
               await Geolocation.getCurrentPosition((position)=>{
                  setLatitude(position.coords.latitude)
                  setLongitude(position.coords.longitude)
                })
               
                  if(!latitude || !longitude) console.log("No lat and longtitude coordinates")
                        console.log(`${latitude},${longitude}`)          
       
         const  finalAPIEndPoint=`${API_URL}lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}`
         const response= await fetch(finalAPIEndPoint)
              
        const result=await response.json()
       if(response.ok){
        setResponseData(result)
       }else{
        setErrorMessage(result.message)
       }

    }catch (err) {
                console.log(err)
            }
          }
if(responseData){
return (
    <View style={styles.container}>
     <ScrollView
      contentContainerStyle={styles.scrollView}
     refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
     >
     <WeatherData currentWeather={responseData} />
     </ScrollView>
   
        
               
         
    </View>
  );
}else {
  return (
    <View>
      <Text>error</Text>
    </View>
  )
}
 
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      justifyContent:'center'
   },
   scrollView: {
    flex: 1,
    
    justifyContent: 'center',
  },

});


export default WeatherAPI;
