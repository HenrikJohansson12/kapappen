import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootTabsNavigator from "./navigators/RootTabsNavigator";
import { CutItemProvider } from "./contexts/CutItemsContext";
import { AvailableLengthsProvider } from "./contexts/AvailableLengthsContext";
import { SelectedProductProvider } from "./contexts/SelectedProductContext";
import { SQLiteDataProvider } from "./contexts/SqLiteDataContext";



export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SQLiteDataProvider>
        <SelectedProductProvider>
        <AvailableLengthsProvider>
        <CutItemProvider>
          <StatusBar style="auto" />
          <RootTabsNavigator />
          </CutItemProvider>
          </AvailableLengthsProvider>
          </SelectedProductProvider>
          </SQLiteDataProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
