import { useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import AuthContext from "../context/UserContext";
import { useContext } from "react";

export default function Cart() {
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(
        `http://192.168.1.2:8000/cart/getAll/${userId}`
      );
    }
    fetchData();

    console.log(data);
  }, []);

  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
}
