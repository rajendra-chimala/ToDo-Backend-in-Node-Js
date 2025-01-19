const { response } = require("express");
const User = require("../model/user.model");
const Zod = require("zod");
const bcrypt = require("bcryptjs");
const webtoken = require("jsonwebtoken");
const {generateTokenAndSaveInCookies} = require("../JWT/token")

const userSchema = Zod.object({
    email: Zod.string().email({ message: "Invalid Email address!" }),
    username: Zod.string().min(3, { message: "Username length should be more than 3 letters!" }),
    password: Zod.string().min(5, { message: "Password should be at least 6 characters!" })
});

const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const validation = userSchema.safeParse({ email, username, password });

        if (!validation.success) {
            const errormsg = validation.error.errors.map((err) => {
                return err.message;
            });
            return res.status(400).json({ errors: errormsg });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already registered!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashPassword });
        await newUser.save();

        if (newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id, res);
            return res.status(201).json({
                message: "User registered successfully!",
                user: newUser,
                token, // Include token here if you want it in the response
            });
        }
        

        return res.status(201).json({ message: "User registered successfully!", newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in Sign up!" });
    }
};

const loginUser = async(req, res) => {
    const {email,password}= req.body;

    try {
        if(!email || !password){

            return res.status(500).json({ message: "All field are required !" }); 


        }

        const user = await User.findOne({email}).select("+password")

        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message: "Invalid email or password !"});
        }

        const token = await generateTokenAndSaveInCookies(user._id, res);
         
        res.status(200).json({
            message: "User Logged in successfully!",
            user,
        });



        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in Sign in!" });
    }


};

const logoutUser = (req, res) => {
   try {

    res.clearCookie("jwt",{
        path:"/",
    })    

    res.status(200).json({ message: "User Logout Success !" });
   } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error in  log out!" });
   }
};

module.exports = { registerUser, loginUser, logoutUser };
