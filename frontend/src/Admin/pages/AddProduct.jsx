import axios from "axios";
import React, { useState } from "react";

function AddProduct() {
    const [data, setData] = useState({
        name: "",
        slug: "",
        category: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
        image: null
    });

    function handleChange(e) {
        const { name, value, files } = e.target;

        if (name === "image") {
            setData({ ...data, image: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    }

    function createSlug(e) {
        const nameValue = e.target.value;
        if (!nameValue) return;
        // console.log(nameValue)
        const slug = nameValue
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        setData({ ...data, slug });
        document.querySelector("#slug").focus();
    }


    async function checkSlug(slug) {

        try {
            const res = await axios.get(`http://localhost:3000/product/checkSlug/${slug}`,
                { withCredentials: true })
                console.log(res);
        //  if(res.message===""){
        //     alert("slug already exist");
        //  }


        } catch (error) {
            console.log(error);
            if (error.message === "Slug already exists. Choose different")
                alert("Slug already exists. Choose different")
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const product = new FormData();

        Object.keys(data).forEach((key) => {
            product.append(key, data[key]);
        });

        try {
            const response = await axios.post(
                "http://localhost:3000/product",
                product,
                { withCredentials: true }
            );

            console.log("Product Added:", response.data);
            alert("Product added successfully!");

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
        // console.log(...product)
    }

    return (
        <div>
            <h2>Add a New Product</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        onBlur={createSlug}
                    />
                </div>

                <div className="form-group">
                    <label>Slug</label>
                    <input
                        type="text"
                        name="slug"
                        id="slug"
                        value={data.slug}
                        onChange={(e) => setData({ ...data, slug: e.target.value })}
                        onBlur={(e) => checkSlug(e.target.value)}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Original Price</label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={data.originalPrice}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Discounted Price</label>
                    <input
                        type="number"
                        name="discountedPrice"
                        value={data.discountedPrice}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;