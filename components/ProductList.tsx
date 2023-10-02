import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

//Komponent som visar en lista med tillgängliga brädor
export default function ProductList() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  //Måste använda 10.0.2.2 för att emulatorn ska fungera
  const url = "http://10.0.2.2:5298/Product";

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        data.map((post) => {
          return (
            <View key={post.id}>
              <Text>
                {post.type} {post.thickness}x{post.width}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
}
