import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";
import { toast } from "react-toastify"; // added

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
      const res = await instance.get("/cart/");
      console.log(res.data);
      setCartItems(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart"); // feedback
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, getCart, loading, setLoading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;
