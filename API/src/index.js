require('dotenv').config()
require('./mongo.js')

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes');
const loginRouter = require('./controllers/login');

app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);

app.use((error, req, res, next) => {
    console.error(error);
    if (error.name === 'CastError'){
        return res.status(400).json({error:'Invalid ID'}).end()
    } else {
        return res.status(500).end()
    }
})

app.use((req, res, next) => {
    res.status(404).end()
})

app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})