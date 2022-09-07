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
     const [latitude,setLatitude]=useState(0)
    const [longitude,setLongitude]=useState(0)

   //   const getPosition=async()=>{
   //       try {
           

           
   
   //       } catch (error) {
   //          console.log(error.message)
   //       }
 
   //   }
     
     
            // fetch the weather data from the openweathermap api
const loadForecast=async()=>{
            try{
               setRefreshing(true)
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
               if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                  Alert.alert("Permission to access location was denied")
               }
               await Geolocation.getCurrentPosition(position => {
                  setLatitude(position.coords.latitude)
                  setLongitude (position.coords.longitude)
                  // loadForecast(position.coords.latitude,position.coords.longitude)
                 })

        await axios.get(`${API_URL}lat=${latitude.toString()}&lon=${longitude.toString()}&appid=${Weather_API_KEY}`)
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