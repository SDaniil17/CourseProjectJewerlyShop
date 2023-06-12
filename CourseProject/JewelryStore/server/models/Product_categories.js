const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product_categories', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Category_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Product_categories',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Product___3214EC27AB51D542",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
