const mongoose = require('../database');

const ActivtySchema = new mongoose.Schema({

    id:{
        type: String,
        require: true,
    },
    lessonId:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    grade:{
        type: Number,
        require: true,
    },
    final_date:{
        type: String,
        require: true,
    },
    status:{
        type: String,
        require: true,
    }

});

const Activity = mongoose.model('Activity', ActivtySchema);

module.exports = Activity;