const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Size', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_Category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Product_categories',
        key: 'ID'
      }
    },
    Size: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Size',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Size__3214EC2744DC2CEF",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
