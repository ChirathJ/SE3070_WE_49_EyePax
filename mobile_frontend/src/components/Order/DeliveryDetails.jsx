import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import axios from "axios";

export default function DeliveryDetails({ navigation, route }) {
  const id = route.params.id;
  const [orderId, setOrderId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [deliveryStatus, setIsDeliveryStatus] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);

  async function getOrderDelivery() {
    try {
      await axios
        .get(`http://192.168.1.190:8000/order/getById/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setIsDeliveryStatus(res.data.data.DeliveryStatus);
            setOrderId(res.data.data.OrderId);
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
        .put(`http://192.168.1.190:8000/order/update/${id}`)
        .then((res) => {
          alert("Marked as Delivered");
          navigation.navigate("ViewSingleOrder", { id: id });
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getOrderDelivery();
  }, [route]);

  useEffect(() => {
    if (deliveryStatus === "Delivered") {
      setIsDelivered(true);
    } else if (deliveryStatus === "Not Delivered") {
      setIsDelivered(false);
    }
  }, [deliveryStatus]);

  return (
    <View>
      <View style={styles.row}>
        <Button
          buttonStyle={{
            marginTop: 10,
            marginRight: 25,
            backgroundColor: "#f2f2f2",
          }}
          icon={<Icon name="chevron-left" color="black" />}
          onPress={() => navigation.navigate("ViewSingleOrder", { id: id })}
        />
        <Text
          style={{
            color: "black",
            marginTop: 10,
            marginRight: 75,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Delivery Details
        </Text>
      </View>

      <View style={styles.row}>
        <Text
          style={{
            color: "green",
            fontSize: 25,
          }}
        >
          Total Price : Rs. {totalPrice}
        </Text>
        <Text
          style={{
            color: "grey",
            fontSize: 20,
          }}
        >
          Order Id : {orderId}
        </Text>
      </View>

      <ScrollView style={{ height: "67%", marginBottom: 10 }}>
        {productsList.map((element, id) => {
          return (
            <Card key={id}>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={{
                  uri: `http://192.168.1.190:8000/routes/ProductManagement/ProductImages/${element.ProductImage}`,
                }}
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

      {isDelivered === false ? (
        <View style={styles.column}>
          <TouchableOpacity style={styles.deliveryBtn} onPress={makeDelivery}>
            <Text>Mark as Delivered</Text>
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
