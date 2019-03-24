class LivroDao {
    constructor(db) {
        this._db = db
    }

    lista(){
        return new Promise((resolve, reject) => {

            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros')
                    return resolve(resultados)
                }
            )
        })
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {

            this._db.run(
                `INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                erro => {
                    if (erro) {
                        console.log(erro);
                        reject('Não foi possível listar os livros')
                    }

                    resolve()
                }
            )
        })
    }
}

module.exports = LivroDao