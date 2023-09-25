import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootTabsNavigator from "./navigators/RootTabsNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <StatusBar style="auto" />
          <RootTabsNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
