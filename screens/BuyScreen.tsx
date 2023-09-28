import * as React from 'react';
import { View, Text } from 'react-native';
import MeasurementInput from '../components/MeasurementInput';
import AvailableLengthsInput from '../components/AvailableLengths';
import ShoppingList from '../components/BuyList';

export default function BuyScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <ShoppingList/>

      </View>
    );
  }