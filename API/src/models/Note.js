const { Schema, model } = require('mongoose');

//Crear Schema, recordar que estos schemas son a nivel aplicacion y no a nivel base de datos
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

//Crear modelo, poner nombre en singular
const Note = model('Note', noteSchema);

module.exports = Note