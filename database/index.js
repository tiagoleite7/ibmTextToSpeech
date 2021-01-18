const Sequelize = require ('sequelize');


const sequelize = new Sequelize('comentario','root','',{
    host:"localhost",
    dialect: 'mysql'
})

const Comentario = require('../models/Comentario')(sequelize,Sequelize)
sequelize.authenticate()
sequelize.sync()
module.exports.db = {Comentario}