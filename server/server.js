require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const IndexController = require('./controllers/IndexController');
const app = express();



// parse application/x-www-form-urlencoded
// noinspection JSUnresolvedFunction
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// noinspection JSUnresolvedFunction
app.use(bodyParser.json());

app.use(IndexController);

 mongoose.connect(process.env.URLDB, { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})
    .then(success => {
        console.info('Conexión exitosa');

    })
    .catch(err => {
        console.error('Error => ', err);
    });







app.listen(process.env.PORT, () => {
   console.info('Servidor corriendo sobre el puerto: ', process.env.PORT);
});
