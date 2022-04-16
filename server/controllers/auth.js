const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { ngo_name, founder_name, email, password } = req.body;

  try {
    const user = await User.create({
      ngo_name,
      founder_name,
      email,
      password,
    });

    await user.save();
  } catch (err) {
    console.log(err);
  }
};
