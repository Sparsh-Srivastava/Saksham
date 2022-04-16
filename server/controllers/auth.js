const User = require("../models/userModel");
const crypto = require("crypto");
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
    sendToken(user, 200, res);

    await user.save();
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.updateDetails = async (req, res, next) => {
  let id = req.params.id;

  let updated = User.findByIdAndUpdate(
    id,
    {
      $set: {
        logo: req.body.logo,
        ngo_description: req.body.ngo_description,
        website_link: req.body.website_link,
        ceo_statement: req.body.ceo_statement,
        testimonial: req.body.testimonial,
        gallery: req.body.gallery,
        donation_type: req.body.donation_type,
        branches: req.body.branches,
        funds: req.body.funds,
        phone: req.body.phone,
        email: req.body.email,
        instagram: req.body.instagram,
        linkdin: req.body.linkdin,
      },
    },
    (err, user) => {
      if (err) {
        res.json({
          message: "There was an error",
          error: err,
        });
      } else {
        res.json({
          message: "Details updated",
          data: user,
        });
      }
    }
  );
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res
    .status(statusCode)
    .json({ sucess: true, token: token, id: user._id, role: user.role });
};
