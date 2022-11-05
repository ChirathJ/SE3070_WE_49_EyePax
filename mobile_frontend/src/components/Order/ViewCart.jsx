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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";

function ViewCart({ navigation }) {
  const { userId } = useContext(AuthContext);
  const [cartList, setCartList] = useState([]);
  const [siteAddress, setSiteAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const isFocused = useIsFocused();

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || deliveryDate;
    setDate(currentDate);
  };

  function handleDateOpen() {
    setIsOpen(true);
  }

  async function getAllData() {
    try {
      await axios
        .get(`http://192.168.1.190:8000/cart/getAll/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setCartList(res?.data?.data);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  async function handleConfirmOrder() {
    try {
      const orderObject = {
        SiteManager: userId,
        Cart: cartList,
        SiteAddress: siteAddress,
        DeliveryDate: deliveryDate,
        TotalPrice: totalPrice,
      };

      if (siteAddress === "") {
        alert("Please Enter a Site Address!");
      } else if (totalPrice > 100000) {
        alert("Total Price is greater that Rs.100,000, Request Approval");
        navigation.navigate("AddNote", {
          orderObject: orderObject,
        });
      } else {
        await axios
          .post(`http://192.168.1.190:8000/order/add`, orderObject)
          .then((res) => {
            if (res.status === 201) {
              alert(res.data.message);
              setSiteAddress("");
              getAllData();
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  }

  async function handleDeleteCart() {
    try {
      await axios
        .delete(`http://192.168.1.190:8000/cart/delete/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setSiteAddress("");
            getAllData();
            alert("Cart Cleared!");
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  function calcTotalPrice() {
    let total = 0;
    cartList.forEach((item) => {
      total = total + item.Total;
    });
    setTotalPrice(total);
  }

  async function removeItem(id) {
    try {
      await axios
        .delete(`http://192.168.1.190:8000/cart/deleteOne/${id}`)
        .then((res) => {
          if (res.status === 200) {
            getAllData();
            alert("Item Deleted!");
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getAllData();
  }, [isFocused]);

  useEffect(() => {
    calcTotalPrice();
  }, [cartList]);

  return (
    <View>
      <View style={styles.row}>
        <Text
          style={{
            color: "black",
            marginTop: 10,
            marginRight: 60,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Cart
        </Text>
        <Text
          style={{
            color: "black",
            marginTop: 18,
            marginLeft: 45,
            fontSize: 20,
          }}
        >
          Total Price: Rs.{totalPrice}
        </Text>
      </View>

      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
        {cartList.map((element, id) => {
          return (
            <Card key={id} style={{ width: "100%", height: 80 }}>
              <Card.Divider />
              <Card.Image
                style={styles.image}
                source={{
                  uri: `http://192.168.1.190:8000/fetchImage/${element.ProductImage}`,
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
                buttonStyle={{
                  borderRadius: 15,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  width: "30%",
                  backgroundColor: "red",
                }}
                title="Remove"
                onPress={() => {
                  removeItem(element._id);
                }}
              />
            </Card>
          );
        })}
      </ScrollView>

      <View style={styles.row}>
        <View>
          <Text style={styles.TextTitle}>Site Address*</Text>
          <TextInput
            value={siteAddress}
            style={styles.TextInput}
            onChangeText={(SiteAddress) => setSiteAddress(SiteAddress)}
          />
        </View>

        <View>
          <Text style={styles.TextTitle}>Delivery Date*</Text>
          <TouchableOpacity onPress={handleDateOpen}>
            <Text style={styles.TextInput}>{deliveryDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        {isOpen === true ? (
          <DateTimePicker
            value={deliveryDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={changeSelectedDate}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.column}>
        <TouchableOpacity style={styles.cartBtn} onPress={handleConfirmOrder}>
          <Text>Confirm Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteCart}>
          <Text style={{ color: "red" }}>Delete Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ViewCart;

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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  column: {
    marginHorizontal: 100,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBtn: {
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
  deleteBtn: {
    width: "100%",
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
});
