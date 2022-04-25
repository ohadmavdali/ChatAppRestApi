const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./server/config/db");
const Message = require('./server/models/messageModel');
const User = require('./server/models/userModel');
const asyncHandler = require("express-async-handler");
const generateToken = require("./server/config/generateToken");


dotenv.config();
connectDB();
const app = express();

// for JSON data 
app.use(express.json()); 

// Run Api
app.get('/', async (req,res) => {
    try {
        res.send("API IS RUNNING");
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

// Register new user
app.post('/register', asyncHandler(async (req, res) => {
try {
    const { name, password } = req.body;

    if (!name || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ name });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        password,
    });

    if (user) {
        res.status(201).json({
        _id: user._id,
        name: user.name,
        //token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");}

} catch(err){
    console.log(err)
    res.sendStatus(500)
    }
}));

// Auth user (Login)
app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });

        if (user && (await user.matchPassword(password))) {
        userToken = generateToken(user._id);
        res.json({
          _id: user._id,
          name: user.name,
          token: userToken,
        });
        //console.log(userToken)

        const updateToken = User.findByIdAndUpdate(
            {_id:user._id},
            [{$set:{token: userToken}}]) 
            await updateToken.save
            //console.log(updateToken);

        //await updatedUser.save();
        } else {
        res.status(401);
        throw new Error("Invalid name or Password");}

    } catch(err){
        console.log(err)
        res.sendStatus(500)
        }
});

//Get all users 
app.get('/users', async (req,res) => {
    try {
        const users = await User.find()
        res.send(users);
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

//Get all messages
app.get('/messages', async (req,res) => {
    try {
        const messages = await Message.find()
        .populate("sender", "name")
        .populate("receiver", "name")
        res.send(messages);
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

// Get all messages for a specific user
app.get('/messages/:id', async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById({_id: userId });
        //console.log(user);

        //console.log(token);
        //if userId.token == req.body.token:
        const messages = await Message.find(
            { $or: [ { sender: userId}, {receiver:userId }] }
             )
        .populate("sender","name")
        .populate("receiver","name")
        res.send(messages);
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    
    }
});

// Read message
app.put('/messages/:id', async (req, res) => {
    try{
        const readMessage = await Message.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:{isRead:true}},
            {new: true})
        res.send(readMessage);

} catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

// Get all Unread messages for a specific user
app.get('/unreadMessages/:id', async (req,res) => {
    try {
        const userId = req.params.id;
        const messages = await Message.find(
            { $or: [ { sender: userId}, {receiver:userId} ] , isRead: false})
        .populate("sender","name")
        .populate("receiver","name")
        res.send(messages);            
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

// Send message
app.post('/messages/:id', async (req,res) => {
    try {
        const newMessage = new Message(req.body)
        await newMessage.save()
        res.send({msg:"new message created"});

    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

// Delete message
app.delete('/:id', async(req,res) => {
    try {
        const messageId  = req.params.id;
        const result = await Message.deleteOne({_id: messageId});
        res.send(result);
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

const port = process.env.PORT || 10001;
app.listen(port, () => {
    console.log(`server running on port ${port}...`)
})


