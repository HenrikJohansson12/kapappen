import React, { useEffect, useState, } from 'react';
import { Text, View,SectionList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useSQLiteData } from '../contexts/SqLiteDataContext';
import { MaterialIcons } from '@expo/vector-icons';


const ShowSavedCutList: React.FC = () => {
  const [cutItemsWithProduct, setCutItemsWithProduct] = useState<ICutItemWithProduct[]>([]);
  const db = SQLite.openDatabase('mydatabase.db');
  const {dataUpdated} = useSQLiteData();

   const fetchCutItemsWithProductData = async () => {
    return new Promise<ICutItemWithProduct[]>((resolve, reject) => {
      try {
        db.transactionAsync(async (tx) => {
          const result = await tx.executeSqlAsync(
            'SELECT id, measurement, amount, productId, type, thickness, width FROM CutItemsWithProduct',
            []
          );

          const cutItemsWithProduct: ICutItemWithProduct[] = [];

          // Convert ResultSet to an array of objects
          const rows = Array.from(result.rows);

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            const cutItemWithProduct: ICutItemWithProduct = {
                id: row.id,
              measurement: row.measurement,
              amount: row.amount,
              product: {
                id: row.productId,
                type: row.type,
                thickness: row.thickness,
                width: row.width,
              },
            };
            cutItemsWithProduct.push(cutItemWithProduct);
          }
          resolve(cutItemsWithProduct);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  
  useEffect(() => {
    const fetchData = async () => {
      const cutItemsData = await fetchCutItemsWithProductData();
      setCutItemsWithProduct(cutItemsData);
    };
  
    fetchData();
  }, [dataUpdated]);
  
  
  // Organisera data i sektioner baserat på produkttyp (exempelvis)
  const organizedData: Record<string, ICutItemWithProduct[]> = cutItemsWithProduct.reduce((acc, item) => {
    const sectionKey = item.product.type;
  
    if (!acc[sectionKey]) {
      acc[sectionKey] = [];
    }
  
    acc[sectionKey].push(item);
  
    return acc;
  }, {} as Record<string, ICutItemWithProduct[]>);
  

  const sections = Object.keys(organizedData).map((key) => ({
    title: key, // Använd produkttyp som titel
    data: organizedData[key], // Data för denna sektion
  }));

  const deleteItemFromDatabase = async (id: number) => {
    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
          'DELETE FROM CutItemsWithProduct WHERE id = ?',
          [id]
        );
      });
      // After deletion, refresh the data by fetching it again
      const updatedCutItems = await fetchCutItemsWithProductData();
      setCutItemsWithProduct(updatedCutItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <View>
      <Text>Hämtade CutItemsWithProduct-data:</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.product.id + index.toString()}
        renderItem={({ item }) => (
          <View style={{flexDirection: 'row'}}>
            <Text>
              Längd: {item.measurement}, Antal: {item.amount}, Product: {item.product.id} {item.product.type} {item.product.thickness} {item.product.width}
            </Text>
            {/* Lägg till en TouchableOpacity för att klicka på delete-ikonen */}
            <TouchableOpacity onPress={() => {
  if (item.id !== undefined) {
    deleteItemFromDatabase(item.id);
  }
}}>
  <MaterialIcons name="delete" size={24} color="black" />
</TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
        )}
      />
    </View>
  );
};


export default ShowSavedCutList;