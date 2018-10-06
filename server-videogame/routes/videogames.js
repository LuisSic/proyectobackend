
var express = require('express');
var router = express.Router();
var func = require('../CRUD/funciones');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let videogames = func.listVideogame();
  if(!videogames)
  {
    res.json({codigo:404 , message:"No se encontraron datos", data: ""});
  }
  res.json({codigo: 200, message:"Lista de videojuegos", data: JSON.stringify(videogames)});
});

router.get('/:id', function(req, res, next) {
  const requestId = req.params.id;
  let videogame = func.SearchVideogame(requestId);
  if(videogame.length == 0)
  {
    res.json({codigo:404 , message:"No se encontro el videojuego solicitado", data: ""});
  }
  res.json({codigo: 200, message:"Juego encontrado", data: JSON.stringify(videogame)});
});

router.post('/SaveVideogame', function(req, res, next){
  let SaveVideogame = func.SaveVideogame(req);
  if(!SaveVideogame)
  {
    res.json({codigo:404 , message:"No se pudo guardar el videojuego", data: ""});
  }
  res.json({codigo: 201, message:"Juego guardado exitosamente", data: JSON.stringify(SaveVideogame)});
});

router.put('/:id', function(req, res, next) {
  const requestId = req.params.id;
  let videogame = func.UpdateVideogame(requestId, req);
  if(!videogame)
  {
    res.json({codigo:404 , message:"No se encontro el videojuego", data: ""});
  }
  res.json({codigo: 204, message:"Juego Actualizado exitosamente", data: JSON.stringify(videogame)});
});

router.delete('/:id', function(req, res, next){
  const requestId = req.params.id;
  let videogame = func.DeleteVideogame(requestId);
  if(!videogame)
  {
    res.json({codigo:404 , message:"No se encontro el videojuego", data: ""});
  }
  res.json({codigo: 204, message:"videojuego eliminado exitosamente: "+requestId, data:""});
});

module.exports = router;
