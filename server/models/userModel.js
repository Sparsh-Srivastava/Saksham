const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    ngo_name: {
      type: String,
      required: "{PATH} is required!",
    },
    founder_name: {
      type: String,
      required: "{PATH} is required!",
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    logo: {
      type: String,
    },
    ngo_description: {
      type: String,
    },
    website_link: {
      type: String,
    },
    ceo_statement: {
      type: String,
    },
    gallery: [
      {
        type: String,
      },
    ],
    donation_type: [
      {
        type: String,
      },
    ],
    branches: [
      {
        type: String,
      },
    ],
    funds: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkdin: {
      type: String,
    },
    testimonial: [
      {
        image: {
          type: String,
        },
        name: {
          type: String,
        },
        text: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
