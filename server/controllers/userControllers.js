// ✅ Correct
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


//sign up for newuser
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Please provide all required fields" });
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.json({ success: false, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            bio
        });
        await newUser.save();
        const token= generateToken(newUser._id)

        res.json({ success: true, userData: newUser, token, message: "User registered successfully" });

        // try {
        //     await newUser.save();
        //     const token = generateToken(newUser._id);
        //     res.json({ success: true, userData: newUser, token, message: "User registered successfully" });
        // } catch (error) {
        //     console.error("Error saving user:", error.message);
        //     res.json({ success: false, message: "Failed to register user" });
        // }


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }
}

//Controller to login a user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id);
        res.json({ success: true, userData, token, message: "User logged in successfully" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }
}

//controller to check if user is authenticated or not

export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
}

//controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true });
        }
        res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// import { generateToken } from "../lib/utils.js";   // ✅ added .js
// import User from "../models/User.js";              // ✅ added .js
// import bcrypt from "bcryptjs";
// import cloudinary from "../lib/cloudinary.js";     // ✅ already has .js

// // ==========================
// // Signup Controller
// // ==========================
// export const signup = async (req, res) => {
//     const { fullName, email, password, bio } = req.body;

//     try {
//         if (!fullName || !email || !password || !bio) {
//             return res.json({ success: false, message: "Please provide all required fields" });
//         }

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             fullName,
//             email,
//             password: hashedPassword,
//             bio
//         });

//         await newUser.save();

//         const token = generateToken(newUser._id); // ✅ fixed consistency
//         res.json({ success: true, userData: newUser, token, message: "User registered successfully" });

//     } catch (error) {
//         console.error("Error in signup:", error.message);
//         res.json({ success: false, message: "Failed to register user" });
//     }
// };

// // ==========================
// // Login Controller
// // ==========================
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const userData = await User.findOne({ email });

//         if (!userData) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, userData.password);
//         if (!isPasswordCorrect) {
//             return res.json({ success: false, message: "Invalid credentials" });
//         }

//         const token = generateToken(userData._id); // ✅ consistent
//         res.json({ success: true, userData, token, message: "User logged in successfully" });

//     } catch (error) {
//         console.log("Error in login:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// };

// // ==========================
// // Check Authentication
// // ==========================
// export const checkAuth = (req, res) => {
//     res.json({ success: true, user: req.user });
// };

// // ==========================
// // Update Profile
// // ==========================
// export const updateProfile = async (req, res) => {
//     try {
//         const { profilePic, bio, fullName } = req.body;
//         const userId = req.user._id;
//         let updatedUser;

//         if (!profilePic) {
//             updatedUser = await User.findByIdAndUpdate(
//                 userId,
//                 { bio, fullName },
//                 { new: true }
//             );
//         } else {
//             const upload = await cloudinary.uploader.upload(profilePic);
//             updatedUser = await User.findByIdAndUpdate(
//                 userId,
//                 { profilePic: upload.secure_url, bio, fullName },
//                 { new: true }
//             );
//         }

//         res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });

//     } catch (error) {
//         console.log("Error in updateProfile:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// };    