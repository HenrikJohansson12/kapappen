import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootTabsNavigator from "./navigators/RootTabsNavigator";
import { CutItemProvider } from "./contexts/CutItemsContext";

import { SelectedProductProvider } from "./contexts/SelectedProductContext";
import { SQLiteDataProvider } from "./contexts/SqLiteDataContext";



export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SQLiteDataProvider>
        <SelectedProductProvider>
        <CutItemProvider>
          <StatusBar style="auto" />
          <RootTabsNavigator />
          </CutItemProvider>
          </SelectedProductProvider>
          </SQLiteDataProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
