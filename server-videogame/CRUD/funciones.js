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