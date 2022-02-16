module.exports = (sequelize, DataTypes) => {
    const alias = 'Peliculas'
    const columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER
        },
        length: {
            type: DataTypes.INTEGER
        },
        awards: {
            type: DataTypes.INTEGER,
        },
        genre_id: {
            type: DataTypes.INTEGER
        },
        release_date: {
            type: DataTypes.DATE
        }
    }
    const config = {
        tableName: 'movies',
        timestamps: false
    }
    const Movie = sequelize.define(alias, columns, config);

    Movie.associate = (models) => {
        Movie.belongsTo(models.Generos, {
            as: 'genero',
            foreignKey: 'genre_id'
        })
        Movie.belongsToMany(models.Actors, {
            as: 'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })

    }

    return Movie
}