import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/products.type.js";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    currency: { type: String, default: "INR" },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    discount:{type:String,required:true},
    badge:{type:String,required:true},
    // subCategory: { type: String },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    images: [{ type: String, required: true }],
    isBestSeller: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    tags: [{ type: String }],
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<IProduct>("Products", productSchema);

export default ProductModel;