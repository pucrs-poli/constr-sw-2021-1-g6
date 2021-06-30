const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

try {
    // console.log("Logging into: " + process.env.MONGODB_URL);
    mongoose.connect("mongodb+srv://group6:cvKZXhQST0r0pGGO@group6.5txl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    //mongoose.connect('mongodb://localhost/noderest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
    });
} 
catch(e){
    console.log('Connection Error: ' + e);
    return;
}

module.exports = mongoose;