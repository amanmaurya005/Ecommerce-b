import { useState } from "react";
import { toast } from "react-toastify";
import instance from "../../axiosConfig";
import { useEffect } from "react";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    slug: "",
    category_id: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    image: null,
  });
   const [categories, setCategories] = useState([]);

    // ================= FETCH CATEGORIES =================
  async function fetchCategories() {
    try {
      const res = await instance.get("/category");
      setCategories(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Fetch Category Error:", error);
      toast.error("Failed to load categories");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setData({ ...data, image: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  function createSlug(e) {
    const nameValue = e.target.value;
    if (!nameValue) return;

    const slug = nameValue
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setData({ ...data, slug });
    document.querySelector("#slug").focus();
  }

  async function checkSlug(slug) {
    try {
      await instance.get(
        `/product/checkSlug/${slug}`,
        { withCredentials: true }
      );
    } catch (error) {
      if (error.message === "Slug already exists. Choose different") {
        toast.error("Slug already exists. Choose different");
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const product = new FormData();
    Object.keys(data).forEach((key) => product.append(key, data[key]));

    try {
      await instance.post(
        "/product",
        product,
        { withCredentials: true }
      );
      console.log(data)

      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }

    setData({
      name: "",
      slug: "",
      category_id: "",
      description: "",
      originalPrice: "",
      discountedPrice: "",
      image: null,
    });
  }

  

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        
        {/* Header */}
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Add a New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleChange}
              onBlur={createSlug}
              className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              value={data.slug}
              readOnly
              onChange={(e) =>
                setData({ ...data, slug: e.target.value })
              }
              onBlur={(e) => checkSlug(e.target.value)}
              className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-2 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Category
            </label>
               <select
              name="category_id"
              value={data.category_id}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-500 bg-white"
            >
              <option value="">-- Select Category --</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={data.description}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Original Price
              </label>
              <input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Discounted Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                value={data.discountedPrice}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-600 file:px-4 file:py-2 file:text-white hover:file:bg-gray-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-600 py-3 font-medium text-white hover:bg-gray-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
