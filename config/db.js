const {Sequelize, QueryTypes} = require('sequelize');

const sequelize = new Sequelize('dessin', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

//测试数据库链接
sequelize.authenticate().then(function() {
    console.log("connection's successfully");
}).catch(function(err) {
    //数据库连接失败时打印输出
    console.error(err);
    throw err;
});

exports.sequelize = sequelize;
exports.QueryTypes = QueryTypes;