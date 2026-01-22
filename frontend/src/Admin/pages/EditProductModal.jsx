import React, { useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";

function EditProductModal({ product, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    originalPrice: product.originalPrice,
    discountedPrice: product.discountedPrice,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      await instance.put(
        `/product/${product._id}`,
        formData,
        { withCredentials: true }
      );

      toast.success("Product updated");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error("Update failed");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Edit Product</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full rounded-lg border px-4 py-2"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            placeholder="Original Price"
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleChange}
            placeholder="Discounted Price"
            className="w-full rounded-lg border px-4 py-2"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
