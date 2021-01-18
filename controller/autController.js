const express = require('express')
const { db } = require('../database/index')
const { criaMensagem, criarAudio } = require('../ibm/ibmSynthesize')
const router = express.Router()

router.post('/incluir', async (req, res) => {
    try {
        const body = await req.body
        const createdComent = await db.Comentario.create(body)
        const synthesizeParams = await criaMensagem(body.comentario)
        const createdAudio = await criarAudio(synthesizeParams, createdComent.id)
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
        synthesizeParams = await criaMensagem(body.comentario)
        await criarAudio(synthesizeParams,body.nomeArquivo)
        return res.status(200).send('Audio criado Corretamente')
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