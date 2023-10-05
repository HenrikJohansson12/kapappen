import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import React from "react";

import HomeStackNavigator from "./HomeStackNavigator";
import CutScreen from "../screens/CutScreen";
import BuyScreen from "../screens/BuyScreen";

export type RootTabsParamList = {
  HomeTab: undefined;
  AddItemsTab: undefined;
  Buytab:undefined
};

const Tabs = createBottomTabNavigator<RootTabsParamList>();

export default function RootTabsNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Hem",
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialIcons
              size={props.size}
              color={props.color}
              name="grid-view"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddItemsTab"
        component={CutScreen}
        options={{
          title: "Lägg till",
          tabBarIcon: (props) => (
            <MaterialIcons name="add" size={24} color="black" />
          ),
        }}
      />

<Tabs.Screen
        name="Buytab"
        component={BuyScreen}
        options={{
          title: "Kapa",
          tabBarIcon: (props) => (
            <FontAwesome name="shopping-cart" size={24} color="black" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
