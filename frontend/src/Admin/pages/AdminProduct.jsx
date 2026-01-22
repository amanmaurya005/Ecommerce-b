import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import EditProductModal from "./EditProductModal"; // ✅ NEW
import { Link } from "react-router-dom";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ NEW
  const BASEURL = import.meta.env.VITE_BASEURL;

  async function fetchProducts() {
    try {
      const response = await instance.get("/product", { withCredentials: true });
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  }

  async function deleteProduct(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      await instance.delete(`/product/${id}`, { withCredentials: true });
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Control Center
          </h1>
          <p className="text-sm text-gray-500">
            Fast access to all products & operations
          </p>
        </div>



        <Link
          to="/admin/add-products"
          className="bg-gray-600 text-white w-30 py-3.5 px-2.5 rounded-lg font-medium hover:bg-gray-700 transition"
        >
          Add Products
        </Link>


      </div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-xl border bg-white px-6 py-4"
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              <div className="h-20 w-20">
                <img
                  src={item.image?.startsWith("http")
                    ? item.image
                    : `${BASEURL}/${item.image}`}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

              <span className="text-sm text-gray-400 line-through">
                ₹{item.originalPrice}
              </span>

              <span className="font-semibold text-green-600">
                ₹{item.discountedPrice}
              </span>


              <button
                onClick={() => setSelectedProduct(item)}
                className="rounded-lg bg-blue-500 px-4 py-1.5 text-sm text-white hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(item._id)}
                className="rounded-lg bg-red-500 px-4 py-1.5 text-sm text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={fetchProducts}
        />
      )}
    </div>
  );
}

export default AdminProduct;
