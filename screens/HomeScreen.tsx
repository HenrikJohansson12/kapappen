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
        Detta är appen som hjälper dig att skapa listor för dina mått till dina byggprojekt. 
        Just nu har vi utbud från 3 byggvaruhus i Borås.    
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
    backgroundColor: '#222', 
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 42, 
    color: 'white', 
    marginBottom: 10, 
  },
  descriptionText: {
    fontSize: 16, 
    color: 'white', 
    textAlign: 'center', 
    marginHorizontal: 20, 
  },
  descriptionContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    marginTop: 250,
  },
});
