
var express = require('express');
var router = express.Router();
var func = require('../CRUD/funciones');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let videogames = func.listVideogame();
  if(!videogames)
  {
    res.status(404).json({message:"No se encontraron datos"});
    //res.json({codigo:404 , message:"No se encontraron datos", data: ""});
  }
  res.status(200).json(videogames);
  //res.json({codigo: 200, message:"Lista de videojuegos", data: JSON.stringify(videogames)});
});

router.get('/:id', function(req, res, next) {
  const requestId = req.params.id;
  let videogame = func.SearchVideogame(requestId);
  if(videogame.length == 0)
  {
    res.status(404).json({message:"No se encontro el videojuego solicitado"});
    //res.json({codigo:404 , message:"No se encontro el videojuego solicitado", data: ""});
  }
  res.status(200).json(videogame);
  //res.json({codigo: 200, message:"Juego encontrado", data: JSON.stringify(videogame)});
});

router.post('/SaveVideogame', function(req, res, next){
  console.log(req);
  let SaveVideogame = func.SaveVideogame(req);
  if(!SaveVideogame)
  {
    res.status(404).json({message:"No se pudo guardar el videojuego"});
    //res.json({codigo:404 , message:"No se pudo guardar el videojuego", data: ""});
  }
  res.status(201).send();
  //res.json({codigo: 201, message:"Juego guardado exitosamente", data: JSON.stringify(SaveVideogame)});
});

router.put('/:id', function(req, res, next) {
  const requestId = req.params.id;
  let videogame = func.UpdateVideogame(requestId, req);
  if(!videogame)
  {
    res.status(404).json({message:"No se encontro el videojuego"});
    //res.json({codigo:404 , message:"No se encontro el videojuego", data: ""});
  }
  res.status(204).send();
  //res.json({codigo: 204, message:"Juego Actualizado exitosamente", data: JSON.stringify(videogame)});
});

router.delete('/:id', function(req, res, next){
  const requestId = req.params.id;
  let videogame = func.DeleteVideogame(requestId);
  if(!videogame)
  {
    res.status(404).json({message:"No se encontro el videojuego"});
    //res.json({codigo:404 , message:"No se encontro el videojuego", data: ""});
  }
  res.status(204).send();
  //res.json({codigo: 204, message:"videojuego eliminado exitosamente: "+requestId, data:""});
});

module.exports = router;
