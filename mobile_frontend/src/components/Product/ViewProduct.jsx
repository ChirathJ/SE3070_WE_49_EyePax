import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { PricingCard, lightColors } from "@rneui/themed";

const ViewProduct = ({navigation}) => {
  const [getproductdata, setProductdata] = useState([]);

  const { id } = useParams("");

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
      console.log("get data");
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
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: "",
              }}
              title="Back to Items"
            />
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

export default ViewProduct;
