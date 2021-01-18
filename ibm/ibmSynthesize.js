const textToSpeech = require('./ibmAuthenticate')
const fs = require('fs');

module.exports.criaMensagem = async (mensagem) => {
    var synthesizeParams = {
        text: mensagem,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaVoice',
    };
    return synthesizeParams
}

module.exports.criarAudio = async (synthesizeParams,nomeArquivo) => {
    textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
            fs.writeFileSync(`audio/${nomeArquivo}.wav`, buffer);
        })
        .catch(err => {
            console.log('error:', err);
        });
}
