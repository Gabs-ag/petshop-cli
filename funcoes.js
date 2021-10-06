const cachorros = require('./database/cachorros.json');
const fs = require('fs')

module.exports = {
    listar: function () {
        console.table(cachorros)
    },
    descrever: function (pos) {
        if (pos >= cachorros.length || pos < 0) {
            console.error("Cachorro inexistente")
            return;
        }

        let c = cachorros[pos]
        console.log(`Nome ${c.nome}`)
        console.log(`sexo ${c.sexo}`)
        console.log(`peso ${c.peso}`)
        console.log(`data de nascimento ${c.dataDeNascimento}`)
        console.log("vacinas: ")
        console.table(c.vacinas)
        console.log("serviços: ")
        console.table(c.servicos)

        if (c.castrado) {
            console.log("castrado: sim")
        } else {
            console.log("castrado: não")
        }
    },

    adicionar: function ($nome, $sexo, $castrado, $dataDeNascimento, $peso) {
        let dog = {
            nome: $nome,
            sexo: $sexo,
            dataDeNascimento: $dataDeNascimento,
            peso: $peso,
            castrado: $castrado,
            vacinas: [],
            servicos: []
        }
        cachorros.push(dog)
        fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros))
    },

    vacinar: function (pos, nomeDaVacina) {

        // Verificar se existe um cachorro na posição passada.
        if (pos >= cachorros.length || pos < 0) {
            console.log("Cachorro inexistente");
            return;
        }

        // Criar um objeto literal com as informações da vacina
        let novaVacina = {
            nome: nomeDaVacina,
            data: (new Date()).toISOString().substr(0, 10)
        }

        // Adicionar esse Objeto literal ao array de vacinas do cachorro
        cachorros[pos].vacinas.push(novaVacina);

        // Salvar o array de cachorros no arquivo
        fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros, null, 4));
    },

    //serviços
    atribuirServico(pos, $servico) {
        if (pos >= cachorros.length) {
            console.error('Animal Não Cadastrado')
            return
        }

        let servicos = {
            servico: $servico
        }

        cachorros[pos].servicos.push(servicos)
        fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros))
    },
    //remover
    remover(pos) {
        if (pos >= cachorros.length) {
            console.error('Animal Inexistente')
            return
        }

        delete cachorros[pos]
        fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros))
        console.log('Animal Deletado Com Sucesso')
    }

}





