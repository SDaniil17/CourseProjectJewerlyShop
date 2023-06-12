const Sequelize = require('../db');
const initModels = require('../models/init-models')
const ApiError = require("../error/ApiError")
const models = initModels(Sequelize)
const Orders = models.Orders
const Products = models.Products
const Users = models.Users
const Sizes = models.Size
class OrdersController {
    async create(req, res) {
        const { ID_product, ID_user, Order_date } = req.body;
        const ord = await Orders.create({ ID_product, ID_user, Order_date });
        return res.json(ord);
    }

    async getAllUsers(req, res) {
        const order = await Orders.findAll({
            include: [
                { model: Products, attributes: ['Name','Price'], as: "ID_product_Product" , include:[{model: Sizes, attributes: ['Size'], as: "ID_Size_Size"}]},
                { model: Products, attributes: ['ID_Size'], as: "ID_product_Product" },
                { model: Users, attributes: ['Email','Name','Surname'], as: "ID_user_User" },
                { model: Users, attributes: ['Address'], as: "ID_user_User" }]
        })
        return res.json(order)

    }

    async getOne(req, res) {
        const { ID_user } = req.query;
        const order = await Orders.findAll({
            where: { ID_user },
            include: [
                { model: Products, attributes: ['Name'], as: "ID_product_Product" },
                { model: Products, attributes: ['Price'], as: "ID_product_Product" },
                { model: Products, attributes: ['ID_Size'], as: "ID_product_Product" },
                { model: Users, attributes: ['Address'], as: "ID_user_User" }]
        })
        return res.json(order)

    }

    async del(req, res, next) {
        try {
            const { ID } = req.body
            const delet = await Orders.destroy({ where: { ID } })
            return res.json(delet)
        }
        catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    // async update(req, res) {
    //     const {ID, ID_product, ID_user, Order_date, Delivery_address, Order_price } = req.body;
    //     const pr = await Product_categories.update({ ID_product, ID_user, Order_date, Delivery_address, Order_price }, { where: { ID } });
    //     return res.json(pr)
    // }


}
module.exports = new OrdersController()