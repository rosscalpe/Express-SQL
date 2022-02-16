module.exports = (Sequelize, DataTypes) => {
    const alias = "Actors";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.STRING

        },
        last_name: {
            type: DataTypes.STRING
        },
        rating:{
            type: DataTypes.DECIMAL
        }
    }
    const config = {
        tableName: "actors",
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
    const Actor = Sequelize.define(alias, cols, config)

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Peliculas, {
            as: 'peliculas',
            through: 'actor_movie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        })
    }

return Actor;
}