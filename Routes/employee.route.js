const express = require("express");
const {EmpModel} = require("../Models/employee.model");

const empRoute = express.Router();

empRoute.get("/all",async(req,res) => {
    try{
        const allEmp = await EmpModel.find();
        res.status(200).send(allEmp);
    }
    catch(err){
        res.send({"message":"Something went wrong","error":err.message});
    }
})

empRoute.post("/add",async(req,res) => {
    const {first_name,last_name,email,department,salary} = req.body;
    try{
        const checkExisting = await EmpModel.find({email});
        if(checkExisting.length == 0){
            const newEmp = new EmpModel({first_name,last_name,email,department,salary});
            await newEmp.save();
            res.status(201).send({"message":"Employee Added Successfully"});
        }
        else{
            res.send({"message":"A user with same E-mail already exists"});
        }
    }
    catch(err){
        res.send({"message":"Something went wrong","error":err.message});
    }
})

empRoute.delete("/:id",async(req,res) => {
    const id = req.params.id;
    try{
        const checkEmp = await EmpModel.findById(id);
        if(checkEmp){
            const delEmp = await EmpModel.findByIdAndDelete(id);
            res.send({"message":"Employee Deleted"});
        }
        else{
            res.send({"message":"User does not exist"});
        }
    }
    catch(err){
        res.send({"message":"Something went wrong","error":err.message});
    }
})

module.exports = {empRoute};