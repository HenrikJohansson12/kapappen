import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useAvailableLengthsContext } from "../contexts/AvailableLengthsContext";
import { useCutItemContext } from "../contexts/CutItemsContext";
import { useSelectedProductContext } from "../contexts/SelectedProductContext";

export default function ShoppingList() {
  const { selectedProduct, setSelectedProduct } = useSelectedProductContext();
  const [data, setData] = useState<IStoreInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const { cutItems } = useCutItemContext();

  const url = `http://10.0.2.2:5298/StoreInventory/${
    selectedProduct?.id ?? "defaultId"
  }`;

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  
  const calculateShoppingList = () => {
    const shoppingList = cutItems.map((cutItem) => {
      const requiredLength = cutItem.measurement; // Måttet på brädan från cutItems
      let totalRequired = 0; // Totalt antal brädor som behövs för detta mått

      // Skapa en Set för att hålla unika storeId
      const uniqueStoreIds = new Set<number>();

      // Loopa igenom arrayen och lägg till storeId i Set
      data.forEach((item) => {
        uniqueStoreIds.add(item.storeId);
      });

      // Räkna antalet unika storeId
      const numberOfUniqueStoreIds = uniqueStoreIds.size;

      // Loopa genom de tillgängliga längderna från API:et
      data.forEach((storeInventory) => {
        if (storeInventory.length >= requiredLength) {
          const count = Math.floor(storeInventory.length / requiredLength);
          totalRequired += count;
        }
      });

      return { measurement: requiredLength, amount: totalRequired };
    });

    // Skapa en lista med överblivna längder (längder som inte användes)
    const remainingLengths = data
      .map((storeInventory) => storeInventory.length)
      .filter((length) => {
        return !cutItems.some((cutItem) => length >= cutItem.measurement);
      });

    return { shoppingList, remainingLengths };
  };

  // Hämta inköpslistan och överblivna längder
  const { shoppingList, remainingLengths } = calculateShoppingList();

 
  return (
    <View>
      {shoppingList.map((item, index) => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Measurement: {item.measurement} Amount: {item.amount}{" "}
        </Text>
      ))}
    </View>
  );
}

