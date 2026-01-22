// import Product from "../models/models_product.js";
// import mongoose from "mongoose";
// import cloudinary from "../middleWares/Cloudinary.js";

// export async function addProduct(req, res) {
//   try {
//     const newRecord = req.body;
//     if (req.file) {
//     const result  = await cloudinary.uploader.upload( req.file.path.replace(/\\/g, "/"),
//   {folder:"product"});
//       newRecord.image = result.secure_url
//     }
//     const newProduct = new Product(newRecord);
//     await newProduct.save();
//     return res.status(201).json(newProduct);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }



// export async function updateProduct(req, res) {
//   try {
//     const { id } = req.params;
//     const updatedRecord = req.body;
//     if (!id) {
//       return res.status(400).json({ message: "ID parameter is required" });
//     }
//     if (!updatedRecord) {
//       return res
//         .status(400)
//         .json({ message: "Updated product schema is required" });
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(id, updatedRecord, {
//       new: true,
//     });
//     if (!updatedProduct)
//       return res.status(404).json({ message: "Could not update this product" });
//     return res
//       .status(200)
//       .json({ message: "Product Updated", product: updatedProduct });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }



// export async function deleteProduct(req, res) {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ message: "ID parameter is required" });
//     }
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: "ID not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: "Product with id " + id + " successfully deleted" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }



// export async function getProducts(req, res) {
//   try {
//     const products = await Product.find();
//     return res.status(200).json(products);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }
// export async function getSingleProduct(req, res) {
//   try {
//     const {slug}=req.params;

//     const singleProduct = await Product.find({slug:slug}).populate("category");
//     return res.status(200).json(singleProduct);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

// export async function checkSlug(req, res) {
//   try {
//     const { slug } = req.params;
//     if (!slug) {
//       res.status(400).json({ message: "slug required" });
//       return;
//     }
//     const matchingSlug = await Product.findOne({ slug: slug });
//     if (matchingSlug)
//       return res.status(400).json({ message: "Slug already exists. Choose different" })

//     return res.status(200).json({ message: "slug is available" })
//   }
//   catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };








import pool from "../db/mysql.js";
import cloudinary from "../middleWares/Cloudinary.js";

// ================= ADD PRODUCT =================
export async function addProduct(req, res) {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      name,
      slug,
      description,
      originalPrice,
      discountedPrice,
      category_id,
    } = req.body;

    // ✅ validation
    if (
      !name ||
      !slug ||
      !description ||
      !originalPrice ||
      !discountedPrice ||
      !category_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ upload image
    let imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path.replace(/\\/g, "/"),
        { folder: "product" }
      );
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ insert into DB (MATCHES TABLE)
    const [resultDb] = await pool.query(
      `INSERT INTO products
      (name, slug, description, category_id, originalPrice, discountedPrice, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        slug,
        description,
        category_id,
        originalPrice,
        discountedPrice,
        imageUrl,
      ]
    );

    res.status(201).json({
      message: "Product added successfully",
      productId: resultDb.insertId,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
}

// ================= UPDATE PRODUCT =================
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updatedRecord = req.body;

    const [result] = await pool.query(
      "UPDATE products SET ? WHERE id = ?",
      [updatedRecord, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================= DELETE PRODUCT =================
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================= GET ALL PRODUCTS =================
export async function getProducts(req, res) {
  try {
    const [products] = await pool.query(
      `SELECT p.*, c.name AS categoryName
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id`
    );

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================= GET SINGLE PRODUCT =================
export async function getSingleProduct(req, res) {
  try {
    const { slug } = req.params;

    const [rows] = await pool.query(
      `SELECT p.*, c.name AS categoryName
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = ?`,
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================= CHECK SLUG =================
export async function checkSlug(req, res) {
  try {
    const { slug } = req.params;

    const [rows] = await pool.query(
      "SELECT id FROM products WHERE slug = ?",
      [slug]
    );

    if (rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Slug already exists. Choose different" });
    }

    res.status(200).json({ message: "Slug is available" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
