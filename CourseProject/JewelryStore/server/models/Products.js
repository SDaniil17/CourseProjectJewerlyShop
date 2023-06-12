const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product_categories',
        key: 'ID'
      }
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Material: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MaterialProducts',
        key: 'ID'
      }
    },
    Weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ID_Size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Size',
        key: 'ID'
      }
    },
    Article: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Sex: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Products',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Products__3214EC2727045956",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
