import { useContext } from 'react';
import { Context } from '../context/Cart';

import fs from 'fs'; 
import matter from 'gray-matter';
import Link from 'next/link';
import styled from 'styled-components';
import UnstyledLink from '../components/styled/UnstyledLink';
import useCart from '../hooks/useCart';



const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  min-height: 200px;  // make sure that all the cards/grids are of same height
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02)
  }
`;

const ProductsContainer = styled.div`
  /* background: green; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.8rem;
  margin: 0.5rem 0;
`;

const Price = styled.div`
  position: absolute;  // this will take this (price) out of the natural flow of the document
  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: 2rem;
`;


const renderProduct = (product, addItemToCart) => {

  const handleClick = (e) => {
    e.stopPropagation();  // will stop the event bubbling up its parents
    // addItemToCart(product.id)
    addItemToCart(product)
  };

  return (
    // <Container key={product.name}>
    //   <Link href={product.slug}>
    //     <UnstyledLink>
    //       <h1>{product.name}</h1>
    //       <p>{product.description}</p>
    //       <button onClick={handleClick}>Add to cart</button>
    //       <Price>${product.price / 100}</Price>
    //     </UnstyledLink>
    //   </Link>
    // </Container>

    <Link href={product.slug} key={product.name}>
      <UnstyledLink>
        <Container >
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <button onClick={handleClick}>Add to cart</button>
          <Price>${product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
    
    )
  };

  

const HomePage = (props) => {

  // const context = useContext(Context);
  // const { test } = useContext(Context);
  // console.log(test)

  // console.log(props);
  const { cart, addItemToCart, removeItemFromCart } = useCart();  // subscribe to useCart hoot. If we make any changes say using "setCart", then it will update here
  console.log(cart)

  return (
    <ProductsContainer>
      {
        props.products.map(product => renderProduct(product, addItemToCart))
      }
    </ProductsContainer>
  )
};


/*
const HomePage = (props) => {
  return (
    <ProductsContainer>
      {
        props.products.map(product => {
          return (
            <Container key={product.name}>
              <Link href={product.slug}>
                <a><h1>{product.name}</h1></a>
              </Link>
              <p>{product.description}</p>
              <p>${product.price / 100}</p>
            </Container>
            )
          };)
      }
    </ProductsContainer>
  )
};
*/


export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  // console.log(filenames)

  const products = filenames.map(filename => {

    // (1) read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();  // turn everything to a (big) string
    // console.log(fileContent);

    // (2) pull out frontmatter => name
    // npm install react-markdown - this has a function which allows to pull the data between the 3 dashes
    // and turn them into separate variables. In our case - name, description, and price
    // we also get the content
    const { data, content } = matter(fileContent);
    // console.log(data)
    
    // use the filename "basketball-hoop.md" and change it to "basketball-hoop"
    // const slug = filename.replace('.md', '');
    const slug = `/products/${filename.replace('.md', '')}`;
    const product = {
      ...data,
      slug
    };
    // console.log(product)

    // (3) return name, slug
    // domain.com/products/basketball-hoop. We cannot have space between "basketball" and "hoop". So, we need to add a "-"
    // in between and that's what we call a slug
    
    // return data;
    return product;
  });

  // console.log(products);
  

  return {
    props: {
      products
    }
  }
}

export default HomePage