const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'dessin',
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
        comment: '图纸名称',
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '图纸缩略图url',
      },
      pens: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '图纸画布节点连线数据',
      },
      component: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: '图纸类型： 0 - 图纸；1 - “我创建的”组件',
      },
      componentData: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '如果为 “我创建的”组件，则为复合组件内容',
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: '所属用户',
      },
      class: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '所属分类名称',
      },
      folderId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: '所属文件夹',
      },
      lineName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '图纸选项：默认连线类型',
      },
      fromArrow: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '图纸选项：默认起始箭头',
      },
      toArrow: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '图纸选项：默认终点箭头',
      },
      scale: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '图纸缩放比例',
      },
      locked: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '图纸是否锁定',
      },
      websocket: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'websocket连接地址',
      },
      mqttUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'mqtt连接地址',
      },
      mqttOptions: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'mqtt连接选项',
      },
    },
    {
      sequelize,
      tableName: 'dessin',
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
