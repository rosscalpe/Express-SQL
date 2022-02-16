module.exports = (sequelize, dataTypes) => {
    const alias= "Generos"
    const columns = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        }
    }
    const config = {
        tableName: 'genres',
        timestamps: false
    }
    const Genre = sequelize.define( alias, columns, config)

    Genre.associate = (models) => {
        Genre.hasMany(models.Peliculas, {
            as: 'peliculas',
            foreignKey: 'genre_id'
        })
    }
    return Genre 
}