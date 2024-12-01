const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer} = req.body;

        // Validate input fields
        if (!name || !email || !password || !phone || !address || !answer ) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already registered. Please login.',
            });
        }

        // Register the user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer        });
        await user.save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error: error.message
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Email is not registered"
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error: error.message
        });
    }
};

const testController = (req, res) => {
    res.send('Protected Routes');
};
const forgotPasswordController=async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body
        if(!email){
            res.status(400).send({message:"email is required"})
        }
        if(!answer){
            res.status(400).send({message:"answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"newpassword is required"})
        }
const user=await userModel.findOne({email,answer})
if(!user){
    return res.status(404).send({
        success:false,
        message:"wrong email or answer"
    })
}
const hashed=await hashPassword(newPassword)
await userModel.findByIdAndUpdate(user._id,{password:hashed});
res.status(200).send({
success:true,
message:"password reset successfully"
});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'something went wrong',
            error
        })
        
    }


}
 const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

module.exports = { registerController, loginController,updateProfileController   , testController,forgotPasswordController};
