import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CutList from "../components/CutList";
import ProductSelector from "../components/ProductSelector";
import { useSelectedProductContext } from "../contexts/SelectedProductContext";
import CutItemInput from "../components/MeasurementInput";
import { useCutItemContext } from "../contexts/CutItemsContext";
import * as SQLite from 'expo-sqlite';
import { useSQLiteData } from "../contexts/SqLiteDataContext";

const CutScreen = () => {
  const [addCutItemsVisible, setAddCutItemsVisible] = useState(false);
  const [addLengthsVisible, setAddLengthsVisible] = useState(false);
  const { selectedProduct } = useSelectedProductContext();
  const { cutItems } = useCutItemContext();
  const [cutItemsWithProduct, setCutItemsWithProduct] = useState<ICutItemWithProduct[]>([]);
  const { updateData } = useSQLiteData();

  const db = SQLite.openDatabase('mydatabase.db');

  const combineCutItemsWithProduct = (cutItems: ICutItem[]): ICutItemWithProduct[] => {
    if (!selectedProduct) {
      return [];
    }

    return cutItems.map((cutItem) => ({
      measurement: cutItem.measurement,
      amount: cutItem.amount,
      product: selectedProduct,
    }));
  };

  const handleGoToShoppingList = async () => {
    const cutItemsWithProductResult: ICutItemWithProduct[] = combineCutItemsWithProduct(cutItems);
    setCutItemsWithProduct(cutItemsWithProductResult);

    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
          'CREATE TABLE IF NOT EXISTS CutItemsWithProduct (id INTEGER PRIMARY KEY AUTOINCREMENT, measurement REAL, amount INTEGER, productId INTEGER, type TEXT, thickness REAL, width REAL)'
        );

        for (const item of cutItemsWithProductResult) {
          const { measurement, amount, product } = item;
          await tx.executeSqlAsync(
            'INSERT INTO CutItemsWithProduct (measurement, amount, productId, type, thickness, width) VALUES (?, ?, ?, ?, ?, ?)',
            [measurement, amount, product.id, product.type, product.thickness, product.width]
          );
        }
      });
      updateData();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
    

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View>
        <Button
          title="Välj produkt"
          onPress={() => setAddLengthsVisible(true)}
        ></Button>
        <Modal visible={addLengthsVisible}>
         
          <View style={styles.modalView}>
            <ProductSelector/>
            <MaterialIcons
            name="close"
            size={24}
            color="black"
            onPress={() => setAddLengthsVisible(false)}
          />
          </View>
        </Modal>
      </View>
      <View>
        <Button
          title="Lägg till dina mått"
          onPress={() => setAddCutItemsVisible(true)}
        />
        <Modal visible={addCutItemsVisible}>
          <MaterialIcons
            name="close"
            size={24}
            color="black"
            onPress={() => setAddCutItemsVisible(false)}
          />
          <View style={styles.modalView}>
            <CutItemInput />
          </View>
        </Modal>
      </View>

      <CutList/>
      <Text> {selectedProduct?.type} {selectedProduct?.thickness}x{selectedProduct?.width}</Text>
      <Button title="Spara till inköpslista" onPress={handleGoToShoppingList}/>


     <Text>
  {cutItemsWithProduct.map((item, index) => (
    <Text key={index}>
      Measurement: {item.measurement}, Amount: {item.amount}, Product: {item.product.id} {item.product.thickness} {item.product.width}
      {/* Lägg till fler egenskaper om det behövs */}
      {index < cutItemsWithProduct.length - 1 && ", "}
    </Text>
  ))}
</Text>
    </View>

    
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CutScreen;
