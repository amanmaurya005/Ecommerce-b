import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCoupon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({});

  async function getCoupon() {
    const res = await axios.get(`http://localhost:3000/coupon`);
    setCoupon(res.data.find((c) => c._id === id));
  }

  async function updateCoupon(e) {
    e.preventDefault();
    await axios.put(`http://localhost:3000/coupon/${id}`, coupon);
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
        className="border p-2 w-full mb-3"
        value={coupon.discountValue || ""}
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
