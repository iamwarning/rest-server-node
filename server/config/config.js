/**
 * Configurar puerto en modo desarrollo o producción
 *
 * **/
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 * **/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Configuración de la URL de MongoDB
 * **/
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://<usuario>:<password>@cluster0-bqkzb.mongodb.net/cafe';
}

/**
 * Vencimiento del Token
 * **/
process.env.CADUCIDAD_TOKEN =  60 * 60 * 24 * 30;

/**
 * Semilla para el Token
 * **/

process.env.SEMILLA = process.env.SEMILLA  ||'Jasajsbewqjjk';

process.env.URLDB = urlDB;
