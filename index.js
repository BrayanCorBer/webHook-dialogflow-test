const express = require('express')
const app = express()

const {WebhookClient} = require('dialogflow-fulfillment');

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/webhook', express.json() ,function (req, res) {

  const agent = new WebhookClient({ request: req, response: res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function webhookTest(agent) {
    agent.add(`estoy enviando esta respuesta desde el webhook`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('webhookTest', webhookTest);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
})



app.listen(3000,()=>{
    console.log('Estamos ejecutando el servidor en el puerto 3000');
})