var express = require('express');
var router = express.Router();
var usersModels = require('../modal/usersModels');
var User = usersModels.users;


router.post('/', function (req, res) {
    const {
        newPassword,
        phoneNumber
    } = req.body;
    User.findOne({
        phoneNumber
    }, (err, person) => {
        if (err) {
            res.json({
                success: false,
                status: 403,
                message: '数据库错误！'
            })
        } else {
            if (person) {
                if (person.password !== newPassword) {
                    console.log(phoneNumber);
                    User.findOneAndUpdate({phoneNumber}, {
                        password: newPassword
                    }, (err, doc) => {
                        if (err) {
                            res.json({
                                success: false,
                                status: 403,
                                message: '数据库错误！'
                            })
                        } else {
                            console.log(doc);
                            res.json({
                                success: true,
                                status: 1,
                                message: '修改成功！'
                            })
                        }
                    })
                }
                else{
                    res.json({
                        success:true,
                        status: 2,
                        message:"新密码不能与原密码相同！",
                        data: {}
                    })
                }
            }
            else {
                res.json({
                    success: true,
                    status: 3,
                    message: '',
                    data: {}
                })
            }
        }
    })
})

module.exports = router;