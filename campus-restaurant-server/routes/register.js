var express = require('express');
var router = express.Router();
var usersModels = require('../modal/usersModels');
var User = usersModels.users;

router.post('/', function (req, res) {
    const { phoneNumber } = req.body;
    User.findOne({
        phoneNumber
    }, (err, person) => {
        if (person) {
            return res.json({
                success: true,
                status: 2,
                message: '该手机号已被注册'
            })
        } else {
            User.create(req.body, (err, doc) => {
                if (err) {
                    return res.json({
                        success: false,
                        status: 3,
                        message: '注册失败，请稍后再试',
                    })
                }
                else {
                    res.json({
                        success: true,
                        status: 1,
                        message: '注册成功'
                    })
                }
            })
        }
    });
})

module.exports = router;