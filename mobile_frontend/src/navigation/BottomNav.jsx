import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import Product from "../components/Product";
import Cart from "../components/Cart";
import Order from "../components/Order";

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
      <Tab.Screen
        name="Suppliers"
        component={Product}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="local-shipping"
              color={focused ? "#ffa500" : "#000000"}
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shopping-cart"
              color={focused ? "#ffa500" : "#000000"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="inventory"
              color={focused ? "#ffa500" : "#000000"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
