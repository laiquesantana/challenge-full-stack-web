var bodyParser = require('body-parser')
var express = require("express")
var cors = require('cors')
const app = express()
var router = require("./routes/routes")
 
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
