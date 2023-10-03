import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelectedProductContext } from "../contexts/SelectedProductContext";


const ProductSelector = () => {
  const [data, setData] = useState<Product[]>([]);
  const {selectedProduct,setSelectedProduct} = useSelectedProductContext();
    const [loading, setLoading] = useState(true);
  // Måste använda 10.0.2.2 för att emulatorn ska fungera
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

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleProductSelect(item)}>
      <View style={styles.item}>
        <Text>{item.type} {item.thickness}x{item.width}</Text>
     
      </View>
    </TouchableOpacity>
  );

  return (

        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Använd id som nyckel
          />
          {selectedProduct && (
            <View style={styles.selectedProduct}>
              <Text style={styles.selectedProductText}>Selected Product:</Text>
              <Text>Type: {selectedProduct.type}</Text>
              <Text>Thickness: {selectedProduct.thickness}mm</Text>
              <Text>Width: {selectedProduct.width}mm</Text>
            </View>
          )}
        </View>
      )}
   
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  selectedProduct: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  selectedProductText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductSelector;
