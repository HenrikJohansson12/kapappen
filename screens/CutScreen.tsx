import * as React from 'react';
import { View, Text } from 'react-native';
import MeasurementInput from '../components/MeasurementInput';

export default function CutScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details</Text>
        <Text>asdasdasd</Text>
        <MeasurementInput/>

      </View>
    );
  }