const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'tools',
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
        comment: '图形库名称',
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '图形库在工具栏显示字体图标。和image二选一即可',
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '图形库在工具栏显示缩略图url',
      },
      class: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '所属分类名称。分类名称唯一，直接作为唯一标识使用',
      },
      data: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'json字符串，拖拽给画布的数据',
      },
      sort: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '排序用',
      },
    },
    {
      sequelize,
      tableName: 'tools',
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
