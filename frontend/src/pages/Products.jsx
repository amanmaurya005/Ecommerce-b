import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import instance from "../axiosConfig.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);
    const response = await instance.get("/product");
    setProducts(response.data);
    setLoading(false);
  }

  return (
   <section className="bg-gray-50 px-4 sm:px-8 lg:px-14 py-10">
  
  {/* Heading */}
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
      Our Products
    </h2>
  
  </div>

  {/* Loading */}
  {loading && (
    <div className="flex justify-center items-center py-24">
      <span className="text-gray-500 text-lg animate-pulse">
        Loading products...
      </span>
    </div>
  )}

  {/* Products Grid */}
  {!loading && products.length > 0 && (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} slug={product.slug} />
        ))}
      </div>
    </div>
  )}

  {/* Empty State */}
  {!loading && products.length === 0 && (
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
