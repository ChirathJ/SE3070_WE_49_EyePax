import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import ViewProducts from "../components/Product/ViewProducts";
import ViewCart from "../components/Order/ViewCart";
import ViewOrder from "../components/Order/ViewOrder";
import SupplierList from "../components/Product/SupplierList";
import ViewSingleCartItem from "../components/Order/ViewSingleCartItem";
import Inquiry from "../components/Order/Inquiry";
import DeliveryDetails from "../components/Order/DeliveryDetails";

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
        component={ViewProducts}
        options={{
          tabBarIcon: () => (
            <Icon name="code" color="#000000" iconStyle={{ marginRight: 10 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ViewCart}
        options={{
          tabBarIcon: () => (
            <Icon name="code" color="#000000" iconStyle={{ marginRight: 10 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={ViewOrder}
        options={{
          tabBarIcon: () => (
            <Icon name="code" color="#000000" iconStyle={{ marginRight: 10 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Order1"
        component={ViewSingleCartItem}
        options={{
          tabBarIcon: () => (
            <Icon name="code" color="#000000" iconStyle={{ marginRight: 10 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Inquiry"
        component={Inquiry}
        options={{
          tabBarIcon: () => (
            <Icon name="code" color="#000000" iconStyle={{ marginRight: 10 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Delivery"
        component={DeliveryDetails}
        options={{
          tabBarIcon: () => (
            <Icon name="code" color="#000000" iconStyle={{ marginRight: 10 }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
