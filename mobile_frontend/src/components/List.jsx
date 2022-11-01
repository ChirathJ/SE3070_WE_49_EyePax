import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../context/UserContext";

function List() {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Text>List</Text>
      <TouchableOpacity onPress={logout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default List;
