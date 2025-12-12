import ProductModel from "../../models/product";
import { Request,Response } from "express";
export const createProduct = async (req:Request, res:Response) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      currency,
      stock,
      category,
      badge,
      sizes,
      colors,
      images,
      isBestSeller,
      isPremium,
      tags,
    } = req.body;

    // Example using Mongoose
    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      discountPrice,
      currency,
      stock,
      category,
      badge,
      sizes,
      colors,
      images,
      isBestSeller,
      isPremium,
      tags,
    });

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const {
      name,
      description,
      price,
      discountPrice,
      currency,
      stock,
      category,
      badge,
      sizes,
      colors,
      images,
      isBestSeller,
      isPremium,
      tags,
    } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        discountPrice,
        currency,
        stock,
        category,
        badge,
        sizes,
        colors,
        images,
        isBestSeller,
        isPremium,
        tags,
      },
      { new: true } // return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};


