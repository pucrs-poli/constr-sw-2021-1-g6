const express = require('express');

const Lesson = require('../models/Lesson');
const Activity = require('../models/Activity');

const router = express.Router();

router.post('/register', async (req, res) => {

    try {
        const user = await User.create(req.body);

        return res.send({ user });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Registration failed' });
    }
});

// Lessons

// POST - /lessons - criação de um objeto
router.post('/lessons', async (req, res) => {

    try {

        const {
            id,
            name,
            course,
            activities,
            room,
        } = req.body;

        const lessonCreated = await Lesson.create({
            id,
            name,
            course,
            activities,
            room,
        });

        return res.send({ lessonCreated });
    }
    catch (err) {
        console.log("Erro: " + err);
        return res.status(400).send({ error: 'Lesson creation failed' });
    }
});

//DELETE - /lessons/id - exclusão de um objeto
router.delete('/lessons/:id', async (req, res) => {

    try {
        await Lesson.findByIdAndRemove(
            { _id: req.params.id },
            function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result) {
                    //se houver result, é porque foi deletado corretamente
                    res
                        .status(200)
                        .json({ success: true, message: 'Lesson deleted' });
                    return;
                } else {
                    //se nao houver result é porque nao existe um room com este id
                    res
                        .status(404)
                        .json({ success: false, message: 'Lesson not found' });
                    return;
                }
            }
        );
    }
    catch (err) {
        return res.status(400).send({ error: 'Couldn´t delete Lesson' });
    }
});

// PUT - /lessons/id - atualização de todo objeto
router.put('/lessons/:id', async (req, res) => {

    try{
        Lesson.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { upsert: true },
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(req.body);
                    res.end();
                }
            }
        );
    }
    catch(err){
        return res.status(400).send({ error: 'Couldn´t put Lesson' });
    }
});

// PATCH - /lessons/id - atualização de alguns atributos do projeto
router.patch('/lessons/:id', async (req, res) => {

    try{

        const { id, name, course, activities, room } = req.body;

        let lessonToChange;

        try{
            lessonToChange = await Lesson.findById(req.params.id);
        }
        catch(err){
            res.status(404).json({message: 'Lesson not found'});
        }

        if(id){
            lessonToChange.id = id;
        }

        if(name){
            lessonToChange.name = name;
        }

        if(course){
            lessonToChange.course = course;
        }

        if(activities){
            lessonToChange.activities = activities;
        }

        if(room){
            lessonToChange.room = room;
        }

        try{
            await lessonToChange.save();
            if(id || name || course || activities || room){
                res.status(200).json(lessonToChange);
            }
            else{
                res.status(404).json({message: 'Erro nos atributos'});
                res.end();
                return;
            }
        }
        catch(err){
            res.status(404).json({error: err.message});
            res.end();
            return;
        }
    }
    catch(err){
        res.status(404).json({message: 'Couldn´t patch Lesson'});
        res.end();
        return;
    }
});

// GET - /resource - recupera todos objetos
router.get('/lessons', async (req, res) => {

    try {
        const lesson = Lesson
            .find({})
            .lean()
            .exec(function (e, docs) {
                if (docs.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Lessons not found."
                    })
                } else {
                    res.status(200).json(docs);
                }
                res.end();
            });

        console.log(lesson);
    }
    catch (err) {
        return res.status(400).send({ error: 'Failed to get Lessons' });
    }

});

// GET - /resource/id - recupera um obj pelo id
router.get('/lessons/:id', async (req, res) => {

    try {
        Lesson.findById(req.params.id).lean().exec(function(_, response){

            if(response){
                res.status(200).json(response);
            }
            else{
                res.status(404).json({
                    sucess: false,
                    message: 'Lesson not found'
                })
            }
            res.end();

        });
    }
    catch(err){
        res.status(400).send({error: 'Failed to get Lessons by ID'});
        res.end();
        return; 
    }

});

// GET - /resource/?atributo=valor - recuperação de um objeto por uma query string simples
// GET - /resource/?atributo=valor&atributo>=valor&etc - recuperação de um objeto por uma query string complexa

//Activity
router.post('/activity', async (req, res) => {

    try {

        const {
            id,
            lessonId,
            name,
            description,
            grade,
            final_date,
            status
        } = req.body;

        const activityCreated = await Activity.create({
            id,
            lessonId,
            name,
            description,
            grade,
            final_date,
            status
        });

        return res.send({ activityCreated });
    }
    catch (err) {
        console.log("Erro: " + err);
        return res.status(400).send({ error: 'Activity creation failed' });
    }
});

//DELETE - /lessons/id - exclusão de um objeto
router.delete('/activity/:id', async (req, res) => {

    try {
        await Activity.findByIdAndRemove(
            { _id: req.params.id },
            function (error, response) {
                if (error) {
                    console.log(error);
                } else if (response) {
                    //se houver result, é porque foi deletado corretamente
                    res.status(200).json({ success: true, message: 'Activity deleted' });
                    return;
                } else {
                    //se nao houver result é porque nao existe um room com este id
                    res.status(404).json({ success: false, message: 'Activity not found' });
                    return;
                }
            }
        );
    }
    catch (err) {
        return res.status(400).send({ error: 'Couldn´t delete Lesson' });
    }
});

// PUT - /lessons/id - atualização de todo objeto
router.put('/activity/:id', async (req, res) => {

    try{
        Activity.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { upsert: true },
            function (error) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json(req.body);
                    res.end();
                }
            }
        );
    }
    catch(err){
        return res.status(400).send({ error: 'Couldn´t put Lesson' });
    }
});

// PATCH - /lessons/id - atualização de alguns atributos do projeto
router.patch('/activity/:id', async (req, res) => {

    try{

        const { id, lessonId, name, description, grade, final_date, status } = req.body;

        let activityToChange;

        try{
            activityToChange = await Activity.findById(req.params.id);
        }
        catch(err){
            res.status(404).json({message: 'Activity not found'});
        }

        if(id){
            activityToChange.id = id;
        }

        if(lessonId){
            activityToChange.lessonId = lessonId;
        }

        if(name){
            activityToChange.name = name;
        }

        if(description){
            activityToChange.description = description;
        }

        if(grade){
            activityToChange.grade = grade;
        }

        if(final_date){
            activityToChange.final_date = final_date;
        }

        if(status){
            activityToChange.status = status;
        }

        try{
            await activityToChange.save();
            if(id || lessonId || name || description || grade || final_date || status){
                res.status(200).json(activityToChange);
            }
            else{
                res.status(404).json({message: 'Erro nos atributos'});
                res.end();
                return;
            }
        }
        catch(err){
            res.status(404).json({error: err.message});
            res.end();
            return;
        }
    }
    catch(err){
        res.status(404).json({message: 'Couldn´t patch Activity'});
        res.end();
        return;
    }
});

// GET - /resource - recupera todos objetos
router.get('/activity', async (req, res) => {

    try {
        const activity = Activity
            .find({})
            .lean()
            .exec(function (_, docs) {
                if (docs.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Activities not found."
                    })
                } else {
                    res.status(200).json(docs);
                }
                res.end();
            });

        console.log(activity);
    }
    catch (err) {
        return res.status(400).send({ error: 'Failed to get Activities' });
    }

});

// GET - /resource/id - recupera um obj pelo id
router.get('/activity/:id', async (req, res) => {

    try {
        Activity.findById(req.params.id).lean().exec(function(_, response){

            if(response){
                res.status(200).json(response);
            }
            else{
                res.status(404).json({
                    sucess: false,
                    message: 'Activity not found'
                })
            }
            res.end();

        });
    }
    catch(err){
        res.status(400).send({error: 'Activity to get Lessons by ID'});
        res.end();
        return; 
    }

});

module.exports = app => app.use('/auth', router);