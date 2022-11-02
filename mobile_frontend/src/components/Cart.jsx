import { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/UserContext";
import { useContext } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Cart() {
  const { userId } = useContext(AuthContext);
  const [cartList, setCartList] = useState([]);

  async function getAllData() {
    try {
      await axios
        .get(`http://192.168.1.2:8000/cart/getAll/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setCartList(res.data.data);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.mainTitle}>Hello World</Text>
    </View>
  </SafeAreaView>
  );
}
