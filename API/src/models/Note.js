const { Schema, model } = require('mongoose');

//Crear Schema, recordar que estos schemas son a nivel aplicacion y no a nivel base de datos
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Crear modelo, poner nombre en singular
const Note = model('Note', noteSchema);

module.exports = Note