import React from "react";
import { View, Text,StyleSheet } from "react-native";
import { useCutItemContext } from "../contexts/CutItemsContext";


export default function CutList() {
  const { cutItems } = useCutItemContext();

  return (
    <View>
      {cutItems.map((item, index) => (
        <Text key={item.id || index} style={styles.descriptionText}>
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
    backgroundColor: '#222', 
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 42,
    color: 'white',
    marginBottom: 10
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