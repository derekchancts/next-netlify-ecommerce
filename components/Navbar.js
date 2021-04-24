import Link from "next/link";
import styled from 'styled-components';
import UnstyledLink from './styled/UnstyledLink';
import { FiShoppingCart } from "react-icons/fi";
import useCart from '../hooks/useCart';

// const UnstyledLink = styled.a`
//   text-decoration: none;
//   color: inherit;

//   &:hover {
//     cursor: pointer;
//   }
// `;

const Nav = styled.nav`
  background: white;
  padding: 2rem 0;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
`;

const ShoppingCart = styled(FiShoppingCart)`
  margin-right: 1rem;
  cursor: pointer;
`;



const Navbar = () => {
  const { openCart } = useCart()

const handleClick = () => {
  // console.log('open cart')
  openCart();
};

  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <UnstyledLink>Home</UnstyledLink>
        </Link>
        {/* <FiShoppingCart /> */}
        <ShoppingCart onClick={handleClick} />
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
