import React from 'react'
import {View,StyleSheet} from 'react-native'
import { enableLatestRenderer } from 'react-native-maps'
import Map from './src/components/map/Map'
function App() {
  enableLatestRenderer();
  return (
    <View style={styles.container}>
    <Map/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
export default App