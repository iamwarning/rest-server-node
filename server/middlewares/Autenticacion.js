const jwt = require('jsonwebtoken');


/**
 * Verificar token
 * **/

let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEMILLA, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario;
        next();
        });
};

/**
 * Verificar que el rol de ADMIN pueda crear usuarios
 * **/

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuarioData;
    console.log(usuario)
    if (usuario.rol === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
};


module.exports = {
    verificarToken,
    verificarAdminRole
};
