import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../context/UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Inquiry() {
  const { userId } = useContext(AuthContext);
  const [inquiry, setInquiry] = useState("");

  function senInquiry() {}

  return (
    <View>
      <Text
        style={{
          color: "black",
          marginTop: 50,
          marginLeft: 50,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Inquiry
      </Text>

      <View style={styles.column}>
        <Text style={styles.TextTitle}>Enter Your Notice</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setInquiry(text)}
          value={inquiry}
          style={styles.TextInput}
        />
      </View>
      <TouchableOpacity onPress={senInquiry}>
        <Text style={styles.inquiryBtn}> Send </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  TextTitle: {
    padding: 0,
    marginLeft: 10,
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  TextInput: {
    width: 300,
    height: 400,
    borderWidth: 1,
    borderBottomColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
  },
  inquiryBtn: {
    width: "30%",
    marginHorizontal: 150,
    backgroundColor: "#ffa500",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffa500",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
});
