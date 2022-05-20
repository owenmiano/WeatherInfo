import React from 'react'
import {View} from 'react-native';
// import {Picker} from '@react-native-picker/picker'
function UnitsPicker() {
  return (
    <View>
        <Picker>
            <Picker.Item label="C" value="metric"/>
            <Picker.Item label="F" value="imperial"/>
        </Picker>
    </View>
  )
}

export default UnitsPicker