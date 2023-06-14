
const express=require("express");
const { connection } = require("mongoose");
const app=express();

require("dotenv").config();

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connecte to DB")
    } catch (error) {
        console.log("Not able to connect database")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})