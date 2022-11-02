import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewCart from "./Order/ViewCart";
import ViewSingleCartItem from "./Order/ViewSingleCartItem";

export default function CartNavigationStack() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="ViewCart" component={ViewCart} />
        <Stack.Screen
          name="ViewSingleCartItem"
          component={ViewSingleCartItem}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
