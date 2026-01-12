// import Product from "../models/models_product.js";

// export const getRelatedProducts = async (req, res) => {
//   try {
//     const { category, productId } = req.body;

//     // 🔥 SIMPLE + RELIABLE LOGIC
//     const relatedProducts = await Product.find({
//       _id: { $ne: productId },
//       category: category,
//     })
//       .limit(4)
//       .sort({ createdAt: -1 });

//     res.json(relatedProducts);
//   } catch (err) {
//     console.error("Related product error:", err);
//     res.status(500).json({ message: "Failed to load related products" });
//   }
// };

import axios from "axios";
import Product from "../models/models_product.js";
import Category from "../models/category.js"; // 🔥 correct model import
import "dotenv/config";

export const recommendProducts = async (req, res) => {
  try {
    console.log("🔥 RECOMMEND API HIT");
    console.log("BODY:", req.body);

    const { name, category, description, productId } = req.body;

    // ===============================
    // STEP 1: Resolve Category ID
    // ===============================
    let categoryId = category;

    // If category is string (like "Clothes"), find its ObjectId
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      const catDoc = await Category.findOne({ name: category });

      if (catDoc) {
        categoryId = catDoc._id;
      }
    }

    console.log("✅ Resolved Category ID:", categoryId);

    // ===============================
    // STEP 2: Fallback DB products (ALWAYS works)
    // ===============================
    const fallbackProducts = await Product.find({
      _id: { $ne: productId },
      category: categoryId,
    }).limit(8);

    // ===============================
    // STEP 3: Try AI recommendation
    // ===============================
    try {
      const prompt = `
You are an e-commerce recommendation engine.

Product Name: ${name}
Category: ${category}
Description: ${description}

Suggest 5 similar product names.
Return only comma separated product names.
`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }
      );

      const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      console.log("🧠 Gemini Response:", text);

      const keywords = text
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (keywords.length > 0) {
        const aiProducts = await Product.find({
          _id: { $ne: productId },
          name: { $regex: keywords.join("|"), $options: "i" },
        }).limit(8);

        // 🔥 If AI found products → return them
        if (aiProducts.length > 0) {
          return res.json(aiProducts);
        }
      }
    } catch (aiError) {
      console.log("⚠️ Gemini failed, using fallback products");
      console.log("Gemini Error:", aiError.response?.data || aiError.message);
    }

    // ===============================
    // STEP 4: Return fallback products
    // ===============================
    return res.json(fallbackProducts);

  } catch (error) {
    console.error("❌ Recommend Controller Error:", error);
    return res.status(500).json({ message: "Recommendation failed" });
  }
};

