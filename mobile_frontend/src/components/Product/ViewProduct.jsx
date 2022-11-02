import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { PricingCard, lightColors } from "@rneui/themed";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import ViewProducts from "./ViewProducts";

const ViewProduct = ({ navigation, route }) => {
  const id = route.params.id;
  console.log(id, "id")
  const [getproductdata, setProductdata] = useState([]);

  const getdata = async () => {
    const res = await fetch(`http://192.168.1.2:8000/product/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setProductdata(data);    
    }
  };

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
            />
            <Button
              icon={
                <Icon
                  name="code"
                  color="#0a0906"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() => navigation.navigate('ViewProducts', {screen: 'ViewProducts'})}
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
        onPress={() => navigation.navigate('ViewProducts')}
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
    backgroundColor: "#F5FCFF"
  },

  container1: {
    justifyContent: "center",
    margin: "10%",
    backgroundColor: "#F5FCFF",
    float: "right",
    width: "30%",
  },
});
