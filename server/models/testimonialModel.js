const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: "{PATH} is required!",
    },
    name: {
      type: String,
      required: "{PATH} is required!",
    },
    text: {
      type: String,
      required: "{PATH} is required!",
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
