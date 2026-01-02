import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import instance from "../../axiosConfig";
import CouponList from "./CouponList";
import { useCoupon } from "../context/CouponContext";

export default function CreateCoupon() {
  const [coupon, setCoupon] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    expiryDate: "",
    usageLimit: "",
    status: "active",
  });

  const {fetchCoupons}=useCoupon();

  useEffect(()=>{
    fetchCoupons()
  },[])

  function handleChange(e) {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await instance.post("/coupon", coupon, { withCredentials: true });

    // THIS IS THE KEY
    const createdId = res.data._id;

    // navigate to edit page
    navigate(`/admin/editCoupon/${createdId}`);


    if (!coupon.code || !coupon.discountValue || !coupon.expiryDate) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await instance.post(
        "/coupon",
        coupon,
        { withCredentials: true }
      );
      alert("Coupon created successfully");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to create coupon");
    }
  }

  return (
    <>
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className=" mx-auto bg-white rounded-xl shadow-md p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Coupon
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coupon Code *
            </label>
            <input
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleChange}
              placeholder="SAVE20"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <select
              name="discountType"
              value={coupon.discountType}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Flat Amount (₹)</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Value *
            </label>
            <input
              type="number"
              name="discountValue"
              value={coupon.discountValue}
              onChange={handleChange}
              placeholder="20"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Minimum Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Order Amount
            </label>
            <input
              type="number"
              name="minOrderAmount"
              value={coupon.minOrderAmount}
              onChange={handleChange}
              placeholder="500"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date *
            </label>
            <input
              type="date"
              name="expiryDate"
              value={coupon.expiryDate}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Usage Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usage Limit
            </label>
            <input
              type="number"
              name="usageLimit"
              value={coupon.usageLimit}
              onChange={handleChange}
              placeholder="100"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={coupon.status}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Create Coupon
          </button>

        </form>
      </div>
    </section>

    <CouponList />
    </>
  );
}
