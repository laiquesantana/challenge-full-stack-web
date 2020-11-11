var knex = require("../database/connection");

class Student{

    async findAll(){
        try{
            var result = await knex.select(["id","email","academic_record","cpf","name"]).table("students").orderBy('name')
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","email","academic_record","name",'cpf']).where({id:id}).table("students");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["email"]).where({email:email}).table("students");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }


    async findByQuery(query){
        try{
         var result = await knex.select(["id","email","name","academic_record","cpf"]).where('name', 'like', `%${query}%`).orWhere('id', 'like', `%${query}%`).orWhere('cpf', 'like', `%${query}%`).orWhere('academic_record', 'like', `%${query}%`).orWhere('email', 'like', `%${query}%`).table("students");
            
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async new(name,email,academic_record,cpf){
        try{
            await knex.insert({name,academic_record,email,cpf}).table("students");
        }catch(err){
            console.log(err);
        }
    }   

    async findEmail(email){
        try{
            var result = await knex.select("email").from("students").where({email: email});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async findCpf(cpf){
        try{
            var result = await knex.select("cpf").from("students").where({cpf: cpf});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async findAcademicRecord(academic_record){
        try{
            var result = await knex.select("academic_record").from("students").where({academic_record: academic_record});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id,email,name){

        var Student = await this.findById(id);

        if(Student != undefined){

            var editStudent = {};

            if(name != undefined || name != ''){
                
                editStudent.email = email;
                 
            }
            if(name != undefined || name != ''|| isNaN(name)){
                editStudent.name = name;
            }

          

            try{
                await knex.update(editStudent).where({id: id}).table("students");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O usuário não existe!"}
        }
    }

    async delete(id){
        var Student = await this.findById(id);
        if(Student != undefined){

            try{
                await knex.delete().where({id: id}).table("students");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O aluno não existe, portanto não pode ser deletado."}
        }
    }

   
}

module.exports = new Student();