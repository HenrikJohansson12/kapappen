import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootTabsNavigator from "./navigators/RootTabsNavigator";
import { CutItemProvider } from "./contexts/CutItemsContext";
import { AvailableLengthsProvider } from "./contexts/AvailableLengthsContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AvailableLengthsProvider>
        <CutItemProvider>
          <StatusBar style="auto" />
          <RootTabsNavigator />
          </CutItemProvider>
          </AvailableLengthsProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
