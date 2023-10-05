import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ShowSavedCutList from '../components/ShowSavedCutLists';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import ShoppingList from '../components/ShoppingList';
import ShowMap from '../components/ShowMap';

const BuyScreen: React.FC = () => {
 

  return (
    <View style={styles.container}>
      <ShowSavedCutList />
     

      <View style={styles.mapContainer}>
      <ShowMap/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '70%',
    height: '70%',
  },
});

export default BuyScreen;
