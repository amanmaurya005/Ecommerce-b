// import Category from "../models/category.js";



// function createSlug(text) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");
// }

// // CREATE CATEGORY
// export const createCategory = async (req, res) => {
//   try {
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: "Category name is required" });
//     }

//     // check existing category
//     const exist = await Category.findOne({ name });
//     if (exist) {
//       return res.status(400).json({ message: "Category already exists" });
//     }

//     const slug = createSlug(name);

//     const category = await Category.create({
//       name,
//       slug,
//     });

//     res.status(201).json({
//       message: "Category created successfully",
//       category,
//     });
//   } catch (error) {
//     console.error("Create Category Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // GET ALL CATEGORIES
// export const getCategory = async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });

//     res.status(200).json(categories);
//   } catch (error) {
//     console.error("Get Category Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getSingleCategory = async (req, res) => {
//   try {
//     const { slug } = req.params;

//     const category = await Category.findOne({ slug });

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.status(200).json(category);
//   } catch (error) {
//     console.error("Get Single Category Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




import pool from "../db/mysql.js";

// same slug function
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// ================= CREATE CATEGORY =================
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // check existing category
    const [exist] = await pool.query(
      "SELECT id FROM categories WHERE name = ?",
      [name]
    );

    if (exist.length > 0) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const slug = createSlug(name);

    const [result] = await pool.query(
      "INSERT INTO categories (name, slug) VALUES (?, ?)",
      [name, slug]
    );

    res.status(201).json({
      message: "Category created successfully",
      category: {
        id: result.insertId,
        name,
        slug,
      },
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ALL CATEGORIES =================
export const getCategory = async (req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM categories ORDER BY created_at DESC"
    );

    res.status(200).json(categories);
  } catch (error) {
    console.error("Get Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE CATEGORY =================
export const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE slug = ?",
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get Single Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
