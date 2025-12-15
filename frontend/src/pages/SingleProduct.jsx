import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";

const SingleProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="single-product">
      <div className="single-product-image">
        <img
          src={`http://localhost:3000/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="single-product-details">
        <h1>{product.name}</h1>
        <p className="category">{product.category}</p>

        <p className="price">
          <PiCurrencyInrLight />
          {product.discountedPrice ? (
            <>
              <del>{product.originalPrice}</del>{" "}
              <strong>{product.discountedPrice}</strong>
            </>
          ) : (
            <strong>{product.originalPrice}</strong>
          )}
        </p>

        <p className="description">{product.description}</p>

        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;