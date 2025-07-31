import User from "../models/User.js"
import jwt from "jsonwebtoken";


export async function signup(req,res){
    // res.send("Signup Route !!")
    const {email, password, fullname} = req.body

    try{
        if(!email || !password || !fullname){
            return res.status(400).json({message: "All fields are required !!"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "password must be atleast 6 characters long !!"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists, please use a different one !!"});
        }

        const idx = Math.floor(Math.random()*100)+1; //generate a number between 1-100
        const randAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = new User.create({
            email,
            fullname,
            password,
            profilePic: randAvatar,            
        })

        //TODO: CREATE THE USER IN STREAM AS WELL

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expressIn: "7d"
        })

        res.cookie("jwt",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevent XSS attacks
            sameSite: "strict", //prevent CSRF attack
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success:true, user:newUser})

    }catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({message: "Internal Server Error !!"});
    }
}

export async function login(req,res){
    res.send("Login Route !!")
}

export function logout(req,res){
    res.send("Logout Route !!")
}