import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import MeasurementInput from "../components/MeasurementInput";
import AvailableLengthsInput from "../components/AvailableLengthsInput";
import { MaterialIcons } from "@expo/vector-icons";
import CutList from "../components/CutList";
import ProductSelector from "../components/ProductSelector";
import { useSelectedProductContext } from "../contexts/SelectedProductContext";
//Denna skärmen ska hålla data från byggvaruhusen

const CutScreen = () => {
  const [addCutItemsVisible, setAddCutItemsVisible] = useState(false);
  const [addLengthsVisible, SetAddLengthsVisible] = useState(false);
  const  {selectedProduct} = useSelectedProductContext();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View>
        <Button
          title="Välj produkt"
          onPress={() => SetAddLengthsVisible(true)}
        ></Button>
        <Modal visible={addLengthsVisible}>
         
          <View style={styles.modalView}>
            <ProductSelector/>
            <MaterialIcons
            name="close"
            size={24}
            color="black"
            onPress={() => SetAddLengthsVisible(false)}
          />
          </View>
        </Modal>
      </View>
      <View>
        <Text> Välj produkt </Text>
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
            <MeasurementInput />
          </View>
        </Modal>
      </View>

      <CutList/>
      <Text> {selectedProduct?.type} {selectedProduct?.thickness}x{selectedProduct?.width}</Text>
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
