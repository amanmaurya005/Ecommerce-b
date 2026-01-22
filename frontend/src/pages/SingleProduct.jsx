import React, { useEffect, useState, useRef } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const BASEURL = import.meta.env.VITE_BASEURL;

const SingleProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // 🔥 ADD for image zoom
  const imageRef = useRef(null);

  async function getSingleData() {
    try {
      const response = await instance.get("/product/" + slug);
      const prod = response.data[0];
      setProduct(prod);
      fetchRelatedProducts(prod);
    } catch (error) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
  }, [slug]);

  async function askAI() {
    if (!question.trim()) return toast.warning("Ask something first");

    try {
      setAiLoading(true);

      const res = await instance.post("/api/groq/ask-product", {
        question,
        product: {
          name: product.name,
          category: product.category?.name,
          price: product.discountedPrice || product.originalPrice,
          description: product.description,
        }
      });


      setAiAnswer(res.data.reply);
    } catch (error) {
      toast.error("AI not responding");
    } finally {
      setAiLoading(false);
    }
  }

  async function fetchRelatedProducts(prod) {
    try {
      const res = await instance.post("/recommend", {
        name: prod.name,
        category: prod.category?.name || prod.category,
        description: prod.description,
        productId: prod._id,
      });

      setRelatedProducts(res.data || []);
    } catch (err) {
      console.log("❌ FRONTEND RECOMMEND ERROR:", err.response?.data || err.message);
    }
  }

  async function addToCart(productId) {
    if (!isLoggedIn) {
      toast.warning("Please login to add product to cart");
      navigate("/login?nextPage=/product/" + slug);
      return;
    }

    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      toast.success("Product added to cart 🛒");
      navigate("/cart");
    } catch (error) {
      toast.error("Something went wrong. Try again!");
    }
  }

  // 🔥 ADD – zoom handlers
  function handleMouseMove(e) {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
    imageRef.current.style.transform = "scale(2)";
  }

  function handleMouseLeave() {
    imageRef.current.style.transformOrigin = "center center";
    imageRef.current.style.transform = "scale(1)";
  }

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  let imageUrl = "";

  if (product.image) {
    const img = product.image;
    if (img.startsWith("http")) {
      imageUrl = img;
    } else {
      imageUrl = `${BASEURL}/${product.image}`;
    }
  }

  return (
    <>
      <section className="min-h-screen bg-[#fafafa] py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="bg-white p-12 rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
              <img
                ref={imageRef}
                src={imageUrl}
                alt={product.name}
                className="w-full max-w-md object-contain transition-transform duration-200 cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {product.category?.name}
              </span>

              <h1 className="text-3xl font-medium text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-lg">
                <PiCurrencyInrLight />
                {product.discountedPrice ? (
                  <>
                    <span className="line-through text-gray-400">
                      {product.originalPrice}
                    </span>
                    <span className="font-semibold">
                      {product.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 max-w-md">
                {product.description}
              </p>

              <button
                onClick={() => addToCart(product._id)}
                className="mt-6 w-[150px] p-4 border border-gray-700 hover:bg-gray-900 hover:text-white transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => setShowAI(!showAI)}
                className="mt-3 w-[200px] p-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded"
              >
                Ask about this product 
              </button>

              {showAI && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask anything about this product..."
                    className="w-full border p-3 rounded mb-3"
                    rows={3}
                  />

                  <button
                    onClick={askAI}
                    disabled={aiLoading}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                  >
                    {aiLoading ? "Thinking..." : "Ask AI"}
                  </button>

                  {aiAnswer && (
                    <div className="mt-4 p-3 bg-white border rounded text-gray-700">
                      <strong>AI:</strong> {aiAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 AI RELATED PRODUCTS */}
      <div className="mt-20 px-6 pb-40 relative z-10 bg-white">
        <h2 className="text-2xl font-bold mb-6">
          Recommended Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <Link
              to={`/product/${item.slug}`}
              key={item._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `${BASEURL}/${item.image}`
                }
                className="h-40 w-full object-contain mb-3"
              />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-red-600 font-bold">
                ₹{item.discountedPrice}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </>
  );
};

export default SingleProduct;
