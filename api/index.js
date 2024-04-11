console.log('My app');

const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorsHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Middleware

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.listen(port, () => {
  console.log('My port ' + port);
});

routerApi(app);

//Delicadeza al colocar el orden de los middlewares, no se ejecutan en el orden que se especifiquen, sino que se ejecutan en el orden en que se declaran.
app.use(logErrors);
app.use(boomErrorHandler); //Este es el ultimo middleware, por lo tanto se ejecuta siempre. Si no se coloca, no se ejecuta. Si se coloca despues de logErrors, no se ejecuta. Si se colo
app.use(errorHandler);
