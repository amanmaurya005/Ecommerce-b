import { PiCurrencyInrLight } from "react-icons/pi";

function ProductCard ({product}) {
    return (
        <div className="productCard">
            <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
            <div className="content">
                <h3>{product.name}</h3>
                <p>
                    <PiCurrencyInrLight /> 
                    {product.discountedPrice ? (
                        <>
                            <del>{product.originalPrice}</del> 
                            <strong>{product.discountedPrice }</strong>
                        </>
                    ) : (
                            <strong>Product.originalPrice</strong>
                    )}
                </p>
            </div>
        </div>
    );
}

export default ProductCard;