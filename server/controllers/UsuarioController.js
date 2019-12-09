const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
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
        password: bcrypt.hashSync(body.password, 10),
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
        });
    });
});


// noinspection JSUnresolvedFunction
app.post('/usuario/:idUsuario', (req, resp) => {
    let id = req.params.idUsuario;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'status']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true },(err, usuarioData) => {
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
});

// noinspection JSUnresolvedFunction
app.delete('/usuario', (req, resp) => {

});


module.exports = app;
