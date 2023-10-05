import React, { useState } from "react";
import { View, TextInput, Button, Text,StyleSheet } from "react-native";
import { useCutItemContext } from "../contexts/CutItemsContext";

export default function MeasurementInput() {
  const [measurementInput, setMeasurementInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("");

  // Använd useCutItemContext för att hämta cutItems och setCutItems från din context
  const { cutItems, setCutItems } = useCutItemContext();

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
      <TextInput style={{color: 'white'}}
        placeholder="Lägg in längd i millimeter"
        placeholderTextColor={'white'}
        keyboardType="numeric"
        onChangeText={setMeasurementInput}
        value={measurementInput}
      />
      <TextInput style={{color: 'white'}}
       placeholderTextColor={'white'}
        placeholder="Lägg in antal längder"
        keyboardType="numeric"
        onChangeText={setAmountInput}
        value={amountInput}
      />
      <Button title="Lägg till" onPress={handleAddCutItem} />
      {cutItems.map((item, index) => (
        <View key={index}>
          <Text style={{color:'white'}}>
            Tillagt mått: {item.measurement} mm Antal: {item.amount}{" "}
            <Button title="Ta bort" onPress={() => handleRemoveCutItem(index)} />
          </Text>
        </View>
      ))}
    </View>
  );
}

