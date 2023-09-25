import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";

import HomeStackNavigator from "./HomeStackNavigator";
import CutScreen from "../screens/CutScreen";

export type RootTabsParamList = {
  HomeTab: undefined;
  FavoritesTab: undefined;
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
        name="FavoritesTab"
        component={CutScreen}
        options={{
          title: "Kapa",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="hand-saw" size={24} color="black" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
