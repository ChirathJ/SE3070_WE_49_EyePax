import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import AuthContext from "../../context/UserContext";
import axios from "axios";
import SearchBar from "react-native-dynamic-search-bar";

function ViewOrder({ navigation, route }) {
  const { userId } = useContext(AuthContext);
  const [orderList, setOrderList] = useState([]);

  async function getAllOrder() {
    try {
      await axios
        .get(`http://192.168.1.5:8000/order/getAll/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setOrderList(res.data.data);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  async function searchOrder(term) {
    try {
      if (term) {
        await axios
          .get(`http://192.168.1.5:8000/order/search/${term}`)
          .then((res) => {
            if (res.status === 200) {
              setOrderList(res.data.data);
            }
          });
      } else {
        getAllOrder();
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getAllOrder();
  }, [navigation]);

  return (
    <View>
      <Text
        style={{
          color: "black",
          marginTop: 10,
          marginLeft: 10,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Orders
      </Text>

      <View style={{ margin: 10, backgroundColor: "white" }}>
        <SearchBar
          type="search"
          placeholder="Search Orders"
          onChangeText={(order) => {
            searchOrder(order);
          }}
          onClearPress={getAllOrder}
        />
      </View>

      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
        {orderList.length > 0 ? (
          orderList.map((element, id) => {
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
                  Order ID : {element.OrderId}
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
                  title="View"
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    width: "50%",
                  }}
                  icon={
                    <Icon
                      name="chevron-right"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  onPress={() =>
                    navigation.navigate("ViewSingleOrder", {
                      id: element._id,
                    })
                  }
                />
              </Card>
            );
          })
        ) : (
          <Text style={styles.errorMessage}>No Result Found</Text>
        )}
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
  errorMessage: {
    color: "black",
    textAlign: "center",
  },
});
