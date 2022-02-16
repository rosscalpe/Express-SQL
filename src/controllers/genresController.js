const db = require('../database/models');

const genresController = {
    list: (req, res) => {
        db.Generos.findAll()
        .then((genres) => res.render ('genresList', { genres })
        )},
    detail: (req,res) => {
        db.Generos.findByPk(req.params.id)
        .then ((genre)=>{
            res.render ('genresDetail', { genre })
        })
    }
}
    
module.exports = genresController