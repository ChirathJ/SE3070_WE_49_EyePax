import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, Pressable, StatusBar, Text, Button } from "react-native";
import { deldata } from "./context/ContextProvider";

const AddProduct = () => {

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
    } else {
      setProductdata(data.getproductdata);
      
    //   console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

//   const deleteproduct = async (id) => {
//     const res2 = await fetch(`http://localhost:8000/product/delete/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const deletedata = await res2.json();
    

//     if (res2.status === 422 || !deletedata) {
//       console.log("error");
//     } else {
//       alert("Deleted Product Details Successfully");
//       console.log("product deleted");
//       setDLTdata(deletedata);
//       getdata();
//     }
//   };

    return(
        
        <>
        <View>
         
         {getproductdata.map((element, id) => {
            return(
                <>
                <Text>Product ID {id + 1}</Text>
                <Text>Product Name {element.ProductName}</Text>
                </>
            )
         })}
        </View>

        

        
        <View style={styles.container}>
            
                
        </View></>

        
    )
}
<Button
  onPress={{}}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })

export default AddProduct;