const express = require('express');
const { registerController, loginController, testController, forgotPasswordController, updateProfileController } = require('../controllers/authController');
const { requireSignIN, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// User registration route
router.post('/register', registerController);

// User login route
router.post('/login', loginController);
//forgot password
router.post('/forgot-password',forgotPasswordController)

// Test route for admin access only
router.get('/test', requireSignIN, isAdmin, testController);

// Protected route to check if user is authenticated
router.get('/user-auth', requireSignIN, (req, res) => {
    res.status(200).send({
        ok: true
    });
});

router.get('/admin-auth', requireSignIN,isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    });
});
router.put("/profile",requireSignIN,updateProfileController)

module.exports = router;
