const express = require("express");
const router = express.Router();

const { updateDetails, getDetails } = require("../controllers/auth");

router.route("/updateDetails/:id").patch(updateDetails);

router.route("/getNGO/:id").get(getDetails);

module.exports = router;
