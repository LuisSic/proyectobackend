let videogame = require('../data');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db;
var collection;
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true })
.then(client => {
  db = client.db('arcade');
  collection = db.collection('videogame');
}).catch(error => console.error(error));

module.exports = {
    listVideogame: function()
    {
        return collection.find({}).toArray();
    },
    SearchVideogame: function(id)
    {
        return collection.find({ _id: ObjectId(id) }).toArray();
        /*
        let videogame = videogames.filter(videogame => {
            return videogame.id == id;
        });

        return videogame;
        */
    },
    SaveVideogame: function(objVideogame)
    {
        return collection.insertOne(objVideogame);
        /*
        const videogame = {
            id: videogames.length + 1,
            Nombre_Juego: objVideogame.body.Nombre_Juego,
            Descripcion: objVideogame.body.Descripcion   
        }
        videogames.push(videogame);

        return videogame;
        */
    },

    UpdateVideogame: function(id, objVideogame)
    {
        return collection.updateOne({ _id: ObjectId(id) }, {$set: objVideogame});
        //return collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
        /*
        let videogame = videogames.filter(videogame => {
            return videogame.id == id;
        })[0];
        if(!videogame)
        {
            return videogame;
        }
        const index = videogames.indexOf(videogame);

        const keys = Object.keys(objVideogame.body);

        keys.forEach(key =>{
            videogame[key] = objVideogame.body[key]
        });

        videogames[index] = videogame;

        return videogames[index];
        */
    },
    DeleteVideogame: function(id)
    {
        return collection.deleteOne({ _id: ObjectId(id) });
        /*
        let videogame = videogames.filter(videogame => {
            return videogame.id == id;
        })[0];
        if(!videogame)
        {
            return false;
        }
        const index = videogames.indexOf(videogame);

        videogames.splice(index, 1);

        return true;
        */
    }
}; 