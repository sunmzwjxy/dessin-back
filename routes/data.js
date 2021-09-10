var express = require('express')
var multiparty = require('multiparty')
var multer = require('multer')
var router = express.Router()
var JwtUilt = require('../models/jwt.js')
var fs = require('fs')

var { sequelize, QueryTypes } = require('../config/db')

var initModels = require('../models/mysql/init-models')
var models = initModels(sequelize)

/* save data. */
router.post('/save', async function (req, res, next) {
    // var form = new multiparty.Form({ uploadDir: './public/images' })
    // form.parse(req, function (err, fields, files) {
    //     if (err) {
    //     } else {
    //         fs.renameSync(files.imagefile[0].path, files.imagefile[0].path + '.png')
    //         res.sendResult({ imgSrc: files.imagefile[0].path }, 200, 'Save successful!')
    //     }
    // })

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg')
        },
    })

    const upload = multer({ storage: storage })
    fUpload = upload.fields([{ name: 'imagefile', maxCount: 1 }])

    fUpload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
        } else if (err) {
            // 发生错误
        }
        // 一切都好
        // Field data
        console.log(req.body)
        // File details
        console.log(req.files)
        req.body.name = req.files.imagefile[0].filename
        req.body.image = req.files.imagefile[0].path
        // Save data to DB
        const result = await models.dessin.create(req.body)
        //
        res.sendResult(result, 200, 'Save successful!')
    })
})

/*
    Get class 
 */
router.get('/class', async (req, res, next) => {
    const result = await models.class2.findAll()
    res.sendResult(result, 200, 'Save 成功')
})

/*
    id => user ID
    Get folder by user ID
 */
router.get(
    '/folder',
    (req, res, next) => {
        if (!req.query.userId) return res.sendResult({ status: 400, err: 'ID不能为空' })
        if (isNaN(parseInt(req.query.userId))) res.sendResult({ status: 400, err: 'ID必须为数字' })
        next()
    },
    async (req, res, next) => {
        const result = await models.folders.findAll({
            where: {
                userId: req.query.userId,
            },
        })
        res.sendResult(result, 200, 'Save 成功')
    }
)

/*
    id => user ID
    Get drawing by user ID
 */
router.get('/dessin', async (req, res, next) => {
    // const SQL_String = `select * , true as leaf from dessin where userId = ${req.query.userId} and folderId = ${req.query.folderId} and component = ${req.query.component}`
    // const result = await sequelize.query(SQL_String, {type: QueryTypes.SELECT})


    const temp = await models.dessin.findAll({
        where: {
            userId: req.query.userId,
            folderId: req.query.folderId,
            component: req.query.component
        },
        raw: true
    })
    const result = temp.map(element => {
        element.leaf = true
        return element
    })
    res.sendResult(result, 200, 'Save 成功')
})

/*
    id => user ID
    Get image by user ID
 */
router.get(
    '/image/:id',
    (req, res, next) => {
        if (!req.params.id) return res.sendResult({ status: 400, err: 'ID不能为空' })
        if (isNaN(parseInt(req.params.id))) res.sendResult({ status: 400, err: 'ID必须为数字' })
        next()
    },
    async (req, res, next) => {
        const result = await models.imagecomponents.findAll({
            where: {
                userId: req.params.id,
            },
        })
    }
)

router.post('/new/folder', async (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    var result = await models.users.findOne({
        where: {
            username: username,
        },
    })

    res.sendResult({ id: result.id, token: token }, 200, '登陆成功')
})

module.exports = router
