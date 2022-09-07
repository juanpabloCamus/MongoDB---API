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
    try {
        const response = await Note.find()
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})

app.post('note', async (req, res) => {
    try {
        const note = req.body;
        if(!note.content) return res.status(400).send("Missing data!");

        const newNote = new Note({
            content: note.content,
            date: new Date(),
            important: note.important || false
        })
        await newNote.save();
        res.send(newNote)

    } catch (error) {
        console.log(error);
    }
})