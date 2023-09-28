import * as React from 'react';
import { View, Text } from 'react-native';
import { useCutItemContext } from '../contexts/CutItemsContext';

export default function HomeScreen() {
  const { cutItems } = useCutItemContext();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>tit unde numquam!</Text>
      
      {cutItems.map((item, index) => (
        <View key={index}>
          <Text>Measurement: {item.measurement} Amount: {item.amount}</Text>
        </View>
      ))}
    </View>
  );
}
