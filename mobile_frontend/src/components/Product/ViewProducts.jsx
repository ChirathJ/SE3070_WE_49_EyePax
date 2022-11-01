
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { CardList } from 'react-native-card-list';
import { deldata } from "./context/ContextProvider";
import { Text, Card, Button, Icon } from '@rneui/themed';


function ViewProducts() {

   const [getproductdata, setProductdata] = useState([]);
  


  const { setDLTdata } = useContext(deldata);
  const [searchTerm, setSearchTerm] = useState("");

 const getdata = async () => {

    const res = await fetch(`http://q2-8qm.anonymous.mobile-frontend.exp.direct:80/product/viewp`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json();


    
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
       setProductdata(data.getproductdata);
      
      console.log("get data");
      console.log(data.getproductdata);
    }
      
      
    
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
<View style={styles.container}>
    {getproductdata.map((element, id) => {
                    return (
                      <>
                      <Card>
                      <Text>aa</Text>
          <Text>b</Text>
          <Button title="Solid Button" />
          </Card>
                      </>
                    );
                  })}
                  </View>
                  <View style={styles.container}><Text>a</Text></View>
                  <View style={styles.container1}><Text>a</Text></View>
      </>
  );
  
};


export default ViewProducts;

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    justifyContent: 'center',
    margin:"10%",
    backgroundColor: '#F5FCFF',
    float: 'left',
    width: "30%",
  },

  container1: {
    
    
    justifyContent: 'center',
    margin:"10%",
    backgroundColor: '#F5FCFF',
    float: 'right',
    width: "30%",
  }
})

