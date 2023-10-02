import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import MeasurementInput from "../components/MeasurementInput";
import AvailableLengthsInput from "../components/AvailableLengthsInput";
import { MaterialIcons } from "@expo/vector-icons";
import CutList from "../components/CutList";

//Denna skärmen ska hålla data från byggvaruhusen

const ManualCutScreen = () => {
  const [addCutItemsVisible, setAddCutItemsVisible] = useState(false);
  const [addLengthsVisible, SetAddLengthsVisible] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text> Välj längd </Text>
        <Button
          title="Lägg till egna längder"
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
      <View>
        <Button
          title="Lägg till längder"
          onPress={() => SetAddLengthsVisible(true)}
        ></Button>
        <Modal visible={addLengthsVisible}>
          <MaterialIcons
            name="close"
            size={24}
            color="black"
            onPress={() => SetAddLengthsVisible(false)}
          />
          <View style={styles.modalView}>
            <AvailableLengthsInput />
          </View>
        </Modal>
      </View>
      <CutList/>
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

export default ManualCutScreen;
