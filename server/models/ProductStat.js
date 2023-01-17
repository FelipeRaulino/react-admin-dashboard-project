import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlyTotalSales: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: String,
        totalUnits: String,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: String,
        totalUnits: String,
      },
    ],
  },
  { timestamps: true },
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);

export default ProductStat;
