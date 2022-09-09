import React,{createContext, useEffect, useState} from 'react'
import axios from 'axios'
import { Alert, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Weather_API_KEY} from '@env'
import NetInfo from "@react-native-community/netinfo";

export const ApiContext=createContext()

export const ApiProvider=({children})=>{
    const API_URL=`https://api.openweathermap.org/data/2.5/weather?`

    const [isConnected, setIsConnected] = useState() 
     const[refreshing,setRefreshing]=useState(false)
     const[forecast,setForecast]=useState(null)
     const [latitude,setLatitude]=useState(0)
    const [longitude,setLongitude]=useState(0)
     
     
            // fetch the weather data from the openweathermap api
const loadForecast=async()=>{
            try{
               setRefreshing(true)
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
               if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                  setRefreshing(false)
                  Alert.alert("Permission to access location was denied",
                  [
                     {
                       text: "Retry",
                       onPress: () => loadForecast()
                     },
                  ] 
                  )
               }
               // else if(isConnected){
               //    setRefreshing(false)
               //    Alert.alert("You are Offline!","Please Connect To the Internet",
               //    [
               //       {
               //         text: "Retry",
                      
               //       },
               //    ] 
               //    )
               
               // }
                        
              

               await Geolocation.getCurrentPosition((position) => {
                  setLatitude(position.coords.latitude)
                  setLongitude (position.coords.longitude)
                  // loadForecast(position.coords.latitude,position.coords.longitude)
                   axios.get(`${API_URL}lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}`)
                  .then(res=>{
                  let WeatherData=res.data;
                  console.log(WeatherData)
                  setForecast(WeatherData)
                  setRefreshing(false)
                  })
                },
                error => console.log('Error', JSON.stringify(error)),
               //  {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
                )
 } catch (error) {
   setRefreshing(false)
   console.log(error.message) 
        }
      
     }

useEffect(()=>{
  // Subscribe to network state updates
    const network=NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
    
    })   
    return () => {
      // Unsubscribe to network state updates
      network();
    };
  })
 useEffect(()=>{
       loadForecast()
      },[latitude,longitude,isConnected])
     
    return (
        <ApiContext.Provider 
        value={{
        forecast,
        latitude,
        longitude,
         refreshing,
         loadForecast
          }}>
         {children}
      </ApiContext.Provider>
    )  
}