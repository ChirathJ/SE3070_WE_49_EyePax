import React from "react";
import { Text, View } from "react-native";

export default function ViewSingleCartItem(props) {
  const { id } = props;
  console.log(id);
  return (
    <View>
      <Text>One Item</Text>
    </View>
  );
}
