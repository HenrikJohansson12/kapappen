import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ShowSavedCutList from '../components/ShowSavedCutLists';
import MapView, { Region,Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ShoppingList from '../components/ShoppingList';

const MapScreen: React.FC = () => {
 
    const [mapInitialized, setMapInitialized] = useState(false);
    const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
    const [stores, setStores] = useState<IStore[]>([]);

    const urlStore = `http://192.168.255.239:5298/Store/`;
    //Hämta listan med butiker. 
    useEffect(() => {
        fetch(urlStore)
        .then((response) => response.json())
        .then((data: IStore[]) => {
          setStores(data);
        })
        .catch((error) => {
          console.error("Error fetching stores:", error);
        });
        
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
        <View style={styles.mapContainer}>
          {mapInitialized && initialRegion && (
            <MapView style={styles.map} initialRegion={initialRegion} showsUserLocation={true}>
              {stores.map((store) => (
                <Marker
                  key={store.id}
                  coordinate={{
                    latitude: store.latitud,
                    longitude: store.longitud,
                  }}
                  title={store.name}
                  
                />
              ))}
            </MapView>
          )}
        </View>
      );
    };

  const styles = StyleSheet.create({
    container: {
        flex:1
    
    },
    mapContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
  
export default MapScreen;
