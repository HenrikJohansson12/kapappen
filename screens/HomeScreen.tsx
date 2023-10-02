import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useCutItemContext } from '../contexts/CutItemsContext';
import ProductList from '../components/ProductList';
import ProductSelector from '../components/ProductSelector';

export default function HomeScreen() {
  const { cutItems } = useCutItemContext();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Välkommen till Kapappen</Text>
      <Text> Detta är appen som hjälper dig att räkna ut rätt antal brädor du behöver köpa till ditt byggprojekt. 
        Just nu har vi utbud från tre byggvaruhus i Borås men du kan också välja att mata in tillgängliga längder manuellt. 
        Vänligen gör ditt val nedan och fortsätt till Kapa sidan. 
      </Text>
      <Button title='Välj produkt från lista'></Button>
      <Button title='Ange produkt manuellt'></Button>
     
      
      {cutItems.map((item, index) => (
        <View key={index}>
          <Text>Measurement: {item.measurement} Amount: {item.amount}</Text>
        </View>
      ))}
    </View>
  );
}
