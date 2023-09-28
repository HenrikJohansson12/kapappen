import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import {
  useAvailableLengthsContext,
  AvailableLengthsProvider,
} from "../contexts/AvailableLengthsContext";

export default function AvailableLengthsInput() {
  const [availableLengthsInput, setAvailableLengthsInput] = useState<string>("");

  // Använd useAvailableLengthsContext för att hämta context
  const { availableLengths, addAvailableLength, removeAvailableLength } =
    useAvailableLengthsContext();

  const handleRemoveAvailableLength = (indexToRemove: number): void => {
    removeAvailableLength(indexToRemove);
  };

  const handleAddAvailableLength = (): void => {
    const length = parseFloat(availableLengthsInput);

    if (!isNaN(length) && length > 0) {
      addAvailableLength(length);
      setAvailableLengthsInput("");
    } else {
      alert("Invalid input. Please enter a valid number greater than 0.");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter measurement"
        keyboardType="numeric"
        onChangeText={setAvailableLengthsInput}
        value={availableLengthsInput}
      />
      <Button title="Add available length" onPress={handleAddAvailableLength} />

      {/* Visa sparade availableLengths */}
      {availableLengths.map((item, index) => (
        <View key={index}>
          <Text>
            Measurement: {item}{" "}
            <Button
              title="Remove item"
              onPress={() => handleRemoveAvailableLength(index)}
            />
          </Text>
        </View>
      ))}
    </View>
  );
}
