const express = require("express");
const {
  adminRegistration,
  adminLogin,
  getAdminDetails,
} = require("../controllers/adminController");
const validateTokenHandler = require("../middleware/validateTokenHanler");

const router = express.Router();

router.route("/registration").post(adminRegistration);
router.route("/login").post(adminLogin);
router.route("/details").get(validateTokenHandler, getAdminDetails);

module.exports = router;
