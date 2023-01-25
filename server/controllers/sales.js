import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const sales = await OverallStat.find();
    return res.status(200).json(sales[0]);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
