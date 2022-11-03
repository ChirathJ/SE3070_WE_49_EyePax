import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewCart from "./Order/ViewCart";
import AddNote from "./Order/AddNote";
import ViewOrder from "./Order/ViewOrder";

export default function CartNavigationStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ViewCart" component={ViewCart} />
      <Stack.Screen name="AddNote" component={AddNote} />
      <Stack.Screen name="Order" component={ViewOrder} />
    </Stack.Navigator>
  );
}
