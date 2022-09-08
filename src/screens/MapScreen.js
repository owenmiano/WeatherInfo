import React,{useContext} from 'react'
import MapView from 'react-native-maps';
import { View,StyleSheet } from 'react-native'
import { ApiContext } from '../context/ApiContext';


function MapScreen() {
  const {latitude,longitude}=useContext(ApiContext)

  return (
  <View style={styles.container}>
  <MapView style={styles.map}
   initialRegion={{
    latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
  }}
>

  
</MapView>
      
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height:'100%',
  },
});
export default MapScreen