class HomeController{

    async index(req, res){
        res.status(200).send("Hello World!");
    }

}

module.exports = new HomeController();