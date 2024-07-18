const mongoose = require('mongoose');
const { number } = require('zod');

mongoose.connect("mongodb+srv://admin:deep1507@cluster0.rd0szsg.mongodb.net/UnityNest");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
     position:{
         type:String,
         required:true,
         trim:true,
         maxLength:50
     },
     positionseniorityindex:{
         type:Number,
         required:true
     }
},{
    collection:'users' // Specify the collection name here
});

const taskSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    subordinateid: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    task: {
        type: String,
        required: true,
        trim: true
    },
    submissiondate:{
         type:String,
         required:true,
         trim:true,
     },
     status:{
        type:Number,
        required:true,
        trim:true
     },
     completedtaskmessage:{
        type:String,
        trim:true
     }
},{
    collection:'tasks' // Specify the collection name here
});

// Remove unique constraint from userid


const User = mongoose.model('User',userSchema);
const Task = mongoose.model('Task',taskSchema);

module.exports={
    User,
    Task
};