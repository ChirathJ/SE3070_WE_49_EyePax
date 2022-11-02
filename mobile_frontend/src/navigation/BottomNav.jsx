import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ViewProducts from "../components/Product/ViewProducts";
import ViewCart from "../components/Order/ViewCart";
import Order from "../components/Order";
import { KeyboardAvoidingView } from "react-native";
import AuthContext from "../context/UserContext";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          backgroundColor: "#ffffff",
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderTopColor: "#D3D3D3",
          borderLeftColor: "#D3D3D3",
          borderRightColor: "#D3D3D3",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 70,
       
        },
      }}
    >
      <Tab.Screen name="Suppliers" component={ViewProducts} />
      <Tab.Screen name="Cart" component={ViewCart} />
      <Tab.Screen name="Orders" component={Order} />
    </Tab.Navigator>
  );
};

export default Tabs;
