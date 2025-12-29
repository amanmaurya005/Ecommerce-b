import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";

function ProductCard ({product,slug}) {

  const BASEURL = import.meta.env.VITE_BASEURL;

    return (
    <div className="w-full max-w-[230px] rounded-xl p-2 bg-white shadow-md hover:shadow-xl transition-all duration-300">
  
  {/* Image */}
  <div className="h-48 w-full overflow-hidden flex items-center justify-center rounded-t-xl bg-gray-50 p-4">
   <Link to={`/product/${slug}`}>
    <img
      src={`${BASEURL}/${product.image}`}
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
    <button className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600 active:scale-95">
      Add to Cart
    </button> 
  </div>
</div>



    );
}

export default ProductCard;