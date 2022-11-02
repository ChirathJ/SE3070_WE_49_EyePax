
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { CardList } from 'react-native-card-list';
import { deldata } from "./context/ContextProvider";
import { Text, Card, Button, Icon } from '@rneui/themed';

const SupplierList = () => {

  const [getproductdata, setProductdata] = useState([]);
  


  const { setDLTdata } = useContext(deldata);
  const [searchTerm, setSearchTerm] = useState("");

  const getdata = async () => {

    const res = await fetch(`http://localhost:8000/product/viewp`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json();


    if (res.status === 422 || !data) {
      console.log("error ");
    }else if(data.user){

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
<ScrollView>
      <View style={styles.container}>
      {getproductdata.map((element, id) => {
                    return (
        <Card>
          <Card.Title>{element.user}</Card.Title>
          <Card.Divider />
          
          {/* <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text> */}
          
        </Card>
                    )})}
      </View>
    </ScrollView>
  </>
  )

}

export default SupplierList;

const styles = StyleSheet.create({
  container: {
     flex: 1
  }

})