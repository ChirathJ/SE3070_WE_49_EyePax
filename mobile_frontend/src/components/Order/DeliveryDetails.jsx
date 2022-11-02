import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import AuthContext from "../../context/UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function DeliveryDetails() {
  const id = "63625be8985430bcd416fc01";
  const { userId } = useContext(AuthContext);
  const [orderId, setOrderId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [productsList, setProductsList] = useState([]);
  const navigation = useNavigation();

  async function getOrder() {
    try {
      await axios
        .get(`http://192.168.1.2:8000/order/getById/${id}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data);
            setOrderId(res.data.data.OrderId.substring(0, 8));
            setTotalPrice(res.data.data.TotalPrice);
            setProductsList(res.data.data.Cart);
          }
        });
    } catch (error) {
      alert(error);
    }
  }
  
  async function makeDelivery() {
    try {
      await axios
        .put(`http://192.168.1.2:8000/order/update/${id}`)
        .then((res) => {
          alert("Marked as Delivered");
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <View>
      <Text
        style={{
          color: "black",
          marginTop: 50,
          marginLeft: 70,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Delivery Details
      </Text>

      <View>
        <Text
          style={{
            color: "green",
            fontSize: 25,
            marginLeft: 50,
          }}
        >
          Total Price : Rs. {totalPrice}
        </Text>
        <Text
          style={{
            color: "grey",
            fontSize: 20,
            marginLeft: 90,
          }}
        >
          Order Id : {orderId}
        </Text>
      </View>

      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
        {productsList.map((element, id) => {
          return (
            <Card key={id}>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source= {{ uri: `http://192.168.1.2:8000/routes/ProductManagement/ProductImages/${element.ProductImage}`}}
              />
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {element.ProductName}
              </Text>
              <Text style={{ marginBottom: 10 }}>{element.Supplier}</Text>
              <Text style={{ marginBottom: 10 }}>{element.ProductId}</Text>
              <Text style={{ marginBottom: 10 }}>
                Total : Rs.{element.Total}
              </Text>
              <Text style={{ marginBottom: 10, color: "blue" }}>
                {element.Qty} Units
              </Text>
            </Card>
          );
        })}
      </ScrollView>

      <View style={styles.column}>
        <TouchableOpacity style={styles.deliveryBtn} onPress={makeDelivery}>
          <Text>Mark as Delivered</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    marginHorizontal: 100,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryBtn: {
    width: "100%",
    backgroundColor: "#ffa500",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffa500",
    marginBottom: 10,
    marginTop: 10,
  },
});
