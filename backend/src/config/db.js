const mongoose = require('mongoose');


const DBconnect = async () =>{
    try{

        const conn=await mongoose.connect(process.env.MONGODB_URL);

        console.log(`MongoDB Connected ${conn.connection.host}`);

    }
    catch(err){
        console.error("MongoDB connection Failed", err.message);
        process.exit(1);
    }
}

module.exports = DBconnect;