import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
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
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
    }

    return (
      <>
        {loading && <p className="loading">Loading...</p>}
        <div className="products-container">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </>
    );

}

export default Products;