import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCutItemContext } from '../contexts/CutItemsContext';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { cutItems } = useCutItemContext();

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor='blue' />
      <Text style={styles.welcomeText}>
        Kapappen 
      </Text>
      <MaterialCommunityIcons name="tape-measure" size={72} color="white" />
      <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>
        Detta är appen som hjälper dig att räkna ut rätt antal brädor du behöver köpa till ditt byggprojekt.
        Just nu har vi utbud från tre byggvaruhus i Borås men du kan också välja att mata in tillgängliga längder manuellt.    
      </Text>
      </View>
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
