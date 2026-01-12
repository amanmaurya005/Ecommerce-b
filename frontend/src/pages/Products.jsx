import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import instance from "../axiosConfig.js";
import { useCart } from "../contexts/CartContext.jsx";
import { useProduct } from "../contexts/ProductProvider.jsx";

const Products = () => {
  const { getProducts, products, loading } = useProduct();
  const { getCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getCart();
  }, []);

  // fetch categories
  async function getCategories() {
    try {
      const res = await instance.get("/category");
      setCategories(res.data);
    } catch (error) {
      console.log("Category fetch error", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  // 🔥 FINAL FIXED FILTER LOGIC
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        // if category is populated object
        if (product.category?._id) {
          return product.category._id === selectedCategory;
        }

        // if category is just ObjectId string
        if (typeof product.category === "string") {
          return product.category === selectedCategory;
        }

        return false;
      });

      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <section className="bg-gray-50 px-4 sm:px-8 lg:px-14 py-10">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Our Products
        </h2>
      </div>

      {/* 🔹 Category Filter */}
      <div className="flex justify-end mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="all">All Categories</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-24">
          <span className="text-gray-500 text-lg animate-pulse">
            Loading products...
          </span>
        </div>
      )}

      {/* Products */}
      {!loading && filteredProducts.length > 0 && (
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                slug={product.slug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 text-base">
            No products found
          </p>
        </div>
      )}
    </section>
  );
};

export default Products;






















// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard.jsx";
// import instance from "../axiosConfig.js";
// import { useCart } from "../contexts/CartContext.jsx";
// import { toast } from "react-toastify"; // ✅ added
// import { useProduct } from "../contexts/ProductProvider.jsx";

// const Products = () => {
//   const {getProducts,products,loading}=useProduct();
//   const { getCart } = useCart();
  
//     useEffect(() => {
//       getProducts();
//     }, []);

//   useEffect(() => {
//     getCart();
//   }, []);

  

//   return (
//     <section className="bg-gray-50 px-4 sm:px-8 lg:px-14 py-10">
//       {/* Heading */}
//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
//           Our Products
//         </h2>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div className="flex justify-center items-center py-24">
//           <span className="text-gray-500 text-lg animate-pulse">
//             Loading products...
//           </span>
//         </div>
//       )}

//       {/* Products Grid */}
//       {!loading && products.length > 0 && (
//         <div className="mx-auto max-w-7xl">
//           <div className="flex flex-wrap items-center gap-4">
//             {products.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 slug={product.slug}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && products.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-20">
//           <p className="text-gray-500 text-base">
//             No products found
//           </p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Products;

