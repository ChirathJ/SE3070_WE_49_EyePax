import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewOrder from "./Order/ViewOrder";
import ViewSingleOrder from "./Order/ViewSingleOrder";
import Inquiry from "./Order/Inquiry";
import DeliveryDetails from "./Order/DeliveryDetails";

export default function Order() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ViewOrder" component={ViewOrder} />
      <Stack.Screen name="ViewSingleOrder" component={ViewSingleOrder} />
      <Stack.Screen name="Inquiry" component={Inquiry} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
    </Stack.Navigator>
  );
}
