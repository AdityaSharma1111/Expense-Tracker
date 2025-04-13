import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express"
import { app } from "./app.js";

dotenv.config({
    path: './.env' // specify the location of .env file
})


// returning a promise
connectDB()
.then(() => {
    app.listen(process.env.PORT || 5174, () => {
        console.log(`Server is running at port: ${process.env.PORT || 5173}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed. Error: ", error);
    
})