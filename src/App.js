import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  PaymentRequestButtonElement,
  useStripe,
} from '@stripe/react-stripe-js';


function App() {

  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1350,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
        shippingOptions: [
          {
            id: 'standard-global',
            label: 'Global shipping',
            detail: 'Arrives in 5 to 7 days',
            amount: 350,
          },
        ],
      });

      // Check the availability of the Payment Request API first.
            pr.canMakePayment().then((result) => {
                 if (result) {
                     pr.on('paymentmethod', handlePaymentMethodReceived);
                    setPaymentRequest(pr);
                  }
              });

    }
  }, [stripe]);

  if (paymentRequest) {
       return <PaymentRequestButtonElement options={{ paymentRequest }} />;
     }

  const handlePaymentMethodReceived = async (event) => {}

  // Use a traditional checkout form.
  return 'Insert your form or button component here.';
  
}

export default App;
