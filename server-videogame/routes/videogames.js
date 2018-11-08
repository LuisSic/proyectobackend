var express = require('express');
var router = express.Router();
var func = require('../CRUD/funciones');
//const Videogame = require('../data');

/* GET users listing. */

router.get('/all', function(req, res, next) {
  func.listVideogame().then(response => {
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({message:"Ohhh ha ocurrido un error al obtener los videojuegos!"});
    }
  }).catch(error => console.error(error));
});

router.get('/search/:id', function(req, res, next) {
  //const requestId = req.params.id;
  func.SearchVideogame(req.params.id).then(response => {
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({message:"No se encontro el videojuego solicitado"});
    }
  }).catch(error => console.error(error));
});

router.post('/SaveVideogame', async (req, res, next) => {
  //res.setHeader('Content-Type', 'application/json');
	if (req.headers["content-type"] == 'application/json') {
    func.SaveVideogame(req.body).then(response => {
			if (response.result.n > 0) {
				res.status(201).send();
			} else {
				res.status(404).json({message:"No se pudo guardar el videojuego"});
			}
		}).catch(error => console.error(error));
	} else {
		res.status(404).json({message:"No se pudo guardar el videojuego"});
	}
});

router.put('/:id', function(req, res, next) {
  //res.setHeader('Content-Type', 'application/json');
	func.UpdateVideogame(req.params.id, req.body).then(response => {
		if (response.result.nModified) {
			res.status(204).send();
		} else {
			res.status(404).json({message:"No se encontro el videojuego"});
		}
	}).catch(error => console.error(error));
});

router.delete('/:id', function(req, res, next){
  //res.setHeader('Content-Type', 'application/json');
	func.DeleteVideogame(req.params.id).then(response => {
		if (response.result.n > 0) {
			res.status(204).send();
		} else {
			res.status(404).json({message:"No se encontro el videojuego"});
		}
	}).catch(error => console.error(error));
});

module.exports = router;
