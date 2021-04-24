import Navbar from '../components/Navbar';
import CartProvider from '../context/Cart';

import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import Cart from '../components/Cart';



const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap');
  // background: pink;
  background: linear-gradient(to right, #fc00ff, #00dbde);
  // background: linear-gradient(to right, #ffb75e, #ed8f03); 
  font-family: 'Padauk', sans-serif;
  color: #444;
  /* position: relative; */
  min-height: 100vh;  // this is important as we might not have enough content on the page
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  // background: blue;
  margin: 0 auto;
  padding: 0.8rem 0;
`;

const CartContainer = styled.div`
  /* position: absolute; */
  right: 0;
  top: 0;
`;


function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Container>
        <Normalize />
        <Navbar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <CartContainer>
          <Cart />
        </CartContainer>
      </Container>
    </CartProvider>
  )
}

export default MyApp
