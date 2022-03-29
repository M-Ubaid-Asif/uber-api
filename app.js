import logger from "./config/logger.js";
import express from "express";
import cors from 'cors';
import morgan from "morgan";
import db from "./connections/dbConnection.js";
import config from "./config/config.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan);


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"success"
    })
});





db();

app.listen(config.server.port,()=>{
    logger.info(`server is running`)
})

export default app






