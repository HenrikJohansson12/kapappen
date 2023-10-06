import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import CutList from "../components/CutList";
import ProductSelector from "../components/ProductSelector";
import { useSelectedProductContext } from "../contexts/SelectedProductContext";
import MeasurementInput from "../components/MeasurementInput";
import { useCutItemContext } from "../contexts/CutItemsContext";
import * as SQLite from "expo-sqlite";
import { useSQLiteData } from "../contexts/SqLiteDataContext";

const CutScreen = () => {
  const [addCutItemsVisible, setAddCutItemsVisible] = useState(false);
  const [addLengthsVisible, setAddProductVisible] = useState(false);
  const { selectedProduct } = useSelectedProductContext();
  const { cutItems } = useCutItemContext();
  const [cutItemsWithProduct, setCutItemsWithProduct] = useState<
    ICutItemWithProduct[]
  >([]);
  const { updateData } = useSQLiteData();

  const db = SQLite.openDatabase("mydatabase.db");

  const combineCutItemsWithProduct = (
    cutItems: ICutItem[]
  ): ICutItemWithProduct[] => {
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
    const cutItemsWithProductResult: ICutItemWithProduct[] =
      combineCutItemsWithProduct(cutItems);
    setCutItemsWithProduct(cutItemsWithProductResult);

    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
          "CREATE TABLE IF NOT EXISTS CutItemsWithProduct (id INTEGER PRIMARY KEY AUTOINCREMENT, measurement REAL, amount INTEGER, productId INTEGER, type TEXT, thickness REAL, width REAL)"
        );

        for (const item of cutItemsWithProductResult) {
          const { measurement, amount, product } = item;
          await tx.executeSqlAsync(
            "INSERT INTO CutItemsWithProduct (measurement, amount, productId, type, thickness, width) VALUES (?, ?, ?, ?, ?, ?)",
            [
              measurement,
              amount,
              product.id,
              product.type,
              product.thickness,
              product.width,
            ]
          );
        }
      });
      updateData();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Börja med att välja produkt och sen antal längder du behöver. 
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Välj produkt"
          onPress={() => setAddProductVisible(true)}
        ></Button>
        <Modal visible={addLengthsVisible}>
          <View style={styles.modalView}>
            <ProductSelector />
            <Button
             title="        OK       "
              onPress={() => setAddProductVisible(false)}
            />
          </View>
        </Modal >
        <Button
          title="Lägg till dina mått"
          onPress={() => setAddCutItemsVisible(true)}
        />
        <Modal visible={addCutItemsVisible}>
          <View style={styles.modalView}>
            <MeasurementInput />
            <Button
             title="        OK       "
            onPress={() => setAddCutItemsVisible(false)}
            />
            
          </View>
        </Modal>
      </View>
      <View style={styles.descriptionContainer}>
      <Text style={styles.selectedproducttext}>
        Vald produkt:
        {selectedProduct?.type} {selectedProduct?.thickness}x
        {selectedProduct?.width} mm
      </Text>
      <CutList />
      </View>
      <Button title="Spara till inköpslista" onPress={handleGoToShoppingList} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#222", 
    paddingTop: 40,
  },
  descriptionContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    marginTop: 20,
  },
  selectedproducttext: {
    fontSize: 20, 
    color: 'white', 
   
  },
  descriptionText: {
    fontSize: 16,
    color: 'white', 
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    marginTop: 100,
    backgroundColor: "#222", 
  },
  modalView: {
    flex:1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent:"space-evenly"

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
