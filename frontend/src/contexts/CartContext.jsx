import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
     useEffect(() => {
    getCart();
  }, []);
    // Fetch cart from backend
  async function getCart() {
    try {
      // console.log("first")
      const res = await instance.get("/cart/");
      // console.log("first");
      console.log(res.data);
      setCartItems(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }


  return (
    <CartContext.Provider value={{ cartItems, setCartItems,getCart, loading,setLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;
