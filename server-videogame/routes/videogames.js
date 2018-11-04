var express = require('express');
var router = express.Router();
var func = require('../CRUD/funciones');
var redis = require('redis');
var expressJoi = require('express-joi-validator');
var client = redis.createClient(6379,'hostredis');
//var client = redis.createClient();
client.on('connect',function() {
  console.log('connected');
});
client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});


router.get('/all',function(req, res, next) {
  return client.get('allvideogames', (err, result) => {
    if(result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    else{
      func.listVideogame().then(response => {
        if (response.length > 0) {
          client.setex('allvideogames', 5, JSON.stringify(response));
          return res.status(200).json(response);
        } else {
          return res.status(404).json({message:"No hay datos en la base de datos"});
        }
      }).catch(error => {
        console.log(error);
        return res.status(500).json({message:"Ohhh ha ocurrido un error al obtener los videojuegos!"});
      });
    }
  });
});

router.get('/search/:id', expressJoi(func.schemaId),function(req, res, next) {
  return client.get(req.params.id, (err, result) => {
    if(result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    else{
      func.SearchVideogame(req.params.id).then(response => {
        if (response.length > 0) {
          client.setex(req.params.id, 5, JSON.stringify(response));
          return res.status(200).json(response);
        } else {
          return res.status(404).json({message:"No se encontro el videojuego solicitado"});
        }
      }).catch(error => {
        console.log(error);
        return res.status(500).json({errmessage:"Ohhh ha ocurrido un error en el servidor"});
      });
    }
  });
});

router.post('/SaveVideogame', expressJoi(func.schemaPost),function (req, res, next) {
	if (req.headers["content-type"] == 'application/json') {
    func.SaveVideogame(req.body).then(response => {
			if (response.result.n > 0) {
				res.status(201).send();
			} else {
				res.status(404).json({message:"No se pudo guardar el videojuego"});
			}
		}).catch(error => {
			console.log(error);
			res.status(500).json({message:"Ohhh ha ocurrido un error en el servidor"});
		});
	} else {
		res.status(404).json({message:"No se pudo guardar la orden"});
	}
});

router.put('/:id', expressJoi(func.schemaUpdate),function(req, res, next) {
	func.UpdateVideogame(req.params.id, req.body).then(response => {
    if (response.result.nModified) {
			res.status(204).send();
		} else {
			res.status(404).json({message:"No se encontro el videojuego"});
		}
	}).catch(error => {
		console.log(error);
			res.status(500).json({message:"Ohhh ha ocurrido un error en el servidor"})
	});
});

router.delete('/:id', expressJoi(func.schemaId),function(req, res, next){
	func.DeleteVideogame(req.params.id).then(response => {
		if (response.result.n > 0) {
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
