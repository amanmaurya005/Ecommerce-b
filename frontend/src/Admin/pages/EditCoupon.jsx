import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";

export default function EditCoupon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({});

  if(!id){
    alert("no coupon id found")
  }

  async function getCoupon() {
    const res = await instance.get(`/coupon`);
    const found = res.data.find((c) => c._id === id);
    if (found) setCoupon(found);
  }

  async function updateCoupon(e) {
    e.preventDefault();
    await instance.put(`/coupon/${id}`, coupon);
    alert("Coupon updated");
    navigate("/admin/coupons");
  }

  useEffect(() => {
    getCoupon();
  }, []);

  return (
    <form onSubmit={updateCoupon} className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Edit Coupon</h2>

      <input
        name="discountValue"
        value={coupon.discountValue}
        onChange={(e) =>
          setCoupon({ ...coupon, discountValue: e.target.value })
        }
      />


      <button className="bg-indigo-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}
