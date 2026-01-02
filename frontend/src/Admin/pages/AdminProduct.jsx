import React, { useEffect, useState } from "react";
// import "../App.css";
import { Link } from "react-router-dom";
import instance from "../../axiosConfig";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const BASEURL = import.meta.env.VITE_BASEURL;

  async function fetchProducts() {
    try {
      const response = await instance.get("/product", { withCredentials: true });
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Failed to load products");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

return (
    <div className="min-h-screen w-full bg-gray-50 px-6 py-8 ">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Product Control Center
        </h1>
        <p className="text-sm text-gray-500">
          Fast access to all products & operations
        </p>
      </div>

      {/* Product List */}
      <div className="space-y-4 my-2">
        {products.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-xl border border-gray-800 bg-white px-6 py-4"
          >
            {/* Left: Image + Details */}
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 flex-shrink-0">
                <img
                  src={`${BASEURL}/${item.image}`}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
              
            </div>

            {/* Right: Price */}
            <div className="text-lg font-semibold text-green-600">
              ₹{item.discountedPrice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default AdminProduct;
