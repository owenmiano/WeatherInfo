import React from 'react'
import Temporary from './src/screens/Temporary'
import { ApiProvider } from './src/context/ApiContext'
import MapScreen from './src/screens/MapScreen'
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
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