import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
   slug : { type: String, required: true, unique: true }, 
    description: { type: String, required: true },
    category: {  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true},
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    image: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;    