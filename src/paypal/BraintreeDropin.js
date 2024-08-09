import React, { useEffect, useState } from 'react';
import dropin from 'braintree-web-drop-in';
import axios from 'axios';

const BraintreeDropin = ({ onPaymentMethodReceived }) => {
  const [dropinInstance, setDropinInstance] = useState(null);

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await axios.get('http://localhost:8080/client-token');
        console.log("response", response);

        // Adjusting based on possible response structure
        const clientToken = response.data.token?.clientToken || response.data.clientToken;

        dropin.create({
          authorization: clientToken,
          container: '#dropin-container',
          paypal: {
            flow: 'vault',
          },
          paypalCredit: true,  // Enable PayPal Credit
          venmo: true,  // Enable Venmo
          card: {
            cardholderName: true, // Collect cardholder name
          }
        }, (err, instance) => {
          if (err) {
            console.error(err);
            return;
          }
          setDropinInstance(instance);
        });
      } catch (error) {
        console.error('Error fetching client token:', error);
      }
    };

    fetchClientToken();

    // Clean up on component unmount
    return () => {
      if (dropinInstance) {
        dropinInstance.teardown();
      }
    };
  }, []); // Remove dropinInstance from dependency array

  const handlePaymentMethod = () => {
    if (dropinInstance) {
      dropinInstance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }
        onPaymentMethodReceived(payload.nonce);
      });
    }
  };

  return (
    <>
      <div id="dropin-container"></div>
      <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={handlePaymentMethod}>Pay</button>
    </>
  );
};

export default BraintreeDropin;
