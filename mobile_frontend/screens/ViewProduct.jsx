import React from 'react';
import { ScrollView } from 'react-native';
import { PricingCard, lightColors } from '@rneui/themed';


const ViewProduct = () => {
return (
  <>
    <ScrollView>
      <PricingCard
        color={lightColors.primary}
        title="Product Name"
        Qty="Qty"
        price="$0"
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{ title: ' Add to cart', icon: 'flight-takeoff' }}
      />
    </ScrollView>
  </>
);
};

export default ViewProduct;