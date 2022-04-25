const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //initUsers() // for init database remove '//' then save.

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }   catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

// init data-base 
const initUsers = async()=>{
    const ids = []
     for(let i = 1; i < 6; i++){
         const user =  new User({
             name:"user"+i ,
             password:111+i-1  
         })
        const savedUser = await user.save()
        ids.push(savedUser._id)
     }
     for(let i = 0; i < 10; i++){
     const message =  new Message({
        sender:ids[Math.floor(Math.random() * ids.length)],
        receiver:ids[Math.floor(Math.random() * ids.length)],
        subject: "try",
        message: "message try"
    })
    message.save()
}
}


module.exports = connectDB;