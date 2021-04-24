import { createContext, useState, useEffect } from 'react';

export const Context = createContext();



const Cart = ({ children }) => {

  const getInitialCart = () => {
    return JSON.parse(localStorage.getItem('cart'));
  };

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

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

    let newTotal = 0;
    cart.forEach(item => newTotal += (item.price * item.qty) );
    setTotal(newTotal);

  }, [cart]);



  const openCart = () => {
    setIsOpen(true);
  };


  const closeCart = () => {
    setIsOpen(false);
  };


  const clearCart = () => {
    // localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('cart');
    setCart([]);
    
  };



  const addItemToCart = (product, qty=1) => {
    const findItem = cart.find(item => item.id === product.id);
    
    if (findItem) {
      findItem.qty = findItem.qty + qty;

      setCart([
        ...cart
      ])
    } else {
      setCart([...cart, 
               {...product, qty}
      ]);
    };
  };


  const removeItemFromCart = (id) => {
    const newCart = cart.filter(cartItem => cartItem.id !== id);
    setCart(newCart);
  };


  const exposed =  {
    cart,
    addItemToCart,
    removeItemFromCart,
    openCart,
    closeCart,
    clearCart,
    isOpen,
    total
  }

  // const exposed = {
  //   test: "jon"
  // }

  return (
    <Context.Provider value={exposed}>
      { children }
    </Context.Provider>
  )
}



export default Cart
