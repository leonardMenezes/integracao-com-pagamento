import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import stripeConfig from "../config/stripe"
const stripePromise = loadStripe(stripeConfig.publicKey);

interface Props {
    priceId: string
}

const CheckoutButon: React.FC<Props> = ({ priceId })=> {
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000',
    });
    if(error){
        console.log(error)
    }
  };
  return (
    <button role="link" onClick={handleClick}>
      Comprar
    </button>
  );
}

export default CheckoutButon