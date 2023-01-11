import User from "../models/User.js";

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export default getUser;
