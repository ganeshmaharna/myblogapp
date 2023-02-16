import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import mongoose from 'mongoose';
import morgan from 'morgan';


const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/',Router);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT}`);
})
//Code for connection start
const Connection=async()=>{
    try{
        await mongoose
        .connect(process.env.DB_URL,{useNewUrlParser: true});
        console.log("Connection Successful");
    }
    catch(error){
        console.log('Error while connecting to the database',error);
     }
}
Connection();
//Code for connection end

