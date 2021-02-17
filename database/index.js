const Sequelize = require ('sequelize');
const usuarioDB = process.env.USUARIO_DB
const senhaDB = process.env.SENHA_DB

const sequelize = new Sequelize('comentario',usuarioDB,senhaDB,{
    host:"localhost",
    dialect: 'mysql'
})

const Comentario = require('../models/Comentario')(sequelize,Sequelize)
sequelize.authenticate()
sequelize.sync()
module.exports.db = {Comentario}