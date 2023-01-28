/* eslint-disable no-console */
import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    return res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const getUserPerformace = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransaction = await Promise.all(userWithStats[0].affiliateStats.affiliateSales.map(
      (idTransaction) => Transaction.findById(idTransaction),
    ));

    const filteredSales = saleTransaction.filter(
      (transaction) => transaction !== null,
    );

    return res.status(200).json({ user: userWithStats[0], sales: filteredSales });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
