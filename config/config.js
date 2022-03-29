import dotenv from 'dotenv';
dotenv.config();


const server = {
    port:process.env.port
}

const db = {
    uri:process.env.MONGO_URI,
    options:{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
}

export default {
    db,
    server
}
