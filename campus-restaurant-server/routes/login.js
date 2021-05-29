var express = require('express');
var router = express.Router();
var usersModels = require('../modal/usersModels');
var User = usersModels.users;

router.post('/', function (req, res) {
    const {
        userName,
        password
    } = req.body;
    User.findOne({ userName, password }, (err, person) => {
        if (err) {
            res.json({
                success: false,
                status: 3,
                message: '系统错误',
                data: {},
            });
        } else {
            if (person) {
                // 登录成功，设置session
                req.session.user = person;
                req.session.login = true;
                req.session.userId = person._id;
                res.json({
                    success: true,
                    status: 1,
                    message: '登录成功',
                    data: person
                })
            } else {
                User.findOne({ phoneNumber: userName, password }, (err, phonePerson) => {
                    if (err) {

                        res.json({
                            success: false,
                            status: 3,
                            message: '账号或密码错误',
                            data: {},
                        })
                    } else if (phonePerson) {
                        // 登录成功，设置session
                        req.session.user = phonePerson;
                        req.session.login = true;
                        req.session.userId = phonePerson._id;
                        res.json({
                            success: true,
                            status: 1,
                            message: '登录成功',
                            data: person
                        })
                    } else {
                        res.json({
                            success: false,
                            status: 2,
                            message: '账号或密码错误',
                            data: {},
                        })
                    }
                })


            }

        }

    })


})

module.exports = router;
