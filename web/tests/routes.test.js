const request = require("supertest");
const router = require("../routes/routes");
const express = require("express"); // import express
const bodyParser = require('body-parser')


const StudentController = require("../controllers/StudentController");
const app = express(); //an instance of an express app, a 'fake' express app
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


describe('Get Endpoints', () => {
    it('should return 404 not', async () => {
      const res = await request(app.use(router))
        .get('/student/aa')
      expect(res.statusCode).toEqual(404)
    })
  })


  
describe('Post Endpoints', () => {
    it('should err invalid cpf', async () => {
        
        let studentObj = {
            name: "123213",
            cpf: "0600181456",
            email: "Kay Ivey",
            academic_record: "Kay Ivey",
        };
      const res = await request(app.use(router))
        .post('/student')
        .send(studentObj)
      expect(res.statusCode).toEqual(422)
      expect(res.body.err).toBe("O CPF é inválido!")
    })
  })


  describe('Post Endpoints', () => {
    it('should err invalid name', async () => {
        
        let studentObj = {
            name: "123213",
            cpf: "06001814562",
            email: "Kay Ivey",
            academic_record: "Kay Ivey",
        };
      const res = await request(app.use(router))
        .post('/student')
        .send(studentObj)
      expect(res.statusCode).toEqual(422)
      expect(res.body.err).toBe("O nome do aluno é inválido!")
    })
  })


  describe('Post Endpoints', () => {
    it('should err invalid academic record', async () => {
        
        let studentObj = {
            name: "Láique",
            cpf: "06001814562",
            email: "Kay Ivey",
            academic_record: "Kay Ivey",
        };
      const res = await request(app.use(router))
        .post('/student')
        .send(studentObj)
      expect(res.statusCode).toEqual(422)
      expect(res.body.err).toBe("O registro acadêmico do aluno é inválido!")
    })
  })

  describe('Post Endpoints', () => {
    it('should err invalid email', async () => {
        
        let studentObj = {
            name: "Láique",
            cpf: "06001814562",
            email: "",
            academic_record: "1312",
        };
      const res = await request(app.use(router))
        .post('/student')
        .send(studentObj)
      expect(res.statusCode).toEqual(422)
      expect(res.body.err).toBe("O e-mail é inválido!")
    })
  })


  describe('Post Endpoints', () => {
    it('should err invalid name', async () => {
        
        let studentObj = {
            name: "Láique",
            cpf: "06001814562",
            email: "",
            academic_record: "1312",
        };
      const res = await request(app.use(router))
        .post('/student')
        .send(studentObj)
      expect(res.statusCode).toEqual(422)
      expect(res.body.err).toBe("O e-mail é inválido!")
    })
  })


  
  describe('Post Endpoints', () => {
    it('should err in delete user', async () => {
        
      const res = await request(app.use(router))
        .delete('/student/aa')
      expect(res.statusCode).toEqual(406)
      expect(res.text).toBe("O aluno não existe, portanto não pode ser deletado.")
    })
  })

