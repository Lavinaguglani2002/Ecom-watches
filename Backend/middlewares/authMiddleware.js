const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Protected routes middleware
const requireSignIN = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is required',
            });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token or missing user ID',
            });
        }

        // Attach the decoded user info to the request
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access',
        });
    }    
};

// Admin access middleware
const isAdmin = async (req, res, next) => {
    try {
        // Ensure req.user exists and is valid
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access',
            });
        }

        // Cache user data in req.user after fetching it
        if (!req.user.details) {
            req.user.details = await userModel.findById(req.user._id);
        }

        // Check if the user is an admin
        if (req.user.details.role !== 1) {
            return res.status(403).json({
                success: false,
                message: 'Admin access required',
            });
        }

        next();
    } catch (error) {
        console.error("Admin check error:", error);
        return res.status(500).json({
            success: false,
            message: 'Error in admin middleware',
            error: error.message,
        });
    }
};



// General role-checking middleware
module.exports = { requireSignIN, isAdmin };

// Exporting both middleware functions
