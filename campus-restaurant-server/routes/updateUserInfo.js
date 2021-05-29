var express = require('express');
var router = express.Router();
var usersModels = require('../modal/usersModels');
var User = usersModels.users;


router.post('/', function (req,res) {
    const {
        userId
    } = req.session
    const curUserInfo = req.body;

    User.findByIdAndUpdate(userId, curUserInfo, (err,doc) => {
        if (err) {
            res.json({
                success: false,
                status: 3,
                message: '修改失败，请稍后再试',
                data: {}
            })
        } else {
            res.json({
                success: true,
                status: 1,
                message: '修改个人信息成功',
                data: doc
            })
        }
    })
})

module.exports = router;