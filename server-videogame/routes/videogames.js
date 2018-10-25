var express = require('express');
var router = express.Router();
var func = require('../CRUD/funciones');
var cors = require('cors');
var redis = require('redis');
var client = redis.createClient();

client.on('connect',function() {
  console.log('connected');
});
client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

router.use(cors());

//const Videogame = require('../data');

/* GET users listing. */

router.get('/all', function(req, res, next) {
  return client.get('allvideogames', (err, result) => {
    if(result) {
      console.log('GET result ->' + result);
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    else{
      func.listVideogame().then(response => {
        if (response.length > 0) {
          console.log('Put result ->' + JSON.stringify(response));
          client.setex('allvideogames', 5, JSON.stringify(response));
          return res.status(200).json(response);
        } else {
          return res.status(200).json(response);
        }
      }).catch(error => {
        console.log(error);
        return res.status(500).json({message:"Ohhh ha ocurrido un error al obtener los videojuegos!"});
      });
    }
  });
});

router.get('/search/:id', function(req, res, next) {
  return client.get(req.params.id, (err, result) => {
    if(result) {
      console.log('GET result ->' + result);
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    else{
      func.SearchVideogame(req.params.id).then(response => {
        if (response.length > 0) {
          console.log('Put result ->' + JSON.stringify(response));
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
