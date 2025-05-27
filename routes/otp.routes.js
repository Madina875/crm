const {
  newOtp,
  verifyOtp,
} = require("../controllers/otp.controller");

const router = require("express").Router();
router.post("/new", newOtp); // new endpoint
router.post("/verify", verifyOtp); // new endpoint

module.exports = router;
