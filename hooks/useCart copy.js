import { useState, useEffect } from 'react';


const useCart = () => {

  const getInitialCart = () => {
    return JSON.parse(localStorage.getItem('cart'));
  };

  const [cart, setCart] = useState([]);


  // when this page gets generated, it happens on the server side. So, localstorage is not defined yet
  // need tp use useEffect here when page mounts to fetch the data from localstorage
  useEffect(() => {
    const initialCart = getInitialCart();

    if(initialCart) {
      setCart(initialCart);
    } else {
      setCart([]);
    };
  }, [])

  // localStorage.setItem('cart', cart);  // store to local storage
  // const cartItems = localStorage.getItem('cart');   // get data from localstorage



  useEffect(() => {
    async function saveItem () {
      await localStorage.setItem('cart', JSON.stringify(cart));
    };
    saveItem();
  }, [cart])



  const addItemToCart = (id, qty=1) => {
    const findItem = cart.find(item => item.id === id);
    
    if (findItem) {
      findItem.qty = findItem.qty + qty;

      setCart([
        ...cart
      ])
    } else {
      setCart([...cart, { id, qty }]);
    };
  };


  const removeItemFromCart = (id) => {
    const newCart = cart.filter(cartItem => cartItem.id !== id);
    setCart(newCart);
  };

  // const removeItemFromCart = (id) => {
  //   const newCart = cart.filter(cartItem => {
  //     return cartItem.id !== id
  //   })
  // };

  return {
    cart,
    addItemToCart,
    removeItemFromCart
  }
}

export default useCart
