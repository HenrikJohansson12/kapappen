import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ShowSavedCutList from '../components/ShowSavedCutLists';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';

const BuyScreen: React.FC = () => {
  const [mapInitialized, setMapInitialized] = useState(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);

  useEffect(() => {
    // Hämta den aktuella positionen
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Uppdatera initialRegion med den aktuella positionen
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Markera kartan som initialiserad
      setMapInitialized(true);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ShowSavedCutList />
      <View style={styles.mapContainer}>
        {mapInitialized && initialRegion && (
          <MapView style={styles.map} initialRegion={initialRegion} showsUserLocation={true} />
        )}
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
