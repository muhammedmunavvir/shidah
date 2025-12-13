import Wishlist from "../models/userwishlist";

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.json([]);

    const wishlist = await Wishlist.findOne({ userId }).populate("products");
    return res.json(wishlist?.products || []);
  } catch (e) {
    console.error("Get wishlist error:", e);
    return res.json([]);
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "INVALID_DATA" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId,
        products: [productId],
      });
      return res.json({ added: true });
    }

    const exists = wishlist.products.some(
      (id) => id.toString() === productId
    );

    wishlist.products = exists
      ? wishlist.products.filter((id) => id.toString() !== productId)
      : [...wishlist.products, productId];

    await wishlist.save();

    return res.json({ added: !exists });
  } catch (e) {
    console.error("Toggle wishlist error:", e);
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};
