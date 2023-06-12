var DataTypes = require("sequelize").DataTypes;
var _MaterialProducts = require("./MaterialProducts");
var _Orders = require("./Orders");
var _Product_categories = require("./Product_categories");
var _Products = require("./Products");
var _Size = require("./Size");
var _Users = require("./Users");

function initModels(sequelize) {
  var MaterialProducts = _MaterialProducts(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Product_categories = _Product_categories(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Size = _Size(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Products.belongsTo(MaterialProducts, { as: "Material_MaterialProduct", foreignKey: "Material"});
  MaterialProducts.hasMany(Products, { as: "Products", foreignKey: "Material"});
  Products.belongsTo(Product_categories, { as: "Category_Product_category", foreignKey: "Category"});
  Product_categories.hasMany(Products, { as: "Products", foreignKey: "Category"});
  Size.belongsTo(Product_categories, { as: "ID_Category_Product_category", foreignKey: "ID_Category"});
  Product_categories.hasMany(Size, { as: "Sizes", foreignKey: "ID_Category"});
  Orders.belongsTo(Products, { as: "ID_product_Product", foreignKey: "ID_product"});
  Products.hasMany(Orders, { as: "Orders", foreignKey: "ID_product"});
  Products.belongsTo(Size, { as: "ID_Size_Size", foreignKey: "ID_Size"});
  Size.hasMany(Products, { as: "Products", foreignKey: "ID_Size"});
  Orders.belongsTo(Users, { as: "ID_user_User", foreignKey: "ID_user"});
  Users.hasMany(Orders, { as: "Orders", foreignKey: "ID_user"});

  return {
    MaterialProducts,
    Orders,
    Product_categories,
    Products,
    Size,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
