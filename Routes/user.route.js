const express = require("express");

const {UserModel} = require("../Models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtkey = process.env.jwtkey;

const userRoute = express.Router();

userRoute.post("/signup",async(req,res) => {
    const {email,password} = req.body;
    try{
        const existingUser = await UserModel.find({email});
        if(existingUser.length == 0){
            bcrypt.hash(password, 5, async (err,hash)=> {
                if(err){
                    res.send({"message":err.message});
                }
                else{
                    const user = new UserModel({email,password : hash});
                    await user.save();
                    res.status(201).send({"message":"User Registered Successfully"});
                }
            })
        }
        else{
            res.send({"message":"User already exists"});
        }
    }
    catch(err){
        res.send({"message":"Something went wrong","error":err.message});
    }
})

userRoute.post("/login",async(req,res) => {
    const {email,password} = req.body;
    try{
        const checkUser = await UserModel.find({email});
        if(checkUser.length > 0){
            bcrypt.compare(password, checkUser[0].password, (err,result) => {
                if(result == true){
                    const token = jwt.sign({userID : checkUser[0]._id}, jwtkey , { expiresIn: '1h' });
                    res.status(201).send({"message":"Login success","token":token});
                }
                else if(result == false){
                    res.send({"message":"Wrong Credentials"});
                }
            })
        }
        else{
            res.send({"message":"User not registered"});
        }
    }
    catch(err){
        res.send({"message":"Something went wrong","error":err.message});
    }
})

module.exports = {userRoute};
