const express = require("express");
const router = express.Router();

const { updateDetails } = require("../controllers/auth");

router.route("/updateDetails/:id").patch(updateDetails);

module.exports = router;
