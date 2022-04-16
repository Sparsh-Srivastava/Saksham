const User = require("../models/userModel");

exports.sendNGOs = async (req, res, next) => {
  const NGOs = await User.find();
  res.send(NGOs);
};
