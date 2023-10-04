import * as React from 'react';
import { View, Text } from 'react-native';
import MeasurementInput from '../components/MeasurementInput';
import AvailableLengthsInput from '../components/AvailableLengthsInput';
import ShoppingList from '../components/BuyList';
import SQLiteDataFetcher from '../components/ShowSavedCutLists';
//Den här skärmen ska hålla inköpslistor endast. 
export default function BuyScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <SQLiteDataFetcher/>

      </View>
    );
  }