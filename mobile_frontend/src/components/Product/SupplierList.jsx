
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { CardList } from 'react-native-card-list';
import { deldata } from "./context/ContextProvider";
import { Text, Card, Button, Icon } from '@rneui/themed';
// import { SearchBar } from '@rneui/themed';
import SearchBar from "react-native-dynamic-search-bar";

const SupplierList = () => {

  const [getproductdata, setProductdata] = useState([]);
  


  const { setDLTdata } = useContext(deldata);
  const [searchTerm, setSearchTerm] = useState("");

  const getdata = async () => {

    const res = await fetch(`http://192.168.1.2:8000/product/viewp`, {
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
    <View style={{ marginTop: 10 }}>
      <Text style={{fontSize:20, marginTop: 20}}>Home</Text>
    </View>
    <View style={{ margin: 10, backgroundColor: 'white' }}>
    <SearchBar 
    type="search"
    placeholder="Search Suppliers"
     onChange={(product) => {
                        setSearchTerm(product.target.value);
                      }}/>
                      </View>
<ScrollView>
      <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80 }}>
      {getproductdata.filter((element) => {
                        if (searchTerm === "") {
                          return element;
                        } else if (
                          element.user.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )||
                          element.Qty.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return element;
                        } else {
                          return false;
                        }
                      }).map((element, id) => {
                    return (
        <Card>
          <Card.Title> name{element.user.name}</Card.Title>
          <Card.Title> {element.Qty} Items</Card.Title>
          {/* <Card.Divider /> */}
          
          {/* <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text> */}
          <Button title="View"></Button>
          
        </Card>
                    )})}
                    </ScrollView>
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