var Student = require("../models/Student");

var jwt = require("jsonwebtoken");

var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

const validadorCpf = require("gerador-validador-cpf")

const datalize = require('datalize');
const field = datalize.field;
const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

class StudentController{
    async index(req, res){


        var students = await Student.findAll();
        res.json(students);
    }

    async findStudent(req, res){
        var id = req.params.id;
        var student = await Student.findById(id);
        if(student == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(student);
        }
    }

    async findStudentQuery(req, res){
        var query = req.params.query;
        var student = await Student.findByQuery(query);
        if(student == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(student);
        }
    }

    async create(req, res){
        var {name, email, academic_record,cpf} = req.body;
        if(cpf == undefined || !validadorCpf.validate(cpf)){
            res.status(400);
            res.json({err: "O CPF é inválido!"})
            return;
        }

        
        if(name == undefined || name === ''|| !isNaN(name)){
            res.status(400);
            res.json({err: "O nome do aluno é inválido!"})
            return;
        }

        if(academic_record == undefined || academic_record === '' || isNaN(academic_record)){
            res.status(400);
            res.json({err: "O registro acadêmico do aluno é inválido!"})
            return;
        }

        if(email == undefined || email === ''){
            res.status(400);
            res.json({err: "O e-mail é inválido!"})
            return;
        }

        
    
        cpf = cpf.replace(regex, '');

        var cpfExists = await Student.findCpf(cpf);

        if(cpfExists){
            res.status(406);
            res.json({err: "O CPF já está cadastrado!"})
            return;
        }

        var academicRecordExists= await Student.findAcademicRecord(academic_record);

        if(academicRecordExists){
            res.status(406);
            res.json({err: "O registro acadêmico já está cadastrado!"})
            return;
        }



 
        var result = await Student.new(name,email,academic_record,cpf);
        
        res.status(200);
        res.send(result);
    }

    async edit(req, res){
        var {id, name, email} = req.body;
        var result = await Student.update(id,email,name);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("success!");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req, res){
        
        var id = req.params.id;

        var result = await Student.delete(id);

        if(result.status){
            res.status(200);
            res.send("success!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }



}


module.exports = new StudentController();