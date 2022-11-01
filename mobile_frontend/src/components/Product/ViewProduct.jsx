import React from 'react';
import { ScrollView } from 'react-native';
import { PricingCard, lightColors } from '@rneui/themed';


const ViewProduct = () => {

  const [getproductdata, setProductdata] = useState([]);

  const { id } = useParams("");
  

  const getdata = async () => {
    const res = await fetch(`http://q2-8qm.anonymous.mobile-frontend.exp.direct:80/product/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();


    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setProductdata(data)
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

return (
  <>
    <ScrollView>
      <PricingCard
        color={lightColors.primary}
        title={getproductdata.ProductName}
        Qty={getproductdata.Qty}
        price={getproductdata.Price}
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{ title: ' Add to cart', icon: 'flight-takeoff' }}
      />
    </ScrollView>
  </>
);
};

export default ViewProduct;