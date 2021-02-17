const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const chaveIBM = process.env.IBM_API_KEY
const urlAPI_IBM = process.env.IBM_SERVICE_URL



module.exports = textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: chaveIBM,
  }),
  serviceUrl: urlAPI_IBM,
  disableSslVerification: true,
});

