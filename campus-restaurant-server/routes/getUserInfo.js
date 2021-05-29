var express = require('express');
var router = express.Router();
var usersModels = require('../modal/usersModels');
var User = usersModels.users;

router.get('/', function (req, res) {
    const {
        userName
    } = req.session.user;
    const {
        userId
    } = req.session;
    User.findById(userId, { password: 0 }, (err, person) => {
        if (!err) {
            if (person) {


                res.json({
                    success: true,
                    code: 1,
                    userInfo: person,
                    message:'查询成功'
                });
            } else {
                res.json({
                    success: true,
                    code: 2,
                    message: '此用户不存在'
                });
            };
        } else {
            res.json({
                success: false,
                code: 3,
                message: err
            })
        }
    })
})

module.exports = router;