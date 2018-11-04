let videogame = require('../data');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var Joi = require('joi');
var db;
var collection;
MongoClient.connect("mongodb://hostmongo:27017", { useNewUrlParser: true })
//MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true })
.then(client => {
  db = client.db('arcade');
  collection = db.collection('videogame');
}).catch(error => console.error(error));
const schemaUpdate = {
    body: {
        titulo_juego: Joi.string().required(),
        plataforma: Joi.string().required(),
        edicion: Joi.string().required(),
        descripcion: Joi.string().required(),
        desarrolladora: Joi.string().required(),
        clasificacion: Joi.string().required(),
        url_imagen: Joi.string().required()
    },
    params: {
        id: Joi.string().alphanum().min(24).max(24).required()
    }
  }
  const schemaId = {
    params: {
        id: Joi.string().alphanum().min(24).max(24).required()
    }
  }
 const schemaPost = {
    body: {
        titulo_juego: Joi.string().required(),
        plataforma: Joi.string().required(),
        edicion: Joi.string().required(),
        descripcion: Joi.string().required(),
        desarrolladora: Joi.string().required(),
        clasificacion: Joi.string().required(),
        url_imagen: Joi.string().required()
    }
  }
  
module.exports = {
    schemaPost,
    schemaId,
    schemaUpdate,
    listVideogame: function()
    {
        return collection.find({}).toArray();
    },
    SearchVideogame: function(id)
    {
        return collection.find({ _id: ObjectId(id) }).toArray();
    },
    SaveVideogame: function(objVideogame)
    {
        return collection.insertOne(objVideogame);
    },

    UpdateVideogame: function(id, objVideogame)
    {
        return collection.updateOne({ _id: ObjectId(id) }, {$set: objVideogame});
    },
    DeleteVideogame: function(id)
    {
        return collection.deleteOne({ _id: ObjectId(id) });
    }
}; 