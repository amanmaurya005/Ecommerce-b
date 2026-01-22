import React, { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../axiosConfig";
import { Link } from "react-router-dom";
import { useCoupon } from "../context/CouponContext";

export default function CouponList() {


  const { fetchCoupons, deleteCoupon, coupons } = useCoupon()

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Coupons</h2>


        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Expiry</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr key={c._id}>
                <td className="border p-2">{c.code}</td>
                <td className="border p-2">
                  {c.discountType === "percentage"
                    ? `${c.discountValue}%`
                    : `₹${c.discountValue}`}
                </td>
                <td className="border p-2">
                  {new Date(c.expiryDate).toDateString()}
                </td>
                <td className="border p-2">{c.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteCoupon(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <Link to={`/admin/editCoupon/${c._id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
