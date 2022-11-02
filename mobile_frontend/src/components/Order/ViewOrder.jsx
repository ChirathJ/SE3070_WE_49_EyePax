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

function ViewOrder() {
  const { userId } = useContext(AuthContext);
  const [orderList, setOrderList] = useState([]);
  const navigation = useNavigation();

  async function getAllOrder() {
    try {
      await axios
        .get(`http://192.168.1.2:8000/order/getAll/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setOrderList(res.data.data);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getAllOrder();
  }, [orderList]);

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
        Orders
      </Text>

      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
        {orderList.map((element, id) => {
          return (
            <Card key={id}>
              <Card.Divider />
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Order ID : {element.OrderId.substring(0, 8)}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Status :{" "}
                {element.DeliveryStatus === "Not Delivered" ? (
                  <Text style={{ color: "red", fontSize: 15 }}>
                    {element.DeliveryStatus}
                  </Text>
                ) : (
                  <Text style={{ color: "green", fontSize: 15 }}>
                    {element.DeliveryStatus}
                  </Text>
                )}
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
    </View>
  );
}

export default ViewOrder;

const styles = StyleSheet.create({
  column: {
    marginHorizontal: 100,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
