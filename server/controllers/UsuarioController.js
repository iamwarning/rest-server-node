const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/Usuario');
const { verificarToken, verificarAdminRole } = require('../middlewares/Autenticacion');
const app = express();

// noinspection JSUnresolvedFunction
app.get('/usuarios', verificarToken, (req, resp) => {

    return resp.json({
        usuario: req.usuario
    });

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limitePorPagina = req.query.limitePorPagina || 5;
    limitePorPagina = Number(limitePorPagina);

    Usuario.find({ status: true })
        .skip(desde)
        .limit(limitePorPagina)
        .exec((err, usuarioData) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ status: true }, (err, totalUsuarios) => {
                resp.json({
                    ok:true,
                    usuarioData,
                    totalUsuarios
                })
            });


        });
});

// noinspection JSUnresolvedFunction
app.post('/usuario', [verificarToken, verificarAdminRole], (req, resp) => {

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
app.post('/usuario/:idUsuario', [verificarToken, verificarAdminRole], (req, resp) => {
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
app.post('/borrar/usuario/:idUsuario', [verificarToken, verificarAdminRole], (req, resp) => {
    let id = req.params.idUsuario;

    Usuario.findByIdAndRemove(id, (err, usuarioData) => {
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
                    message: 'Usuario no encontrado'
                }
            });
        }

        resp.json({
            ok: true,
            usuario: usuarioData
        })
    });
});

app.delete('/borrar/usuario/:idUsuario', (req, resp) => {
    let id = req.params.idUsuario;

    let eliminarUsuario = {
      status: false
    };

    Usuario.findByIdAndUpdate(id, eliminarUsuario, { new: true }, (err, usuarioData) => {
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
                    message: 'Usuario no encontrado'
                }
            });
        }

        resp.json({
            ok: true,
            usuario: usuarioData
        })
    });
});


module.exports = app;
