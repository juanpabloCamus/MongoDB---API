const notesRouter = require('express').Router();
const authMiddleware =  require('../authMiddleware.js')
const jwt = require('jsonwebtoken');
const Note = require('../models/Note.js');
const User = require('../models/User.js');

notesRouter.get('/', async (req, res) => {
    const {important} = req.query
    try {
        if(important !== undefined){
            const response = await Note.find({important:true}).populate('user',{
                username:1,
                name: 1
            });
            return res.send(response)
        }
        else{
            const response = await Note.find().populate('user',{
                username:1,
                name: 1
            })
            return res.send(response)
        }
    } catch (error) {
        console.error(error);
    }
})

notesRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(400).send('Missing data!');

        const note = await Note.findById(id);
        return res.send(note)

    } catch (error) {
        next(error)
    }
})

notesRouter.post('/', authMiddleware, async (req, res) => {
    try {
        const note = req.body;
        const { userId } = req;

        if(!note.content) return res.status(400).send("Missing data!");

        const user = await User.findById(userId);
        if (user === null) return res.status(400).send('You need to login to create a note')

        const newNote = new Note({
            content: note.content,
            date: new Date(),
            important: note.important || false,
            user:userId
        })

        const savedNote = await newNote.save();
        user.notes = user.notes.concat(savedNote._id);
        await user.save()
        
        return res.send(savedNote);

    } catch (error) {
        console.log(error);
    }
})

notesRouter.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const note = req.body;

        const newInfo = {
            content: note.content,
            important: note.important || false
        }

        const update = await Note.findByIdAndUpdate(id, newInfo, {new: true});
        if(update === null) return res.status(404).json({error: 'Note not found'});

        res.send(update)

    } catch (error) {
        next(error)
    }
})

notesRouter.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleted = await Note.findByIdAndRemove(id);
        if(deleted === null) return res.status(404).json({error: 'Note not found'})
        res.send(deleted)

    } catch (error) {
        next(error)
    }
})

module.exports = notesRouter;