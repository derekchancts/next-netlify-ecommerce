import styled from 'styled-components';
import { FiX } from "react-icons/fi";
import useCart from '../hooks/useCart';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;  // 100% of the viewport
  background: white;
  width: 300px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  // transform: translateX(100%);  // if we move this 100% on the x-axis, our cart will be gone
  // transform: translateX(0);  // wil see wthe shole cart
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  /* transition: 0.3s; */
  transition: transform 0.2s ease-in-out;
`;

const X = styled(FiX)`
  font-size: 3rem;
  cursor: pointer;
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
`;

const Item = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.25rem;
`;

const UL = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.5rem
`;

const Button = styled.button`
  /* background: transparent; */
  /* background-color: #7e6eee; */
  background: linear-gradient(to right, #fc00ff, #00dbde);
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem;
  color: white;
  font-size: 2rem;
  /* font-size: 200%; */
  margin-bottom: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;



const Cart = () => {
  const { cart, closeCart, isOpen, total } = useCart()
  // console.log(cart)

  const router = useRouter();


  const handleClick = () => {
    closeCart();
  };


  const navigateToCheckout = () => {
    closeCart();
    router.push('/checkout')
  };


  /* let total = 0;
  cart.forEach(item => total += (item.price * item.qty)); */
  /* cart.forEach(item => {
    return total = total + (item.price * item.qty);
  }) */


  return (
    <Container isOpen={isOpen}>
      {/* <FiX /> */}
      <XContainer>
        <X onClick={handleClick} />
      </XContainer>
      <Content>
        <Title>Cart</Title>
     
        {
          cart.length <= 0 ? (<p>Cart is empty!</p>) : ( 
            <>
              <UL>
                {cart && cart.map(item => (
                  <Item key={item.id}>
                    <span>{item.qty} x {item.name}</span>
                    <span>${item.price / 100} </span>
                  </Item>
                  
                ))}
              </UL>

              <Total>
                <span>Total</span>
                <span>${total / 100}</span>
              </Total>
              <Button onClick={navigateToCheckout}>Checkout</Button>
            </>
          )
        }
        

      </Content>
    </Container>
  )
}

export default Cart



   /* <Link href="/checkout">
          <Button>Checkout</Button>
        </Link> */