import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

interface ICutItem {
  measurement: number;
  amount: number;
}

export default function CutItemInput() {
  const [measurementInput, setMeasurementInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("");
  const [cutItems, setCutItems] = useState<ICutItem[]>([]);

  const handleRemoveCutItem = (indexToRemove: number): void => {
    // Skapa en kopia av cutItems utan det objekt som ska tas bort
    const updatedCutItems = cutItems.filter((_, index) => index !== indexToRemove);
  
    // Uppdatera cutItems med den nya listan utan det borttagna objektet
    setCutItems(updatedCutItems);
  };
  const handleAddCutItem = (): void => {
    // Konvertera de angivna strängarna till nummer
    const measurement = parseFloat(measurementInput);
    const amount = parseFloat(amountInput);
    
   
  
    // Kontrollera om konverteringen var framgångsrik och att värdena är större än 0
    if (!isNaN(measurement) && !isNaN(amount) && measurement > 0 && amount > 0) {
      // Skapa ett nytt ICutItem-objekt och lägg till i listan
      const newCutItem: ICutItem = { measurement, amount };
      setCutItems([...cutItems, newCutItem]);

      // Återställ input-fälten
      setMeasurementInput("");
      setAmountInput("");
    } else {
      // Visa felmeddelande om inmatningen är ogiltig
      alert("Invalid input. Please enter valid numbers greater than 0.");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter measurement"
        keyboardType="numeric"
        onChangeText={setMeasurementInput}
        value={measurementInput}
      />
      <TextInput
        placeholder="Enter amount"
        keyboardType="numeric"
        onChangeText={setAmountInput}
        value={amountInput}
      />
      <Button title="Add Cut Item" onPress={handleAddCutItem} />

      {/* Visa sparade cutItems */}
      {cutItems.map((item, index) => (
        <View key={index}>
          <Text>Measurement: {item.measurement} Amount: {item.amount} <Button title="Remove item" onPress={() => handleRemoveCutItem(index)}/> </Text>
          
        </View>
      ))}
    </View>
  );
}
