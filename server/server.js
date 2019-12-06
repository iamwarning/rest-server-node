require('./config/config');
const express = require('express');
const bodyParser =  require('body-parser');
const app = express();



// parse application/x-www-form-urlencoded
// noinspection JSUnresolvedFunction
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// noinspection JSUnresolvedFunction
app.use(bodyParser.json());

// noinspection JSUnresolvedFunction
app.get('/usuarios', function (req, resp) {
    console.info('Server corriendo');
    resp.json('Hola');
    resp.end();
});

app.post('/usuario', (req, resp) => {
    let body = req.body;


    if (body.nombre === undefined) {
        resp.status(400).json({
            ok: false,
            mensaje: 'Nombre obligatorio'
        });
    } else {
        resp.json({
            persona: body
        });

    }
});

app.listen(process.env.PORT, () => {
   console.info('Servidor corriendo sobre el puerto: ', 3000);
});
