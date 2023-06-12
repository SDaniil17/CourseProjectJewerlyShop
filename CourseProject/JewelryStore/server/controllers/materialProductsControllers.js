const Sequelize = require('../db');
const initModels = require('../models/init-models')
const ApiError = require("../error/ApiError")
const { BadRequest } = require('../error/ApiError');
const models = initModels(Sequelize)
const MaterialProducts = models.MaterialProducts

class MaterialProductsController {
    async getAll(req, res) {
        const mat = await MaterialProducts.findAll()
        return res.json(mat)
    }

    async Add(req, res) {
        const{Name}=req.body
        const mat = await MaterialProducts.findOrCreate({where:{Name}})
        return res.json(mat)
    }

    async del(req, res,next) {
        try{
        const {ID}  = req.body
        console.log({ID})
        const delet = await MaterialProducts.destroy({ where: { ID } })
        return res.json(delet)
        } 
        catch(e){next(ApiError.BadRequest(e.message))
        }

    }
}
module.exports = new MaterialProductsController();