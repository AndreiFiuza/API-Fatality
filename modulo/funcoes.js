/*******************************************************
 Autor: Andrei Fiuza
 Data: 27/11/2024
********************************************************/

var ListaAlunos = require('./alunos')
var ListaCursos = require('./cursos')

const getListaCursos = function(){
    let cursos = []
    let status = false
 
     ListaCursos.cursos.forEach(function(item){
         status = true
         cursos.push(item)
     })
     if(status == true){
         return cursos
     }else{
         return status
     }
 }
 
 const getListaAlunos = function(){
     let alunos = []
     let status = false
 
     ListaAlunos.alunos.forEach(function(item){
         status = true
         alunos.push(item)
     })
     if(status == true){
         return alunos
     }else{
         return status
     }
 }
 
 const getMatriculaAlunos = function(numeroMatricula){
     let ListaAluno = ListaAlunos
     let matricula = Number(numeroMatricula)
     let aluno = []
 
     ListaAluno.alunos.forEach(function(item){
         if(Number(item.matricula) == matricula){
             let informacao = {}
             informacao.nome = item.nome
             informacao.matricula = item.matricula
             informacao.foto = item.foto
             informacao.sexo = item.sexo
             informacao.curso = item.curso
             informacao.status = item.status
 
         aluno.push(informacao)
             
         }
     })
     return aluno

 
 
 
 }

const getSiglaDoCurso = function (siglaCurso) {
    let requisicao = String(siglaCurso).toUpperCase()
    let status = false
    let lista = ListaAlunos.alunos
    let resultado = []
    

    lista.forEach(function (item) {
        item.curso.forEach(function (cursoItem) {
            if (cursoItem.sigla === requisicao) {
                status = true
                resultado.push({ nome: item.nome, sexo: item.sexo })
            }
        })
    })

    if (status === true) {
        return resultado
    } else {
        return status
    }

}

const getStatusAlunos = function () {
    let alunosFiltrados = []

    ListaAlunos.alunos.forEach(function (aluno) {
        if (aluno.status === "Cursando" || aluno.status === "Finalizado") {
            alunosFiltrados.push({
                nome: aluno.nome,
                status: aluno.status
            })
        }
    })

    return alunosFiltrados
}

const getAlunosPorCurso = function (sigladocurso) {
    
    let requisicao = String(sigladocurso).toUpperCase()
    let resultado = []

    
    ListaAlunos.alunos.forEach(function (aluno) {
        
        if (Array.isArray(aluno.curso)) {
            aluno.curso.forEach(function (curso) {
                
                if (curso.sigla === requisicao) {
                    
                    let disciplinasPorStatus = {
                        Aprovado: [],
                        Reprovado: [],
                        Exame: []
                    }

                    
                    if (Array.isArray(curso.disciplinas)) {
                        curso.disciplinas.forEach(function (disciplina) {
                            
                            if (disciplina.status === "Aprovado") {
                                disciplinasPorStatus.Aprovado.push({
                                    nome: disciplina.nome,
                                    status: disciplina.status
                                });
                            } else if (disciplina.status === "Reprovado") {
                                disciplinasPorStatus.Reprovado.push({
                                    nome: disciplina.nome,
                                    status: disciplina.status
                                });
                            } else if (disciplina.status === "Exame") {
                                disciplinasPorStatus.Exame.push({
                                    nome: disciplina.nome,
                                    status: disciplina.status
                                })
                            }
                        })
                    }

                    
                    resultado.push({
                        nome: aluno.nome,
                        matricula: aluno.matricula,
                        sexo: aluno.sexo,
                        curso: curso.nome,
                        disciplinas: disciplinasPorStatus
                    })
                }
            })
        }
    })

    
    return resultado.length > 0 ? resultado : `Nenhum aluno encontrado para o curso com sigla "${sigladocurso}".`
}


const getAlunosCursoPorAno = function (sigladocurso, anoConclusao) {
    let requisicaoCurso = String(sigladocurso).toUpperCase();
    let resultado = [];

    ListaAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso) {
            if (curso.sigla == requisicaoCurso && curso.conclusao == String(anoConclusao)) {
                resultado.push({
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo,
                    curso: curso.nome,
                    conclusao: curso.conclusao
                });
            }
        });
    });


    if (resultado.length > 0) {
        return resultado;
    } else {
        return false;
    }
}

module.exports = {
    getListaCursos,
    getListaAlunos,
    getMatriculaAlunos,
    getSiglaDoCurso,
    getStatusAlunos,
    getAlunosPorCurso,
    getAlunosCursoPorAno
}


//console.log(getListaCursos())
//console.log(getListaAlunos())
//console.log(getMatriculaAlunos('20151001017'))
//console.log(getSiglaDoCurso('ds'))
//console.log(getStatusAlunos('Cursando'))
//console.log(getAlunosPorCurso('ds'))
//console.log(getAlunosCursoPorAno('DS', 2022))