import React from "react";
import { View, Text } from "react-native";
import { useAvailableLengthsContext } from "../contexts/AvailableLengthsContext";
import { useCutItemContext } from "../contexts/CutItemsContext";

export default function ShoppingList() {
    const { availableLengths } = useAvailableLengthsContext();
    const { cutItems } = useCutItemContext();
  
    // Skapa en funktion för att beräkna antalet brädor som behövs för varje längd
    const calculateShoppingList = () => {
      const shoppingList: Record<number, number> = {}; // En dictionary för att lagra längd och antal brädor
      const remainingLengths: Record<number, number> = {}; // En dictionary för att lagra överblivna längder
  
      cutItems.forEach((cutItem) => {
        const { measurement, amount } = cutItem;
  
        // Hitta den tillgängliga längden som är större än eller lika med cutItem längd
        const availableLength = availableLengths.find((length) => length >= measurement);
  
        if (availableLength !== undefined) {
          // Beräkna antalet brädor som behövs
          const boardsNeeded = Math.ceil(amount / (measurement / availableLength));
  
          // Lägg till antalet brädor i shoppingList för den aktuella längden
          if (shoppingList[availableLength]) {
            shoppingList[availableLength] += boardsNeeded;
          } else {
            shoppingList[availableLength] = boardsNeeded;
          }
  
          // Beräkna överblivna längder
          const remainingLength = availableLength - (measurement * boardsNeeded) / amount;
  
          // Lägg till överblivna längder i remainingLengths
          if (remainingLengths[availableLength]) {
            remainingLengths[availableLength] += remainingLength;
          } else {
            remainingLengths[availableLength] = remainingLength;
          }
        }
      });
  
      return { shoppingList, remainingLengths };
    };
  
    // Hämta inköpslistan och överblivna längder
    const { shoppingList, remainingLengths } = calculateShoppingList();
  
    return (
      <View>
        
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Your desired lengths</Text>
        {cutItems.map((item, index) => (
          <Text key={index}>
            Length: {item.measurement} cm - Amount: {item.amount} boards
          </Text>
        ))}

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Shopping List:</Text>
        {Object.entries(shoppingList).map(([length, amount]) => (
          <Text key={length}>
            Length: {length} cm - Amount: {amount} boards
          </Text>
        ))}
  
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Remaining Lengths:</Text>
        {Object.entries(remainingLengths).map(([length, remaining]) => (
          <Text key={length}>
            Length: {length} cm - Remaining: {remaining} cm
          </Text>
        ))}
      </View>
    );
  }
