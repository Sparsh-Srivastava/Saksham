const express = require("express");
const router = express.Router();

const { updateDetails, getDetails } = require("../controllers/auth");
const { sendNGOs } = require("../controllers/ngo");

router.route("/updateDetails/:id").patch(updateDetails);

router.route("/getNGO/:id").get(getDetails);

router.route("/sendNGOs").get(sendNGOs);

module.exports = router;
