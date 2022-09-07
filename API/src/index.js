require('dotenv').config()
require('./mongo.js')

const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/Note.js')

app.use(cors());
app.use(express.json())

app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})

app.get('/notes', async (req, res) => {
    const {important} = req.query
    try {
        if(important !== undefined){
            const response = await Note.find({important:true});
            return res.send(response)
        }
        else{
            const response = await Note.find()
            return res.send(response)
        }
    } catch (error) {
        console.error(error);
    }
})

app.get('/note/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(400).send('Missing data!');

        const note = await Note.findById(id);
        return res.send(note)

    } catch (error) {
        next(error)
    }
})

app.post('/note', async (req, res) => {
    try {
        const note = req.body;
        if(!note.content) return res.status(400).send("Missing data!");

        const newNote = new Note({
            content: note.content,
            date: new Date(),
            important: note.important || false
        })
        await newNote.save();
        return res.send(newNote)

    } catch (error) {
        console.log(error);
    }
})

app.use((error, req, res, next) => {
    console.error(error);

    if (error.name === 'CastError'){
        return res.status(400).send('Invalid ID').end()
    } else {
        return res.status(500).end()
    }
})