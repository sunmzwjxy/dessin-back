const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'class',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        comment: '主键',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '分类名称',
      },
    },
    {
      sequelize,
      tableName: 'class',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'name',
          using: 'BTREE',
          fields: [{ name: 'name' }],
        },
      ],
    }
  )
}
