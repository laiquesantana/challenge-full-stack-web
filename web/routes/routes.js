var express = require("express")
var cors = require('cors')
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var StudentController = require("../controllers/StudentController");
var AdminAuth = require("../middleware/AdminAuth");

app.use(cors())

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    next();
});

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user",UserController.index);
router.get("/user/:id",AdminAuth,UserController.findUser);
router.get("/user/query/:query?",UserController.findUserQuery);
router.put("/user",AdminAuth,UserController.edit);
router.delete("/user/:id",UserController.remove);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);

router.post('/student', StudentController.create);
router.get("/student",StudentController.index);
router.get("/student/:id",StudentController.findStudent);
router.get("/student/query/:query?",StudentController.findStudentQuery);
router.put("/student",StudentController.edit);
router.delete("/student/:id",StudentController.remove);

module.exports = router;