const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'files',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        comment: '主键',
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '图片预览地址',
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '图片预览地址。应该和url相同，或查询的时候根据图片接口取别名',
      },
      file: {
        type: DataTypes.BLOB,
        allowNull: false,
        comment: '文件二进制内容',
      },
    },
    {
      sequelize,
      tableName: 'files',
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
