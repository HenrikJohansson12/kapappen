
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function ShoppingList({ productId }: { productId: number }) {
  const [storeInventory, setStoreInventory] = useState<IStoreInventory[]>([]);
  const [stores, setStores] = useState<IStore[]>([]);

  const urlInventory = `http://192.168.255.239:5298/StoreInventory/${productId}`;
  const urlStore = `http://192.168.255.239:5298/Store/`;

  useEffect(() => {
    // Anrop för att hämta store inventory
    fetch(urlInventory)
      .then((response) => response.json())
      .then((data: IStoreInventory[]) => {
        setStoreInventory(data);
      })
      .catch((error) => {
        console.error("Error fetching store inventory:", error);
      });

    // Anrop för att hämta stores
    fetch(urlStore)
      .then((response) => response.json())
      .then((data: IStore[]) => {
        setStores(data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  }, []);

  // Konvertera storeInventory till IStoreLengths-format
  const storeLengths: IStoreLengths[] = storeInventory.map((item) => {
    const store = stores.find((store) => store.id === item.storeId);
    if (store) {
      return {
        id: store.id,
        name: store.name,
        latitud: store.latitud,
        longitud: store.longitud,
        length: item.length,
      };
    }
    return {
      name: "Unknown",
      latitud: 0,
      longitud: 0,
      length: item.length,
    };
  });

  // Gruppera data efter butiksnamn
  const groupedData: Record<string, IStoreLengths[]> = {};
  storeLengths.forEach((item) => {
    if (!groupedData[item.name]) {
      groupedData[item.name] = [];
    }
    groupedData[item.name].push(item);
  });

  // Sortera butiksnamnen
  const sortedStoreNames = Object.keys(groupedData).sort();

  return (
   
      <View>
        <Text>Shopping List:</Text>
        {sortedStoreNames.map((storeName) => (
          <View key={storeName}>
            <Text style={styles.storeName}>{storeName}</Text>
            <FlatList
              data={groupedData[storeName]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text>Length: {item.length}</Text>
                </View>
              )}
            />
          </View>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  storeName: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
  },
});
