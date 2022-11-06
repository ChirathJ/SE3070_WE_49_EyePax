import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "@rneui/themed";
import AuthContext from "../../context/UserContext";

const SupplierList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const { logout } = useContext(AuthContext);
  // const navigation = useNavigation();
  // function viewProduct(data) {
  //   navigate("/products/" + data._id, { state: data });
  // }

  const getall = async () => {
    try {
      await axios
        .get(`http://172.28.19.253:8000/user/?filter=Supplier`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res?.data?.users);
            setUsers(res?.data?.users);
          }
        });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getall();
  }, []);

  return (
    <View>
      <View style={styles.row}>
        <Text
          style={{
            color: "black",
            marginLeft: 10,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Supplier List
        </Text>
        <View style={styles.logoutBtn}>
          <TouchableOpacity onPress={logout}>
            <Text>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View>
          {users?.map((current, index) => {
            return (
              <Card key={index}>
                <Text>{current.id}</Text>
                <Text>{current.name}</Text>
                <Text>{current.email}</Text>
                <Button
                  // icon={
                  //   <Icon
                  //     name="code"
                  //     color="#ffffff"
                  //     iconStyle={{ marginRight: 10 }}
                  //   />
                  // }
                  title="View"
                  onPress={() =>
                    navigation.navigate("ViewProducts", {
                      id: current._id,
                    })
                  }
                  // buttonStyle={{
                  //   borderRadius: 0,
                  //   marginLeft: 0,
                  //   marginRight: 0,
                  //   marginBottom: 0,
                  //   width: "50%",
                  // }}
                />
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SupplierList;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  logoutBtn: {
    position: "absolute",
    right: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
