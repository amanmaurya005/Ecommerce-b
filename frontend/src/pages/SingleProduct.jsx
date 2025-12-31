import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";


const BASEURL = import.meta.env.VITE_BASEURL;

const SingleProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  async function getSingleData() {
    try {
      const response = await instance.get("/product/" + slug);
      setProduct(response.data[0]); // API returns array
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  async function addToCart(productId) {
    if (!isLoggedIn) {
      console.log("u are not logged in")
      navigate("/login?nextPage=/product/" + slug)
    } else {
      console.log("cart")
      const response = await instance.post("cart/add",
        { productId: productId, quantity: 1 },
        { withCredentials: true });
      console.log(response.data.product);
      navigate("/cart")
    }
  }

  return (
    <section className="min-h-screen bg-[#fafafa] py-16 px-6">
      <div className="mx-auto max-w-6xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="bg-white h-full p-12 rounded-xl shadow-sm flex items-center justify-center">
            <img
              src={`${BASEURL}/${product.image}`}
              alt={product.name}
              className="w-full max-w-md object-contain translate-y-1"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">

            <span className="text-xs uppercase tracking-widest text-gray-400">
              {product.category}
            </span>

            <h1 className="text-3xl font-medium text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 text-lg">
              <PiCurrencyInrLight />
              {product.discountedPrice ? (
                <>
                  <span className="text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {product.discountedPrice}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-gray-900">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px w-16 bg-gray-200" />

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-base max-w-md">
              {product.description}
            </p>

            {/* Button */}

            <button
              onClick={() => addToCart(product._id)}
              className="mt-6 w-[150px] rounded-sm p-4 border border-black hover:bg-black hover:text-white transition"
            >
              Add to Cart
            </button>



          </div>
        </div>

      </div>
    </section>
  );



};

export default SingleProduct;