const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');



module.exports = textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: '_BZv4r51Z0Ojgi1SftSgxc0bVWmsx6X_2-VJeNl0078R',
  }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/0e5dcc28-69b0-47ca-93cd-a4fa534c46f3',
  disableSslVerification: true,
});

