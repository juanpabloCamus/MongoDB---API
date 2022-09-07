const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://juan:123@cluster0.a2o1jmf.mongodb.net/app?retryWrites=true&w=majority'

//Conexion a Mongo
mongoose.connect(connectionString)
    .then(() => {console.log('Database connected!')})
    .catch((e) => {console.error(e)})
;


//Crear nota
// const note = new Note({
//     content:'MongoDB es increible!',
//     date: new Date(),
//     important: true
// })

//Guardar nota
// note.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(e => console.error(e))
// ;

//Note.find({}).then(r => console.log(r))