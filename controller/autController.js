const express = require('express')
const { db } = require('../database/index')
const { criaMensagem, criarAudio } = require('../ibm/ibmSynthesize')
const router = express.Router()
const fs = require("fs")

router.post('/incluir', async (req, res) => {
    try {
        const body = await req.body
        const createdComent = await db.Comentario.create(body)
        res.status(200).send({
            id: createdComent.id,
            mensagem: createdComent.comentario
        })
    } catch (erro) {
        console.log(erro)
        return res.status(400).send('Erro é:' + erro)
    }
})

router.post('/criarAudio', async (req, res) => {
    try {
        const body = req.body
        fs.stat (`audio/${body.nomeArquivo}.wav`,async (error, stats)=>{
            if(error){
                synthesizeParams = await criaMensagem(body.comentario)
                await criarAudio(synthesizeParams,body.nomeArquivo)
                return res.status(200).send('Audio criado Corretamente')
            }
            else{
                return res.status(200).send('O Arquivo já existe')
            }
        })

    } catch (erro) {
        return res.status(400).send(`O Erro é: ${erro}`)
    }
})


router.get('/listar', async (req, res) => {
    try {
        await db.Comentario.findAll({ attributes: ['id','comentario'] }).then(function (comentarios) {
            res.status(200).send(comentarios)
        })
    } catch (erro) {
        return res.status(400).send('Erro é:' + erro)
    }
})

module.exports = app => app.use('/comentario', router)