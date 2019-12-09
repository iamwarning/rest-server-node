const express = require('express');
const Usuario = require('../models/Usuario');
const app = express();

// noinspection JSUnresolvedFunction
app.get('/usuarios', function (req, resp) {
    console.info('Server corriendo');
    resp.json('Hola');
    resp.end();
});

// noinspection JSUnresolvedFunction
app.post('/usuario', (req, resp) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        rol: body.role
    });

    usuario.save((err, usuarioData) => {
        if (err) {
           return resp.status(400).json({
                ok: false,
                err
            });
        }
        resp.json({
            ok: true,
            usuario: usuarioData
        })
    });
    // if (body.nombre === undefined) {
    //     resp.status(400).json({
    //         ok: false,
    //         mensaje: 'Nombre obligatorio'
    //     });
    // } else {
    //     resp.json({
    //         persona: body
    //     });
    //
    // }
});


// noinspection JSUnresolvedFunction
app.delete('/usuario', (req, resp) => {

});


module.exports = app;
