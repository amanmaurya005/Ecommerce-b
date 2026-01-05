import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";

export default function EditCoupon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({});

  // Guard
  if (!id) {
    toast.error("No coupon id found");
  }

  async function getCoupon() {
    try {
      const res = await instance.get("/coupon");
      const found = res.data.find((c) => c._id === id);
      if (found) setCoupon(found);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load coupon");
    }
  }

  async function updateCoupon(e) {
    e.preventDefault();
    try {
      await instance.put(`/coupon/${id}`, coupon);
      toast.success("Coupon updated");
      navigate("/admin/createCoupon");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update coupon");
    }
  }

  useEffect(() => {
    getCoupon();
  }, []);

  return (
    <form onSubmit={updateCoupon} className="p-6 max-w-xl bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-6">Edit Coupon</h2>

      {/* Discount Value */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Discount Value
        </label>
        <input
          type="number"
          value={coupon.discountValue || ""}
          onChange={(e) =>
            setCoupon({ ...coupon, discountValue: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Expiry Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Expiry Date
        </label>
        <input
          type="date"
          value={coupon.expiryDate?.split("T")[0] || ""}
          onChange={(e) =>
            setCoupon({ ...coupon, expiryDate: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Status
        </label>
        <select
          value={coupon.status || "active"}
          onChange={(e) =>
            setCoupon({ ...coupon, status: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Update Coupon
      </button>
    </form>
  );
}
