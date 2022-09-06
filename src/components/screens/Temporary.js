import React,{useContext} from 'react'
import { ApiContext } from '../../context/ApiContext'
import LoaderScreen from './LoaderScreen'
import WeatherInfo from './WeatherInfo'

function Temporary() {
    const {forecast,refreshing}=useContext(ApiContext)

  return (
    <>
     {!forecast ? 
            (
            <LoaderScreen/>
        )
          :(
            <WeatherInfo/>
          )
    }

    </>
       
  )
}

export default Temporary