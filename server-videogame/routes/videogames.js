var express = require('express');
var router = express.Router();
var func = require('../CRUD/funciones');
var cors = require('cors');
router.use(cors());
//const Videogame = require('../data');

/* GET users listing. */

router.get('/all', function(req, res, next) {
  func.listVideogame().then(response => {
		res.status(200).json(response);
		/*
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
			console.log(response.length);
			res.status(200).json(response);
		}
		*/
  }).catch(error => {
		console.log(error);
		res.status(500).json({message:"Ohhh ha ocurrido un error al obtener los videojuegos!"});
	});
});

router.get('/search/:id', function(req, res, next) {
  func.SearchVideogame(req.params.id).then(response => {
    if (response.length > 0) {
      res.status(200).json(response)
    } else {
      res.status(404).json({message:"No se encontro el videojuego solicitado"});
    }
  }).catch(error => {
		console.log(error);
		res.status(500).json({errmessage:"Ohhh ha ocurrido un error en el servidor"});
	});
});

router.post('/SaveVideogame', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
	if (req.headers["content-type"] == 'application/json') {
    func.SaveVideogame(req.body).then(response => {
			if (response.result.ok) {
				res.status(201).send();
			} else {
				res.status(404).json({message:"No se pudo guardar el videojuego"});
			}
		}).catch(error => {
			console.log(error);
			res.status(500).json({message:"Ohhh ha ocurrido un error en el servidor"});
		});
	} else {
		res.status(404).json({message:"No se pudo guardar el videojuego"});
	}
});

router.put('/:id', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	func.UpdateVideogame(req.params.id, req.body).then(response => {
		if (response.result.ok) {
			res.status(204).send();
		} else {
			res.status(404).json({message:"No se encontro el videojuego"});
		}
	}).catch(error => {
		console.log(error);
			res.status(500).json({message:"Ohhh ha ocurrido un error en el servidor"})
	});
});

router.delete('/:id', function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
	func.DeleteVideogame(req.params.id).then(response => {
		if (response.result.ok) {
			res.status(204).send();
		} else {
			res.status(404).json({message:"No se encontro el videojuego"});
		}
	}).catch(error => {
		 console.log(error);
		 res.status(500).json({message:"Ohhh ha ocurrido un error en el servidor"})
	});
});

module.exports = router;
