import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import List from "../components/List";
import Cart from "../components/Cart";
import Order from "../components/Order";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
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
      <Tab.Screen name="Suppliers" component={List} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={Order} />
    </Tab.Navigator>
  );
};

export default Tabs;
