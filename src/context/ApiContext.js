import React,{createContext, useEffect, useState} from 'react'
import axios from 'axios'
import { Alert, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Weather_API_KEY} from '@env'

export const ApiContext=createContext()

export const ApiProvider=({children})=>{
    const API_URL=`https://api.openweathermap.org/data/2.5/weather?`

     const[refreshing,setRefreshing]=useState(false)
     const[forecast,setForecast]=useState(null)
     const [latitude,setLatitude]=useState(null)
    const [longitude,setLongitude]=useState(null)

     const loadForecast=async()=>{
        
        try {
            setRefreshing(true)
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
               Alert.alert("Permission to access location was denied")
            }
            // get location coordinates
           await Geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude (position.coords.longitude)
           },
           (error) => alert(error),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
         )
            
            // fetch the weather data from the openweathermap api
        await axios.get(`${API_URL}lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}`)
        .then(res=>{
        let WeatherData=res.data;
        console.log(WeatherData)
        setForecast(WeatherData)
         setRefreshing(false)
        })
    } catch (error) {
            setRefreshing(false)
            console.log(error.message) 
        }
     }
     useEffect(()=>{
        loadForecast()
      },[])
     
    return (
        <ApiContext.Provider 
        value={{
        forecast,
         refreshing,
         loadForecast
          }}>
         {children}
      </ApiContext.Provider>
    )  
}