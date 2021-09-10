const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'imagecomponents',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        comment: '主键',
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '图片url地址',
      },
      folderId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: '所属文件夹',
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: '所属用户',
      },
    },
    {
      sequelize,
      tableName: 'imagecomponents',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}
