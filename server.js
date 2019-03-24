const app = require('./src/config/custom-express.js')
const rotas = require('../app/rotas/rotas.js')
rotas(app)

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
    
})