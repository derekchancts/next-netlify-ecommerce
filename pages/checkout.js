import styled from 'styled-components';
import { Page, Title, Item, UL, Total, Button } from '../components/styled/Page';
import useCart from '../hooks/useCart';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';


// const Title = styled.h2`
//   font-size: 2.5rem;
//   font-weight: 400;
//   border-bottom: 1px solid #efefef;
// `;

const Item1 = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
`;

// const UL = styled.ul`
//   padding: 0;
// `;

// const Total = styled.p`
//   display: flex;
//   justify-content: space-between;
//   font-weight: bold;
//   font-size: 1.5rem
// `;



const Checkout = () => {
  const { cart, total } = useCart();


  const processPayment = async () => {
    const url = '/.netlify/functions/charge-card';

    // const newCart = cart.map(product => ({
    //   id: product.id,
    //   qty: product.qty
    // }));

    const newCart = cart.map(({ id, qty }) => ({
      id,
      qty
    }));


    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    // const { data } = await axios.post(url, { cart });
    const { data } = await axios.post(url, { newCart });
    await stripe.redirectToCheckout({ sessionId: data.id });

  };


  // let total = 0;
  // cart.forEach(item => total += (item.price * item.qty) );
  // cart.forEach(item => {
  //   return total = total + (item.price * item.qty);
  // })


  return (
    <Page>
      <Title>Checkout</Title>
      
    {cart.length > 0 ? (
      <>
        <UL>
          {cart && cart.map(item => (
            <Item1 key={item.id}>
              <span>{item.qty} x {item.name}</span>
              <span>${item.price / 100} </span>
            </Item1>
            
          ))}
        </UL>
        <Total>
          <span>Total</span>
          <span>${total / 100}</span>
        </Total>
        <Button onClick={processPayment}>Process Payment</Button>
      </>
    ) 
    : (<p>You do not have any items in your cart</p>) }

      
    </Page>
  )
}

export default Checkout
