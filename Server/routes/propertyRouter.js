const express = require("express");
const router = express.Router();
const multer = require('multer');
const authenticate = require('../middleware/authMiddleware.js');
const {addProperty , uploadImages ,getAllProperty, getAllPropertyImages, getPropertyById, getPropertyImagesById, getSuggestedProperty, addSuggestedPropperty, getSuggestedPropertyImages, getPropertyByType, getMostVisitedProperties, getRecentlyPostedProperties, getPropertyForRent, editProperty, delete_Property, deletePropertyImageById, getPropertyByTypeAndBhk, getPropertyForRentByType, getPropertyForResaleAndType, userRegistration, loginController, adminLoginController, adminRegistration, interestedUser, removeSuggestedProperty, markedAsSold, romeveAsSold, getAllPropertyAdmin, getSuggestedPropertyAdmin} = require('../controller/PropertyController.js');
const { contactedUser, getInterestedUsers, getRegisterUsers, getContactedUsers, forgotPassword, resetPassword, adminForgotPassword, adminResetPassword, deleteContactedUser, deleteIntrestedUser, deleteRegisteredUser } = require("../controller/UserController.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const imageFileName = Date.now() + '-' + file.originalname;
        cb(null, imageFileName);
    },
});
const upload = multer({ storage: storage });




router.post("/addproperty",authenticate, addProperty);
router.put("/editproperty/:propertyId",authenticate, editProperty);
router.delete("/deleteproperty/:propertyId",authenticate, delete_Property);
router.delete("/delete-property-image/:imageId",authenticate, deletePropertyImageById);
router.post("/upload-images", authenticate, upload.array('images', 40), uploadImages);
router.get("/getAllProperty", getAllProperty);
router.get("/getAllPropertyImages", getAllPropertyImages);
router.get("/getPropertyById/:propertyId", getPropertyById);
router.get("/getPropertyByType/:propertyType", getPropertyByType);
router.get("/getPropertyByTypeAndBhk/:propertyType/:bhk", getPropertyByTypeAndBhk);
router.get("/getPropertyImagesById/:propertyId", getPropertyImagesById);
router.get("/getSuggestedProperty", getSuggestedProperty);
router.get("/getSuggestedPropertyImages", getSuggestedPropertyImages);
router.get("/getMostVisitedProperties", getMostVisitedProperties);
router.get("/getRecentlyPostedProperties", getRecentlyPostedProperties);
router.get("/getPropertyForRent", getPropertyForRent);
router.get("/getPropertyForRentByType/:propertyType", getPropertyForRentByType);
router.get("/getPropertyForResaleByType/:propertyType", getPropertyForResaleAndType);


router.post("/addSuggestedProperty",authenticate,addSuggestedPropperty);
router.delete("/removeSuggestedProperty/:propertyId",authenticate,removeSuggestedProperty);
router.post("/register", userRegistration);
router.post("/login", loginController);
router.post("/admin-login", adminLoginController);
router.post("/admin-registration", adminRegistration);
router.post("/interestedUser", interestedUser);
router.post("/contacted", contactedUser);
router.get("/getInterestedUsers" , getInterestedUsers);
router.get("/getRegisterUsers" , getRegisterUsers);
router.get("/getContactedUsers" , getContactedUsers);
router.put("/markedAsSold/:propertyId" ,authenticate, markedAsSold);
router.put("/removeAsSold/:propertyId" ,authenticate, romeveAsSold);
router.get("/getAllPropertyAdmin" , getAllPropertyAdmin);
router.get("/getSuggestedPropertyAdmin", getSuggestedPropertyAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.post("/admin-forgot-password", adminForgotPassword);
router.post("/admin-reset-password/:id/:token", adminResetPassword);

router.delete("/deleteContactedUser/:userId",authenticate,deleteContactedUser);
router.delete("/deleteIntrestedUser/:userId",authenticate,deleteIntrestedUser);
router.delete("/deleteRegisteredUser/:userId",authenticate,deleteRegisteredUser);











module.exports = router;