const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    first_name : {type:String, required:true},
    last_name : {type:String, required:true},
    email : {type:String, required:true},
    department : {type:String, required:true},
    salary : {type:Number, required:true}
})

const EmpModel = mongoose.model("employee",empSchema);

module.exports = {EmpModel};