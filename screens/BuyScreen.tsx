import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ShowSavedCutList from '../components/ShowSavedCutLists';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import ShoppingList from '../components/ShoppingList';


const BuyScreen: React.FC = () => {
 

  return (
    <View style={styles.container}>
      <ShowSavedCutList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '70%',
    height: '70%',
  },
});

export default BuyScreen;
