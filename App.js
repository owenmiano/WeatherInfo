import React from 'react'
import Temporary from './src/components/screens/Temporary'
import WeatherInfo from './src/components/screens/WeatherInfo'
import { ApiProvider } from './src/context/ApiContext'

function App() {
  return (
          <>
        
           <ApiProvider>
              <Temporary/>
             
           </ApiProvider>
          
          </>
    )
    }

export default App