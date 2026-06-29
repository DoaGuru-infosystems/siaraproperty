const express = require("express");
const router = express.Router();

const {userRegistration,loginController, interestedUser } = require('../controller/userController.js');
const { adminLoginController, adminRegistration } = require("../controller/adminController.js");



router.post("/register", userRegistration);
router.post("/login", loginController);
router.post("/admin-login", adminLoginController);
router.post("/admin-registration", adminRegistration);
router.post("/interestedUser", interestedUser);



module.exports = router;
