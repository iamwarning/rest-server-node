const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const app = express();


app.post('/login', (req, resp) => {

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioData) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioData) {
            return resp.status(404).json({
                ok: false,
                err: {
                    message: 'El correo no se encuentra registrado'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioData.password)) {
            return resp.status(404).json({
                ok: false,
                err: {
                    message: 'Credenciales incorrectas'
                }
            });
        }

        let token = jwt.sign({
            usuarioData,
        }, 'Jasajsbewqjjk', { expiresIn: process.env.CADUCIDAD_TOKEN });

        resp.json({
            ok: true,
            usuarioData,
            token
        })
    });

});

module.exports = app;
