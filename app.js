/*****************************************************************************************
* Data: 04/12/2024
* Autor: Andrei Fiuza
* Versão: 1.0
 *****************************************************************************************/
/*
    Para criar uma API devemos instalar:
        express         npm install express --save          - Serve para criar uma API
        cors            npm install cors --save             - Serve para configurar as permissoes do header
        body-parser     npm install body-parser --save      - Serve para manipular os dados de entrada na API pelo body     
                        
*/

// Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Inicializando o Express
const app = express()


app.use(cors())


app.use(bodyParser.json())


const funcoes = require('./modulo/funcoes.js')


app.get('/v1/lion-school/cursos', cors(), async function (request, response) {
     
    let cursos = request.params.cursos
        

    let dados = funcoes.getListaCursos(cursos)

        if (dados && dados.length > 0) {
            
            response.status(200).json(dados)
        } else {
            
            response.status(404).json({ message: "Nenhum curso encontrado." })
        }
    
        
        console.error(error)
        response.status(500).json({ message: "Erro interno no servidor." })
    
})


app.get('/v1/lion-school/alunos', cors(), async function (request, response) {
    
        
        let alunos = request.params.alunos
        
    
        let dados = funcoes.getListaAlunos(alunos)

        if (dados && dados.length > 0) {
            
            response.status(200).json(dados)
        } else {
            
            response.status(404).json({ message: "Nenhum curso encontrado." })
        }
    
        
        console.error(error)
        response.status(500).json({ message: "Erro interno no servidor." })
    
})


app.get('/v1/lion-school/alunos/:matricula', cors(), function (request, response) {
    let matricula = request.params.matricula

    
    let dados = funcoes.getMatriculaAlunos(matricula)

    
    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ message: "Aluno não encontrado." })
    }
})


app.get('/v1/lion-school/alunos/cursos/:curso', cors(), function (request, response) {
    let alunosCurso = request.params.curso

    let dados = funcoes.getSiglaDoCurso(alunosCurso)
    
    
    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ message: "Alunos e Curso não encontrados." })
    }
})


app.get('/v1/lion-school/alunos/status/:status', cors(), function (request, response) {
    let alunosStatus = request.params.status
    
    let dados = funcoes.getStatusAlunos(alunosStatus)
    
    
    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ message: "Não foi possível encontrar esse alunos com esse status." })
    }
})


app.get('/v1/lion-school/alunos/status/:status', cors(), function (request, response) {
    let alunosStatusDisciplina = request.params.status
    
    let dados = funcoes.getAlunosPorCurso(alunosStatusDisciplina)
    
    
    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ message: "Não foi possível encontrar esse alunos com esse status." })
    }
})


app.get('/v1/lion-school/alunos/anoConclusao/teste', cors(), function (request, response) {

    let alunosConclusao = request.body.conclusao
    
    let alunosSiglaConclusao = request.body.sigla
    
    let dados = funcoes.getAlunosCursoPorAno(alunosSiglaConclusao,alunosConclusao)
    
    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ message: "Não foi possível encontrar um aluno por essa data." })
    }
})




const PORT = 8080
app.listen(PORT, () => {
    console.log('API funcionando e aguardando requisições...')
})