const db = require('../database/models');

const moviesController = {
    list: (req, res) => {
        db.Peliculas.findAll()
        .then((movies) => res.render ('moviesList', { movies })
        )},
    detalle: (req, res) => {
            db.Peliculas.findByPk(req.params.id, {
                include: ["genero","actores"]
            })
            .then((movie)=>{
                res.render('moviesDetail', { movie })
            })
        },
    new: (req, res) => {
        db.Peliculas.findAll({
            order: [
                ['title', 'DESC']
            ]
        }) 
        .then((movies)=>{
            res.render('newestMovies', { movies })
        })
    },
    recomended: (req, res) => {
        db.Peliculas.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
        .then((movies)=>{
            res.render('recommendedMovies', { movies })
        })
    },
    add:(req, res) => {
        db.Generos.findAll()
        .then((genres)=>{
            res.render ('movieAdd', { genres })
        })
        
    },
    create: (req, res) => {
        db.Peliculas.create({
           title: req.body.title,
           rating: req.body.rating,
           awards: req.body.awards,
           genre_id: req.body.genre_id,
           release_date: req.body.release_date,
           length: req.body.length,
        })
        .then((movies) => {
            res.redirect('/movies', { movies }) 
        })
        .catch(err => console.log (err));
    },
    edit: (req, res) => {
        let pedidoPelis = db.Peliculas.findByPk(req.params.id);
        let pedidoGenres = db.Generos.findAll();

        Promise.all([pedidoPelis, pedidoGenres])
            .then(function([movie , generos]){
                res.render('moviesEdit', { movie, generos })
        })
    },
    update: (req,res)=>{
        db.Peliculas.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genero,
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then((movies)=>{
            res.redirect ('/movies')
        })
    },
    destroy: (req, res) => {
        db.Peliculas.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((movies)=>{
            res.redirect('/movies')
        })
    }
    }

module.exports = moviesController