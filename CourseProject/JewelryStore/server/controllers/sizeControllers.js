const Sequelize = require('../db');
const initModels = require('../models/init-models')
const ApiError = require("../error/ApiError")
const { BadRequest } = require('../error/ApiError');
const models = initModels(Sequelize)
const Sizes = models.Size
const Product = models.Products

class sizeControllers {

    async create(req, res) {
        const { ID_Category, Size } = req.body
        const categories = await Sizes.findOrCreate({where:{ ID_Category, Size }})
        return res.json(categories)
    }

    async getAll(req, res) {
        const types = await Sizes.findAll()
        return res.json(types)

    }

    async del(req, res,next) {
        try{
        const { ID } = req.body
        let id = ID
        const dell = await Sizes.destroy({ where: { ID } })
        return res.json(dell)
        }
        catch(e){next(ApiError.BadRequest(e.message))
        }
    }

    async getSize(req, res) {
        const { ID_Category } = req.query
        console.log({ID_Category})
        const prod = await Sizes.findAll({ where: {ID_Category} })
        return res.json(prod)
    }

    async update(req, res) {
        const { ID, ID_Category, Size } = req.body
        const pr = await Sizes.update({ ID_Category, Size }, { where: { ID } });
        return res.json(pr)
    }



}
module.exports = new sizeControllers()