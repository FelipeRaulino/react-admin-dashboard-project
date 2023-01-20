/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

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

export const getTransactions = async (req, res) => {
  try {
    // sort should be like { field: "userId", sort: "asc" }
    const {
      page = 1, pageSize = 20, sort = null, search = "",
    } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };

    const sortFormatted = sort ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    return res.status(200).json({ transactions, total });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
