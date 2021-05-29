var express = require('express');
var router = express.Router();
var usersModels = require('../modal/usersModels');
var User = usersModels.users;

router.post('/', function (req, res) {
    const {
        _id,
        banlance
    } = req.body;
    console.log(req.body);
    User.findByIdAndUpdate(_id, { banlance: Number(banlance) }, (err, person) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                code: 3,
                message: '充值失败'
            })
        }
        else {
            if (person) {
                res.json({
                    success: true,
                    code: 1,
                    message: '充值成功'
                })
            } else {
                res.json({
                    success: true,
                    code: 2,
                    message: '充值失败'
                })
            }
        }
    })
})

module.exports = router;