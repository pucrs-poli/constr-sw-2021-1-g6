const mongoose = require('../database');

const LessonSchema = new mongoose.Schema({

    id:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    course:{
        type: String,
        require: true,
    },
    activities:{
        type: String,
        require: true,
    },
    room:{
        type: Number,
        require: true,
    }

});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;