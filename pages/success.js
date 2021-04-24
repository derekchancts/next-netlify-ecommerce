import { useEffect } from 'react';
import useCart from '../hooks/useCart';
import { Page, Title, Item, UL, Total, Button } from '../components/styled/Page';


const Success = () => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Page>
      <h2>Successfully Successful</h2>
      <p>Thank you for your purchase!</p>
    </Page>
  )
}

export default Success
