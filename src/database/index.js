const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

try {
    // console.log("Logging into: " + process.env.MONGODB_URL);
    //mongodb+srv://atlas:R9v47d6q4pjRAfdn@group6.5txl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    mongoose.connect("mongodb+srv://atlas:123123123@atlas.5txl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
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