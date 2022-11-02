import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CardList } from "react-native-card-list";
import { deldata } from "./context/ContextProvider";
import { Text, Card, Button, Icon } from "@rneui/themed";
// import { Link, useNavigation } from "@react-navigation/native";

function ViewProducts({ navigation }) {
  const [getproductdata, setProductdata] = useState([]);

  const { setDLTdata } = useContext(deldata);
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();

  const getdata = async () => {
    const res = await fetch(`http://192.168.1.2:8000/product/viewp`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setProductdata(data.getproductdata);
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.item}>
        <ScrollView style={{ marginBottom: 80 }}>
          {getproductdata.map((element, id) => {
            return (
              <Card key={id}>
                <Card.Divider />
                <Card.Image
                  style={{ padding: 0 }}
                  source={{
                    uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
                  }}
                />
                <Text style={{ marginBottom: 10 }}>{element.ProductName}</Text>
                <Text style={{ marginBottom: 10 }}>
                  {element.Qty} Units remaining
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
                    navigation.navigate("ViewProduct", { id: element._id })
                  }
                />
              </Card>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

export default ViewProducts;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    margin: "10%",
    backgroundColor: "#F5FCFF",
    float: "left",
    width: "30%",
  },

  container1: {
    justifyContent: "center",
    margin: "10%",
    backgroundColor: "#F5FCFF",
    float: "right",
    width: "30%",
  },
});
