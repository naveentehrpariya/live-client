import React from 'react';
import BraintreeDropin from './BraintreeDropin';
import axios from 'axios';

const App = () => {
  const handlePaymentMethodReceived = async (paymentMethodNonce) => {
    try {
      const response = await axios.post('http://localhost:8080/api/subscribe-plan', {
            paymentMethodNonce,
            planId: '4nnt'
      });

      const result = await response.json();
      if (result.success) {
        console.log('Subscription successful:', result.subscription);
      } else {
        console.error('Subscription failed:', result.error);
      }
    } catch (error) {
      console.error('Error processing subscription:', error);
    }
  };

  return (
    <div>
      <h1>Subscribe to Our Plan</h1>
      <BraintreeDropin onPaymentMethodReceived={handlePaymentMethodReceived} />
    </div>
  );
};

export default App;
