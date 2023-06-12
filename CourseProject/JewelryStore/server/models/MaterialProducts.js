const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MaterialProducts', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MaterialProducts',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Material__3214EC27B01048DF",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
