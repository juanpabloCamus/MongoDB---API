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