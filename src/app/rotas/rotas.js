const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')

module.exports = (app) => {

    app.get('/', (req, resp) => {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Casa do Código</h1>
                </body>
            </html>
        `)
    })
    
    app.get('/livros', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'), {
                    livros
                }
            ))
            .catch(erro => console.log(erro))
    })

    app.get('/livros/form', (req, resp) => {
        resp.marko(
            require('../views/livros/form/form.marko', {
                livro: {}
            })
        )
    })

    app.post('/livros', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro))
    })

    app.delete('/livros/:id', function (req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));

    });

    app.get('/livros/form/:id', function (req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'), {
                        livro: livro
                    }
                )
            )
            .catch(erro => console.log(erro));

    });
}