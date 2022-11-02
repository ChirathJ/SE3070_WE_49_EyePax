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
import DateTimePicker from "@react-native-community/datetimepicker";

function ViewCart() {
  const { userId } = useContext(AuthContext);
  const [cartList, setCartList] = useState([]);
  const [siteAddress, setSiteAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  let total = 0;
  const [totalPrice, setTotalPrice] = useState(total);
  const [clearCart, setClearCart] = useState(false);

  const navigation = useNavigation();

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || deliveryDate;
    setDate(currentDate);
  };

  function handleDateOpen() {
    setIsOpen(true);
  }

  async function handleConfirmOrder() {
    try {
      const orderObject = {
        SiteManager: userId,
        Cart: cartList,
        SiteAddress: siteAddress,
        DeliveryDate: deliveryDate,
        TotalPrice: totalPrice,
        Comment: comment,
      };

      await axios
        .post(`http://192.168.1.2:8000/order/add`, orderObject)
        .then((res) => {
          if (res.status === 201) {
            setSiteAddress("");
            alert("Order Added");
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  async function handleDeleteOrder() {
    try {
      await axios
        .delete(`http://192.168.1.2:8000/cart/delete/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            alert("Cart Cleared!");
            setClearCart(true);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  async function getAllData() {
    try {
      await axios
        .get(`http://192.168.1.2:8000/cart/getAll/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setCartList(res.data.data);
            setTotalPrice(0);
            cartList.forEach((item) => {total = total + item.Total});
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    total = 0;
    getAllData();
  }, []);

  return (
    <View>
      <View style={styles.row}>
        <Text
          style={{
            color: "black",
            marginTop: 50,
            marginLeft: 50,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Cart
        </Text>
        <Text
          style={{
            color: "black",
            marginTop: 60,
            marginLeft: 50,
            fontSize: 20,
          }}
        >
          Total Price: Rs.{total}
        </Text>
      </View>

      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
        {cartList.map((element, id) => {
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

      <View style={styles.row}>
        <View>
          <Text style={styles.TextTitle}>Site Address</Text>
          <TextInput
            style={styles.TextInput}
            onChangeText={(SiteAddress) => setSiteAddress(SiteAddress)}
          />
        </View>

        <View>
          <Text style={styles.TextTitle}>Delivery Date</Text>
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

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteOrder}>
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
