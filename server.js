const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const configExpress = () => {

  app.server = http.createServer(app);

  app.use(bodyParser.json({
    limit: '2000kb',
  }));

  app.server.listen(3000, () => {
    console.log('server listening in port 3000');
  });

  app.get('/', function (req, res) {
    res.json({ health: 'UP' });
  })

  app.get('/busy-wait/:time', async (req, res) => {
    var time = req.params.time;
    busyWait(time);
    res.statusText = 'Request completed'
    return res.status(200).send('Ok')
  });

};

function busyWait(time) {
  var start = new Date();
  var now;
  while (true) {
      now = new Date();
      if (now - start >= time) {
          break;
      }
  }
}



configExpress()

