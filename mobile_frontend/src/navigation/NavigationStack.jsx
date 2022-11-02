import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewProducts from "../components/Product/ViewProducts";
import ViewProduct from "../components/Product/ViewProduct";

export default function NavigationStack() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ViewProducts" component={ViewProducts} />
        <Stack.Screen name="ViewProduct" component={ViewProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
