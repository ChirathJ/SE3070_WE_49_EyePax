import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import axios from "axios";
import AuthContext from "../../context/UserContext";

const ViewProduct = ({ navigation, route }) => {
  const id = route.params.id;
  const { userId } = useContext(AuthContext);
  const [getproductdata, setProductdata] = useState([]);
  const [units, setUnits] = useState(2);

  const getdata = async () => {
    try {
      await axios
        .get(`http://192.168.1.190:8000/product/view/${id}`)
        .then((res) => {
          if (res.status === 201) {
            setProductdata(res.data);
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  async function addToCart() {
    try {
      const cartObject = {
        SiteManager: userId,
        ProductName: getproductdata.ProductName,
        ProductId: getproductdata.ProductCode,
        ProductImage: getproductdata.Image,
        Supplier: getproductdata.user.name,
        Qty: units,
        Total: getproductdata.Price * units,
      };

      if (cartObject.length !== 0) {
        await axios
          .post(`http://192.168.1.190:8000/cart/add`, cartObject)
          .then((res) => {
            if (res.status === 201) {
              alert(res.data.message);
              navigation.navigate("ViewProducts", {});
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <Card.Title>{getproductdata.ProductName}</Card.Title>
            <Text>{getproductdata.Qty} Units remaining</Text>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{
                uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
              }}
            />
            <Text style={{ marginBottom: 10 }}>Units {getproductdata.Qty}</Text>
            <Text style={{ marginBottom: 10 }}>
              Total Price {getproductdata.Price}
            </Text>

            <Button
              icon={
                <Icon
                  name="code"
                  color="#0a0906"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 10,
                backgroundColor: "#f0ac0e",
              }}
              title="Add to Cart"
              onPress={addToCart}
            />
            <Button
              icon={
                <Icon
                  name="code"
                  color="#0a0906"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() =>
                navigation.navigate("ViewProducts", { screen: "ViewProducts" })
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: "#ab9046",
              }}
              title="Back to Items"
            />
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate("ViewProducts")}
            />
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    margin: "10%",
    backgroundColor: "#F5FCFF",
  },

  container1: {
    justifyContent: "center",
    margin: "10%",
    backgroundColor: "#F5FCFF",
    float: "right",
    width: "30%",
  },
});
