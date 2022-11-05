import { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  ScrollView,
  Button
} from "react-native";
import { Text, Card } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const SupplierList = (navigation) => {
  const [users, setUsers] = useState([]);
  // const navigation = useNavigation(); 
  // function viewProduct(data) {
  //   navigate("/products/" + data._id, { state: data });
  // }
  
    const getall = async () => {
      try {
        await axios.get(
          `http://192.168.135.248:8000/user/?filter=Supplier`
        ).then((res) => {
          if (res.status === 200) {
            console.log(res?.data?.users);
            setUsers(res?.data?.users);
          }
        });
      
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    useEffect(() => {
    getall();
  }, []);

  return (
<View>
  <ScrollView>
    <View>
      {users?.map((current, index) => {
        return (
          <Card key={index}>
           <Text>{current.id}</Text>
           <Text>{current.name}</Text>
           <Text>{current.email}</Text>
           <Button
                    // icon={
                    //   <Icon
                    //     name="code"
                    //     color="#ffffff"
                    //     iconStyle={{ marginRight: 10 }}
                    //   />
                    // }
                    title='View'
                    onPress={() =>
                      navigation.navigate("ViewProduct", {
                        id: current._id,
                      })
                    }
                    // buttonStyle={{
                    //   borderRadius: 0,
                    //   marginLeft: 0,
                    //   marginRight: 0,
                    //   marginBottom: 0,
                    //   width: "50%",
                    // }}
                  />
          </Card>
        )
      })}
    </View>
    </ScrollView>
    </View>
  )
};

export default SupplierList;
