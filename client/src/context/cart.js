import { createContext, useContext,useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 
  useEffect(()=>{
let existingCartItem=localStorage.getItem('cart')
if(existingCartItem) setCart(JSON.parse(existingCartItem))
},[])// Initialize as an empty array

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
