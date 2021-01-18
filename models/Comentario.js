module.exports = (sequelize, Sequelize) => {
        return sequelize.define('comentario', {
                id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                comentario: Sequelize.STRING(250),
        });
}       

