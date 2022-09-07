const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_URI

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