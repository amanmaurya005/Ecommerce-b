import { PiCurrencyInrLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product, slug }) {
  const BASEURL = import.meta.env.VITE_BASEURL;

  let imageUrl = "";

  if (product.image) {
    const img = product.image;

    if (img.startsWith("http")) {
      imageUrl = img;
    } else {
      imageUrl = `${BASEURL}/${product.image}`;
    }
  }

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const isInCart = cartItems.some(
    (item) => item.productId?._id === product._id
  );

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
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-[230px] rounded-xl p-2 bg-white shadow-md hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="h-48 w-full overflow-hidden flex items-center justify-center rounded-t-xl bg-gray-50 p-4">
        <Link to={`/product/${slug}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <Link to={`/product/${slug}`}>
          <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center py-2 gap-2 text-sm">
          <PiCurrencyInrLight />
          <span className="text-gray-400 line-through">
            {product.originalPrice}
          </span>
          <span className="font-semibold text-green-600">
            {product.discountedPrice || product.originalPrice}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={() => addToCart(product._id)}
          disabled={isInCart}
          className={`mt-4 w-full rounded-lg py-2 text-sm font-semibold transition-all
            ${isInCart
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
            }`}
        >
          {isInCart ? "In Cart ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
