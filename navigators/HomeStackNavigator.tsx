import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import { RootTabsParamList } from "./RootTabsNavigator";
import CutScreen from "../screens/CutScreen";

export type HomeStackParamList = {
  Home: NavigatorScreenParams<RootTabsParamList>;
  Detail: { name: string; query: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Hem" }}
      />
      <Stack.Screen
        name="Detail"
        component={CutScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}
