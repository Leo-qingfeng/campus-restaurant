var express = require('express');
var ObjectId =require('mongodb').ObjectId;
var router = express.Router();
var orderListModels = require('../modal/orderListModels');
var orderList = orderListModels.orderList;

router.post('/', function (req, res) {

    const {
        userId
    } = req.session;
    const { pages, curPage } = req.body;
    let total;

    orderList.find({}, (err, person) => {
        if (!err) {
            total = person.length;
        }
    })

    orderList.find({userId:ObjectId(userId)}).skip((Number(curPage) - 1) * Number(pages)).limit(Number(pages)).exec((err, person) => {
        if (!err) {
            if (person) {
                res.json({
                    success: true,
                    code: 1,
                    orderLists: { person, total },
                    message: '查询成功'
                });
            } else {
                res.json({
                    success: true,
                    code: 2,
                    message: '查询失败'
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