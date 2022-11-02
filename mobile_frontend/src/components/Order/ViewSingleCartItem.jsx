import React, { useState, useEffect, useContext } from "react";
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

export default function ViewSingleCartItem() {
  const id = "63625be8985430bcd416fc01";
  const { userId } = useContext(AuthContext);
  const [orderId, setOrderId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [status, setStatus] = useState("");
  const [productsList, setProductsList] = useState([]);
  const navigation = useNavigation();

  async function getOrder() {
    try {
      await axios
        .get(`http://192.168.1.2:8000/order/getById/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setOrderId(res.data.data.OrderId?.substring(0, 8));
            setStatus(res.data.data.DeliveryStatus);
            setTotalPrice(res.data.data.TotalPrice);
            setProductsList(res.data.data.Cart);
          }
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
          {orderId}
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
              color: "black",
              fontSize: 20,
              marginLeft: 90,
            }}
          >
            Status : 
            {status === "Not Delivered" ? (
              <Text
                style={{
                  color: "red",
                  fontSize: 20,
                  marginLeft: 90,
                }}
              >
                {status}
              </Text>
            ) : (
              <Text
                style={{
                  color: "green",
                  fontSize: 20,
                  marginLeft: 90,
                }}
              >
                {status}
              </Text>
            )}
          </Text>
        </View>
      </View>

      <ScrollView style={{ height: "58%", marginBottom: 3 }}>
        {productsList.map((element, id) => {
          return (
            <Card key={id}>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={{
                  uri: `http://192.168.1.2:8000/routes/ProductManagement/ProductImages/${element.ProductImage}`,
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
                Total: Rs.
                {element.Total}
              </Text>
              <Text style={{ marginBottom: 10, color: "blue" }}>
                {element.Qty} Units
              </Text>

              <Button
                icon={
                  <Icon
                    name="code"
                    color="#ffffff"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  width: "50%",
                }}
                title="View"
                onPress={() =>
                  navigation.navigate("ViewSingleCartItem", {
                    state: element._id,
                  })
                }
              />
            </Card>
          );
        })}
      </ScrollView>

      <View style={styles.column}>
        <TouchableOpacity style={styles.inquiryBtn}>
          <Text>Make Inquiry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deliveryBtn}>
          <Text>Delivery Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TextTitle: {
    padding: 0,
    marginLeft: 15,
    textAlign: "center",
  },
  TextInput: {
    height: 30,
    width: 150,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  column: {
    marginHorizontal: 100,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  inquiryBtn: {
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
  deliveryBtn: {
    width: "100%",
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
});
