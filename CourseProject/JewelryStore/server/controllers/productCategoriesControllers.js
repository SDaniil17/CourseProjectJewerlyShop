const Sequelize = require('../db');
const initModels = require('../models/init-models')
const models = initModels(Sequelize)
const ApiError = require("../error/ApiError")
const { BadRequest } = require('../error/ApiError');
const Product_categories = models.Product_categories
class productCategoriesController {

    async create(req, res) {
        const { Category_name } = req.body
        const categories = await Product_categories.findOrCreate({where:{ Category_name }})
        return res.json(categories)
    }


    async getAll(req, res) {

        const types = await Product_categories.findAll()
        return res.json(types)

    }

    async del(req, res,next) {
        try{
        const { ID } = req.body
        const dell = await Product_categories.destroy({ where: { ID } })
        return res.json(dell)
        } 
        catch(e){next(ApiError.BadRequest(e.message))
        }

    }

    async getOne(req, res) {
        const { ID } = req.body
        const prod = await Product_categories.findOne({ ID })
        return res.json(prod)

    }

    async update(req, res) {
        const { ID,Category_name } = req.body
        const pr = await Product_categories.update({ Category_name}, { where: { ID } });
        return res.json(pr)
    }



}
module.exports = new productCategoriesController()