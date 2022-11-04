import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../context/UserContext";
import axios from "axios";

export default function AddNote({ navigation, route }) {
  const object = route.params.orderObject;
  const { userId } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  async function sendOrder() {
    try {
      const data = {
        Comment: comment,
        Approval: "Pending",
      };
      const newObject = Object.assign(object, data);

      if (comment === "" || comment === null) {
        alert("Please Enter a Note");
      } else {
        await axios
          .post(`http://192.168.1.5:8000/order/add`, newObject)
          .then((res) => {
            if (res.status === 201) {
              alert(res.data.message);
              navigation.navigate("Order", {});
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <View>
      <View style={styles.row}>
        <Text
          style={{
            color: "black",
            marginTop: 10,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Request Approval
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.TextTitle}>Enter Your Note</Text>
      </View>
      <TextInput
        multiline={true}
        onChangeText={(text) => setComment(text)}
        value={comment}
        style={styles.TextInput}
        editable={true}
        autoFocus={true}
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={sendOrder}>
          <Text style={styles.inquiryBtn}> Send </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TextTitle: {
    padding: 0,
    textAlign: "center",
    fontSize: 20,
    marginTop: 50,
  },
  TextInput: {
    width: "80%",
    height: 100,
    borderWidth: 1,
    margin: 40,
    padding: 5,
  },
  inquiryBtn: {
    width: 300,
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
