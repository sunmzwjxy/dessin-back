var express = require('express')
var router = express.Router()
var JwtUilt = require('../models/jwt.js')

var { sequelize } = require('../config/db')

var initModels = require('../models/mysql/init-models')
var models = initModels(sequelize)

/* GET users listing. */
router.post('/login', async function (req, res, next) {
    var username = req.body.username
    var password = req.body.password

    var result = await models.users.findOne({
        where: {
            username: username,
        },
    })

    if (password === result.password) {
        let jwt = new JwtUilt(username)
        let token = jwt.generateToken()
        result.token = token
        res.sendResult({ id: result.id, token: token }, 200, '登陆成功')
    } else {
        res.sendResult('', 400, '账号密码错误')
    }
})

router.get(
    '/userid/:id',
    function (req, res, next) {
        if (!req.params.id) return res.sendResult({ status: 400, err: 'ID不能为空' })
        if (isNaN(parseInt(req.params.id))) res.sendResult({ status: 400, err: 'ID必须为数字' })
        next()
    },
    async function (req, res, next) {
        const result = await models.users.findOne({
            where: {
                id: req.params.id,
            },
        })
        res.sendResult(result, 200, '获取用户成功!')
    }
)
/*
router.get('/:id',async function (req, res, next) {
    const result = await models.users.findAll({
        where: {
            id: req.params.id,
        },
        include: models.folders
    })

    res.sendResult(result, 200, '获取用户成功!')
})
*/

module.exports = router
