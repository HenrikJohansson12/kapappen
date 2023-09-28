import React from "react";
import { View, Text } from "react-native";
import { useCutItemContext } from "../contexts/CutItemsContext";

export default function CutList() {
  const { cutItems } = useCutItemContext();

  return (
    <View>
      {cutItems.map((item, index) => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Measurement: {item.measurement} Amount: {item.amount}{" "}
        </Text>
      ))}
    </View>
  );
}
