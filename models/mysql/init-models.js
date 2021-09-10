var DataTypes = require('sequelize').DataTypes
var _tools = require('./tools')
var _class = require('./class')
var _dessin = require('./dessin')
var _files = require('./files')
var _folders = require('./folders')
var _users = require('./users')
var _imagecomponents = require('./imagecomponents')

function initModels(sequelize) {
    var tools = _tools(sequelize, DataTypes)
    var class2 = _class(sequelize, DataTypes)
    var dessin = _dessin(sequelize, DataTypes)
    var files = _files(sequelize, DataTypes)
    var folders = _folders(sequelize, DataTypes)
    var users = _users(sequelize, DataTypes)
    var imagecomponents = _imagecomponents(sequelize, DataTypes)

    users.hasMany(folders)
    folders.belongsTo(users, {
        foreignKey: 'userId',
        targetKey: 'id',
    })

    users.hasMany(imagecomponents)
    imagecomponents.belongsTo(users, {
        foreignKey: 'userId',
        targetKey: 'id',
    })

    folders.hasMany(imagecomponents)
    imagecomponents.belongsTo(folders, {
        foreignKey: 'folderId',
        targetKey: 'id',
    })

    return {
        tools,
        class2,
        dessin,
        files,
        folders,
        users,
        imagecomponents,
    }
}

module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels

// var initModels = require("./models/mysql/init-models")
// var models = initModels(sequelize)
// models.User.findAll({ where: { username: "tony" }}).then(...)
