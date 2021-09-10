const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'folders',
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
        allowNull: true,
        comment: '文件夹名称',
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '文件夹类型：固定为 topology（“图纸”文件夹），user（“我创建的”文件夹）',
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: '所属用户',
      },
    },
    {
      sequelize,
      tableName: 'folders',
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
