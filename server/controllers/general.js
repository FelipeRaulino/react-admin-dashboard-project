/* eslint-disable no-console */
import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const currentDay = "2021-01-02";
    const currentMonth = "January";
    const currentYear = 2021;

    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStats = monthlyData.find(({ month }) => month === currentMonth);
    const todayStats = dailyData.find(({ date }) => date === currentDay);

    return res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      salesByCategory,
      monthlyData,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
