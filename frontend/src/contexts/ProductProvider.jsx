import { createContext, useContext, useState } from "react"
import instance from "../axiosConfig";
import { toast } from "react-toastify";

const ProductContext=createContext();

export default function ProductProvider({children}) {
      const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(false);
      
    
    async function getProducts() {
    setLoading(true);
    try {
      const response = await instance.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
    setLoading(false);
  }

  return (
    <>
    <ProductContext.Provider 
    value={{getProducts,products,setProducts,setLoading,loading}}
    >
        {children}
    </ProductContext.Provider>
    
    </>
  )
}

export function useProduct(){
return useContext(ProductContext);
} 
