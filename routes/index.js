const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user")
const multer = require('multer');
const storage = require('../utils/storage');
const imageFilter = require('../utils/imageFilter');
const upload = multer({ storage: storage, fileFilter: imageFilter });
const path = require('path');


// user routes
router.get("/users", userCtrl.apiGetAllUser);
router.get("/users/:id", userCtrl.apiGetUserByID);
router.post("/users", upload.single('image'), userCtrl.apiCreateUser);
router.put("/users/:id",upload.single('newImage'), userCtrl.apiUpdateUser);
router.delete("/users/:id", userCtrl.apiDeleteUser);

// image routes
router.get('/uploads/images/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, '../uploads/images', filename));
});


module.exports = router;