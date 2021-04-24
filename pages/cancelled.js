import { useEffect } from 'react';
import useCart from '../hooks/useCart';
import { Page, Title, Item, UL, Total, Button } from '../components/styled/Page';


const Cancelled = () => {
  return (
    <Page>
      <h2>Payment Cancelled</h2>
      <p>You have not been charged!</p>
    </Page>
  )
}

export default Cancelled
