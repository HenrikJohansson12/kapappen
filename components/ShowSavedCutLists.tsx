import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const SQLiteDataFetcher: React.FC = () => {
  const [cutItemsWithProduct, setCutItemsWithProduct] = useState<ICutItemWithProduct[]>([]);
  const db = SQLite.openDatabase('mydatabase.db');

  const fetchCutItemsWithProductData = async () => {
    return new Promise<ICutItemWithProduct[]>((resolve, reject) => {
      try {
        db.transactionAsync(async (tx) => {
          const result = await tx.executeSqlAsync(
            'SELECT measurement, amount, productId, type, thickness, width FROM CutItemsWithProduct',
            []
          );

          const cutItemsWithProduct: ICutItemWithProduct[] = [];

          // Convert ResultSet to an array of objects
          const rows = Array.from(result.rows);

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            const cutItemWithProduct: ICutItemWithProduct = {
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
    const getCutItemsWithProductData = async () => {
      try {
        const cutItemsData = await fetchCutItemsWithProductData();
        setCutItemsWithProduct(cutItemsData);
      } catch (error) {
        console.error('Fel vid hämtning av CutItemsWithProduct-data:', error);
      }
    };

    getCutItemsWithProductData();
  }, []);

  return (
    <View>
      <Text>Hämtade CutItemsWithProduct-data:</Text>
      {cutItemsWithProduct.map((item, index) => (
        <Text key={index}>
          Measurement: {item.measurement}, Amount: {item.amount}, Product: {item.product.id} {item.product.type} {item.product.thickness} {item.product.width}
        </Text>
      ))}
    </View>
  );
};

export default SQLiteDataFetcher;
