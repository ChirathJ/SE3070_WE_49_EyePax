import React from "react";
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
  const { userId } = useContext(AuthContext);
  const [orderList, setOrderList] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const navigation = useNavigation();
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
