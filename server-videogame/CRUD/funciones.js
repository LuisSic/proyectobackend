let videogames = require('../data');
module.exports = {
    listVideogame: function()
    {
        return videogames;
    },
    SearchVideogame: function(id)
    {
        let videogame = videogames.filter(videogame => {
            return videogame.id == id;
        });

        return videogame;
    },
    SaveVideogame: function(objVideogame)
    {
        const videogame = {
            id: videogames.length + 1,
            Nombre_Juego: objVideogame.body.Nombre_Juego,
            Descripcion: objVideogame.body.Descripcion   
        }
        videogames.push(videogame);

        return videogame;
    },

    UpdateVideogame: function(id, objVideogame)
    {
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
    },
    DeleteVideogame: function(id)
    {
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
    }
}; 
    