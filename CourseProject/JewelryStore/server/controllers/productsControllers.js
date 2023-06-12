const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const Sequelize = require('../db');
const initModels = require('../models/init-models');
const { toComparators } = require('semver');
const models = initModels(Sequelize)
const Products = models.Products
const Size = models.Size
const MaterialProducts = models.MaterialProducts
class ProductsController {
    async create(req, res, next) {
        try {
            const { Name, Description, Price, Category, Material, Weight, ID_Size, Article, Sex } = req.body
            const { Image } = req.files;
            let fileName;
            let Name1;
            let Weight1;
            let Price1;
            let Description1;
            let Category1;
            let Sex1;
            let Material1;
            const prod1 = await Products.findOne({
                where: { Article },
                attributes: ['Image', 'Name', 'Description', 'Category', 'Weight', 'Sex', 'Price', 'Article', 'Material']
            })
            // console.log(prod1.dataValues.Name)
            if (prod1) {
                fileName = prod1.dataValues.Image
                Name1 = prod1.dataValues.Name
                Weight1 = prod1.dataValues.Weight
                Price1 = prod1.dataValues.Price
                Description1 = prod1.dataValues.Description
                Category1 = prod1.dataValues.Category
                Sex1 = prod1.dataValues.Sex
                Material1 = prod1.dataValues.Material
            }
            else {
                fileName = uuid.v4() + ".jpg";
                Image.mv(path.resolve(__dirname, '..', 'static', fileName))
                Name1 = Name;
                Weight1 = Weight
                Price1 = Price
                Description1 = Description
                Category1 = Category
                Sex1 = Sex
                Material1 = Material
            }
            console.log({ prod1 })
            const prod = await Products.findOrCreate({ where: { Name: Name1, Description: Description1, Price: Price1, Category: Category1, Image: fileName, Material: Material1, Weight: Weight1, ID_Size, Article, Sex: Sex1 } })
            console.log({ prod })
            return res.json(prod)


        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { Category, Material , sort} = req.query
        let product;
      
        if (!Category && !Material && !sort) {
            product = await Products.findAll({
                attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order:  Sequelize.literal('max(ID) DESC')
            })
        }
        if (!Category && !Material && sort) {
            product = await Products.findAll({
                attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order: [ ['Price',sort], Sequelize.literal('max(ID) DESC')]
            })
        }

        if (!Category && Material && sort) {
            product = await Products.findAll({
                where: { Material }, attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order:[ ['Price',sort], Sequelize.literal('max(ID) DESC')]
            })
        }
        if (Category && !Material && sort) {
            product = await Products.findAll({
                where: { Category }, attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order: [ ['Price',sort], Sequelize.literal('max(ID) DESC')]
            })
        }
        if (!Category && Material && !sort) {
            product = await Products.findAll({
                where: { Material }, attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order: Sequelize.literal('max(ID) DESC')
            })
        }

        if (Category && !Material && !sort) {
            product = await Products.findAll({
                where: { Category }, attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order: Sequelize.literal('max(ID) DESC')
            })
        }
        if (Category && Material && !sort) {
            product = await Products.findAll({
                where: { Material,Category }, attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order: Sequelize.literal('max(ID) DESC')
            })
        }

        if (Category && Material && sort) {
            product = await Products.findAll({
                where: { Category,Material }, attributes: ["Article", "Image", "Price", "Material", "Name"],
                group: ["Article", "Image", "Price", "Material", "Name"],
                order: [ ['Price',sort], Sequelize.literal('max(ID) DESC')]
            })
        }



        return res.json(product)
    }



    // async getOne(req, res) {
    //     const { Article } = req.params
    //     const product = await Products.findAll({ where: { Article },     
    //     include: [{ model: MaterialProducts, attributes: ['Name'], as: "Material_MaterialProduct" }] })
    //     return res.json(product)

    // }

    async getOne(req, res) {
        const { Article } = req.params
        const product = await Products.findAll({
            where: { Article },
            include: [{ model: MaterialProducts, attributes: ['Name'], as: "Material_MaterialProduct" },
            { model: Size, attributes: ['Size'], as: "ID_Size_Size" }]
        })
        let a = Object(product.ID_Size_Size)
        console.log({ a })
        return res.json(product)

    }



    async getAllDelete(req, res) {
        const product = await Products.findAll({
            include: [
                { model: Size, attributes: ['Size'], as: "ID_Size_Size" }]
        })
        console.log('ffdel')
        return res.json(product)
    }


    async del(req, res, next) {
        try {
            const { ID } = req.body
            const product = await Products.destroy({ where: { ID } })
            return res.json(product)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }

    }

    async UpdProducts(req, res) {
        const { Name, Description, Price, Category, Material, Weight, Article, Sex } = req.body
        console.log(req.body)
        const { Image } = req.files ?? '';;
        const updProduct = {};
        if (Name && Name !== 'undefined') {
            updProduct.Name = Name;
        }
        if (Description && Description !== 'undefined') {
            updProduct.Description = Description;
        }
        if (Price && Price !== 'undefined') {
            updProduct.Price = Price;
        }
        if (Category && Category !== 'undefined') {
            updProduct.Category = Category;
        }
        if (Material && Material !== 'undefined') {
            updProduct.Material = Material;
        }
        if (Weight && Weight !== 'undefined') {
            updProduct.Weight = Weight;
        }
        // if (Article && Article !== 'undefined') {
        //     updProduct.Article = Article;
        // }
        if (Sex && Sex !== 'undefined') {
            updProduct.Sex = Sex;
        }
        let fileName = uuid.v4() + ".jpg";
        if (Image) {
            Image.mv(path.resolve(__dirname, '..', 'static', fileName))
            updProduct.Image = fileName;
        }
        console.log(fileName);
        const prod = await Products.update(updProduct, { where: { Article } })
        console.log(prod)
        return res.json(prod)

    }


}
module.exports = new ProductsController()