const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideogameSchema = new Schema({
    titulo_juego: String,
    plataforma: String,
    edicion: String,
    descripcion: String,
    desarrolladora: String,
    clasificacion: String,
    url_imagen: String
});

module.exports = mongoose.model('videogame',VideogameSchema);

/*
const data = [
    {
        "id": 1,
        "Nombre_Juego": "Star wars",
        "Descripcion": "Prueba de objetos"
    },
    {
        "id": 2,
        "Nombre_Juego": "Battlefield",
        "Descripcion": "Prueba de objetos"
    }
]
*/