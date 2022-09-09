import React,{useContext} from 'react'
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { View,StyleSheet ,Text} from 'react-native'
import { ApiContext } from '../context/ApiContext';


function MapScreen() {
  const {latitude,longitude}=useContext(ApiContext)

  return (
  <View style={styles.container}>
  <MapView style={styles.map}
   zoomEnabled={true}
   initialRegion={{
    latitude:latitude,
         longitude: longitude,
         latitudeDelta: 0.005,
         longitudeDelta: 0.0005,
  }}
>
<Marker
coordinate={{ latitude : latitude , longitude : longitude }}>
<Callout>
  <Text>You are here</Text>
</Callout>
</Marker>
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