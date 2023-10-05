import React, { useEffect, useState } from "react";
import { Text, View, SectionList, TouchableOpacity,StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { useSQLiteData } from "../contexts/SqLiteDataContext";
import { MaterialIcons } from "@expo/vector-icons";

const ShowSavedCutList: React.FC = () => {
  const [cutItemsWithProduct, setCutItemsWithProduct] = useState<
    ICutItemWithProduct[]
  >([]);
  const db = SQLite.openDatabase("mydatabase.db");
  const { dataUpdated } = useSQLiteData();

  const fetchCutItemsWithProductData = async () => {
    return new Promise<ICutItemWithProduct[]>((resolve, reject) => {
      try {
        db.transactionAsync(async (tx) => {
          const result = await tx.executeSqlAsync(
            "SELECT id, measurement, amount, productId, type, thickness, width FROM CutItemsWithProduct",
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
  const organizedData: Record<string, ICutItemWithProduct[]> =
    cutItemsWithProduct.reduce((acc, item) => {
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
          "DELETE FROM CutItemsWithProduct WHERE id = ?",
          [id]
        );
      });
      // After deletion, refresh the data by fetching it again
      const updatedCutItems = await fetchCutItemsWithProductData();
      setCutItemsWithProduct(updatedCutItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>Sparade listor</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.product.id + index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.descriptionText}>
              Längd: {item.measurement}mm, Antal: {item.amount}, Product:{" "}
               {item.product.type} {item.product.thickness}{"x"}
              {item.product.width} mm
            </Text>
          
            <TouchableOpacity
              onPress={() => {
                if (item.id !== undefined) {
                  deleteItemFromDatabase(item.id);
                }
              }}
            >
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={{ fontWeight: "bold", color:'white' }}>{section.title}</Text>
        )}
      />
    </View>
  );
};

export default ShowSavedCutList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#222', 
    },
    welcomeText: {
      fontSize: 42, 
      color: 'white', 
      marginBottom: 10, 
    },
    descriptionText: {
      fontSize: 12, 
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
  