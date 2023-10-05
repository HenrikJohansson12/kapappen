import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelectedProductContext } from "../contexts/SelectedProductContext";


const ShowStoreInventory = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const {selectedProduct,setSelectedProduct} = useSelectedProductContext();
  const [loading, setLoading] = useState(true);
  // Måste använda 10.0.2.2 för att emulatorn ska fungera
  const url = "http://192.168.255.239:5298/Product";

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

  const handleProductSelect = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const renderItem = ({ item }: { item: IProduct }) => (
    <TouchableOpacity onPress={() => handleProductSelect(item)}>
      <View style={styles.item}>
        <Text style={styles.textstyle}>{item.type} {item.thickness}x{item.width} mm</Text>
     
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
              <Text style={styles.textstyle}>Type: {selectedProduct.type}</Text>
              <Text style={styles.textstyle}>Thickness: {selectedProduct.thickness} mm</Text>
              <Text style={styles.textstyle}>Width: {selectedProduct.width}mm</Text>
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
    backgroundColor: '#333',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
   

  },
  selectedProduct: {
    backgroundColor: '#333',
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
    
   
  },
  selectedProductText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white',
  },
textstyle:{
color:'white',
}
});

export default ShowStoreInventory;
