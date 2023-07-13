const express = require("express");
const { connection } = require("./Configs/db");
const cors = require("cors");
const {empRoute} = require("./Routes/employee.route");
const {userRoute} = require("./Routes/user.route");
require("dotenv").config();
const port = process.env.port;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user",userRoute);
app.use("/employee",empRoute);

app.get("/",(req,res) => {
    res.send({"message":"Employee Management Backend"});
})

app.listen(port,async() => {
    try{
        await connection;
        console.log("Connected to Database");
        console.log(`Server is running at port ${port}`);
    }
    catch(err){
        console.log(err.message);
    }
})