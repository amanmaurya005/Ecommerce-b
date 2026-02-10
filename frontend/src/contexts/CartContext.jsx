import { createContext, useContext, useEffect, useRef, useState } from "react";
import instance from "../axiosConfig";
import socket from "../socket";
import { toast } from "react-toastify";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFirstLoad = useRef(true);

  // 🔹 Fetch cart normally (first time)
  useEffect(() => {
    getCart();
  }, []);

  // 🔹 SOCKET LISTENER
  useEffect(() => {
    const userId = localStorage.getItem("userId"); 
    // ⚠️ userId login ke time localStorage me set hona chahiye

    if (userId) {
      socket.emit("join", userId);
    }

    socket.on("cart:update", (updatedCart) => {
      setCartItems(updatedCart);
    });

    return () => {
      socket.off("cart:update");
    };
  }, []);

  async function getCart(showToast = false) {
    try {
      const res = await instance.get("/cart/");
      setCartItems(res.data);
    } catch (error) {
      console.error(error);
      if (showToast) {
        toast.error("Failed to load cart");
      }
    } finally {
      setLoading(false);
      isFirstLoad.current = false;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;















// import { createContext, useContext, useEffect, useRef, useState } from "react";
// import instance from "../axiosConfig";
// import { toast } from "react-toastify";
// import socket from "../socket";

// const CartContext = createContext();

// function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const isFirstLoad = useRef(true); // important

//   useEffect(() => {
//     getCart();
//   }, []);

//   async function getCart(showToast = false) {
//     try {
//       const res = await instance.get("/cart/");
//       setCartItems(res.data);
//     } catch (error) {
//       console.error(error);

//       //  initial page load par toast nahi
//       if (showToast) {
//         toast.error("Failed to load cart");
//       }
//     } finally {
//       setLoading(false);
//       isFirstLoad.current = false;
//     }
//   }

//   return (
//     <CartContext.Provider
//       value={{ cartItems, setCartItems, getCart, loading }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }

// export default CartProvider;





















// // import { createContext, useContext, useEffect, useState } from "react";
// // import instance from "../axiosConfig";
// // import { toast } from "react-toastify"; // added

// // const CartContext = createContext();

// // function CartProvider({ children }) {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     getCart();
// //   }, []);

// //   // Fetch cart from backend
// //   async function getCart() {
// //     try {
// //       const res = await instance.get("/cart/");
// //       console.log(res.data);
// //       setCartItems(res.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to load cart"); // feedback
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <CartContext.Provider
// //       value={{ cartItems, setCartItems, getCart, loading, setLoading }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // }

// // export function useCart() {
// //   return useContext(CartContext);
// // }

// // export default CartProvider;
