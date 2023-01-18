/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const productStats = await ProductStat.find({ productId: product._id });

        return {
          ...product._doc,
          productStats,
        };
      }),
    );

    return res.status(200).json(productsWithStats);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export default getProducts;
