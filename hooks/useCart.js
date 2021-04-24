import { useContext} from 'react';
import { Context } from '../context/Cart';


// const useCart = () => {
//   const context = useContext(Context);
// }

// the above can be written as below
// it will call "useContext" and pass in the "Context", 
// and we get the implicit return because we aew using the arrow function
const useCart = () => useContext(Context);


export default useCart
