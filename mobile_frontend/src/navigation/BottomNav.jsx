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
          //   backgroundColor: "#ffffff",
          backgroundColor: "tomato",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 70,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen name="Suppliers" component={List} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={Order} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
