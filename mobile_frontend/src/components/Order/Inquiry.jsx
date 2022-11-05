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
import { Button, Icon } from "@rneui/themed";

export default function Inquiry({ navigation, route }) {
  const id = route.params.id;
  const { userId } = useContext(AuthContext);
  const [inquiry, setInquiry] = useState("");

  async function sendInquiry() {
    try {
      const inquiryObjet = {
        Order: id,
        Inquiry: inquiry,
        SiteManager: userId,
      };

      await axios
        .post(`http://192.168.1.10:8000/inquiry/add`, inquiryObjet)
        .then((res) => {
          if (res.status === 201) {
            alert(res.data.message);
            navigation.navigate("ViewSingleOrder", {
              id: id,
            });
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <View>
      <View style={styles.row}>
        <Button
          buttonStyle={{
            marginTop: 10,
            marginRight: 10,
            width: "50%",
            backgroundColor: "#f2f2f2",
          }}
          icon={<Icon name="chevron-left" color="black" />}
          onPress={() =>
            navigation.navigate("ViewSingleOrder", {
              id: id,
            })
          }
        />
        <Text
          style={{
            color: "black",
            marginTop: 10,
            marginLeft: 0,
            marginRight: 140,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Inquiry
        </Text>

        <Text style={styles.TextTitle}>Enter Your Inquiry</Text>
        <TextInput
          multiline={true}
          onChangeText={(text) => setInquiry(text)}
          value={inquiry}
          style={styles.TextInput}
          editable={true}
          autoFocus={true}
        />

        <TouchableOpacity onPress={sendInquiry}>
          <Text style={styles.inquiryBtn}> Send </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TextTitle: {
    padding: 0,
    marginLeft: 10,
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
    justifyContent: "center",

    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
