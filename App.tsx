import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootTabsNavigator from "./navigators/RootTabsNavigator";
import { CutItemProvider } from "./contexts/CutItemsContext";
import { AvailableLengthsProvider } from "./contexts/AvailableLengthsContext";
import { SelectedProductProvider } from "./contexts/SelectedProductContext";
import * as SQLite from 'expo-sqlite';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SelectedProductProvider>
        <AvailableLengthsProvider>
        <CutItemProvider>
          <StatusBar style="auto" />
          <RootTabsNavigator />
          </CutItemProvider>
          </AvailableLengthsProvider>
          </SelectedProductProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
