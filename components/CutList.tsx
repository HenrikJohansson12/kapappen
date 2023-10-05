import React from "react";
import { View, Text,StyleSheet } from "react-native";
import { useCutItemContext } from "../contexts/CutItemsContext";


export default function CutList() {
  const { cutItems } = useCutItemContext();

  return (
    <View>
      {cutItems.map((item, index) => (
        <Text style={styles.descriptionText}>
          Mått: {item.measurement} mm Antal: {item.amount}{" "}
        </Text>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#222', // Mörkgrå bakgrundsfärg
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 42, // Större font size
    color: 'white', // Vit textfärg
    marginBottom: 10, // Avstånd nedåt från texten
  },
  descriptionText: {
    fontSize: 16, // Standard font size för beskrivningstexten
    color: 'white', // Vit textfärg
    textAlign: 'center', // Centrera texten
    marginHorizontal: 20, // Vänster och höger marginal
  },
  descriptionContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    marginTop: 250,
  },
});