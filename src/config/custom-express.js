
require("marko/node-require").install()
require("marko/express")
const methodOverride = require('method-override');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//middlewares
app.use('/estatico', express.static('src/app/public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
//middewares
const rotas = require('../app/rotas/rotas.js')


module.exports = app;