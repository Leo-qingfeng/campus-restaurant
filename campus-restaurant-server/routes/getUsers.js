var express = require('express');
var router = express.Router();
var usersModels = require('../modal/usersModels');
var User = usersModels.users;

router.post('/', function (req, res) {


    const { search, pages, curPage } = req.body;
    let total;
    User.find({}, (err, person) => {
        if (!err) {
            total = person.length;
        }
    })
    if (search == '') {


        User.find().skip((Number(curPage) - 1) * Number(pages)).limit(Number(pages)).exec((err, person) => {
            if (err) {
                res.json({
                    success: false,
                    code: 3,
                    data: {},
                    message: "查询失败"
                })
            }
            else {
                if (person) {
                    res.json({
                        success: true,
                        code: 1,
                        data: { person, total },
                        message: '查询成功'
                    })
                } else {
                    res.json({
                        success: true,
                        code: 2,
                        data: {},
                        message: "查询失败"

                    })
                }
            }
        })
    }
    else {
        User.find({ phoneNumber: search }).skip((curPage - 1) * pages).limit(pages).exec((err, person) => {
            if (err) {
                res.json({
                    success: false,
                    code: 3,
                    data: {},
                    message: "查询失败"
                })
            }
            else {
                if (person) {
                    res.json({
                        success: true,
                        code: 1,
                        data: { person, total },
                        message: '查询成功'
                    })
                } else {
                    res.json({
                        success: true,
                        code: 2,
                        data: {},
                        message: "查询失败"

                    })
                }
            }
        })
    }

    // User.find({ }).skip((curPage - 1) * parseInt(pages)).limt(parseInt(pages)).exec((err, person) => {
    //     if (!err) {
    //         if (person) {
    //             console.log(person);

    //             res.json({
    //                 success: true,
    //                 code: 1,
    //                 userInfo: person,
    //                 message: '查询成功'
    //             });
    //         } else {
    //             console.log(err);
    //         };
    //     } else {

    //     }
    // })


})

module.exports = router;