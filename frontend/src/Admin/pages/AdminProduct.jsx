import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom"

function AdminProduct() {
    const [products, setProducts] = useState([]);

    // Fetch products from backend
    async function fetchProducts() {
        try {
            const response = await axios.get("http://localhost:3000/product", { withCredentials: true });
            setProducts(response.data);
            console.log(response)
        } catch (error) {
            console.error("Error loading products:", error);
            alert("Failed to load products");
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="admin-main">
            <h1>Manage Products</h1>


            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((item) => (
                        <div className="product-card" key={item._id}>
                            <img
                                src={`http://localhost:3000/${item.image}`}
                                alt={item.name}
                            />

                            <h3>{item.name}</h3>
                            <p className="price">₹{item.originalPrice}</p>
                            <p className="price">₹{item.discountedPrice}</p>

                            <div className="product-actions">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found!</p>
                )}
            </div>
        </div>
    );
}

export default AdminProduct;
