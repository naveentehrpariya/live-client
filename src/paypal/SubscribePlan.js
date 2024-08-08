import React, { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function SubscribePlan() {
   
   useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=Afg3BgPg1gV0pAGh0FknWM1wdNyMFCc9FQyl3tAGLULSG4kbF4mdSoYQyDDlKzUNqBxz1oosMXhy9938&vault=true&intent=subscription&components=buttons";
      script.addEventListener('load', () => {
          if (window.paypal) {
            window.paypal.Buttons({
               createSubscription: function (data, actions) {
                   return actions.subscription.create({
                       plan_id: 'P-06R60700CU188894HGIG3BRI' // Replace with your actual plan ID
                   });
               },
               onApprove: function (data, actions) {
                   alert('Subscription completed successfully with ID: ' + data.subscriptionID);
               },
               onError: function (err) {
                   console.error('An error occurred during the subscription process:', err);
                   alert('There was an error processing your subscription. Please try again.');
               },
               funding: {
                   allowed: [window.paypal.FUNDING.CARD] // Enable card payments
               }
           }).render('#paypal-button-container');
          }
      });
      document.body.appendChild(script);

      return () => {
          document.body.removeChild(script);
      };
  }, []);

   return (
      <div className='bg-white p-6 w-full'>
         <div id="paypal-button-container"></div>
      </div>
   );
}
