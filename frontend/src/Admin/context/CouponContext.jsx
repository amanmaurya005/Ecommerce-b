import { createContext, useContext, useEffect, useState } from "react";
import instance from "../../axiosConfig";

//  Create Context
const CouponContext = createContext();

//  Provider
export function CouponProvider({ children }) {

      const [coupons, setCoupons] = useState([]);
    

     async function fetchCoupons() {
        const res = await instance.get("/coupon");
        setCoupons(res.data);
      }
    
      async function deleteCoupon(id) {
        if (!window.confirm("Delete coupon?")) return;
        await instance.delete(`/coupon/${id}`);
        fetchCoupons();
      }

        useEffect(() => {
          fetchCoupons();
        }, []);


  return (
    <CouponContext.Provider
      value={{ fetchCoupons,deleteCoupon,coupons }}>
      {children}
    </CouponContext.Provider>
  );
}

//  Custom Hook
export function useCoupon() {
  return useContext(CouponContext);
}
