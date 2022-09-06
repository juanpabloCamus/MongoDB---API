const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

let notes = []

app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})