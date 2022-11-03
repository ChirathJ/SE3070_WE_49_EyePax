import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SupplierList from "./Product/SupplierList";
import ViewProducts from "./Product/ViewProducts";
import ViewProduct from "./Product/ViewProduct";

export default function Product() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="SupplierList" component={SupplierList} /> */}
      <Stack.Screen name="ViewProducts" component={ViewProducts} />
      <Stack.Screen name="ViewProduct" component={ViewProduct} />
    </Stack.Navigator>
  );
}
