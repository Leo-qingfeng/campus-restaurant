var express = require('express');
var router = express.Router();
var orderListModels = require('../modal/orderListModels');
var orderList = orderListModels.orderList;


router.post('/', function (req,res) {

    const {_id,orderStatus} = req.body;

    orderList.findByIdAndUpdate(_id, {orderStatus}, (err,doc) => {
        if (err) {
            res.json({
                success: false,
                status: 3,
                message: '订单状态更新失败！',
                data: {}
            })
        } else {
            res.json({
                success: true,
                status: 1,
                message: '订单状态更新成功！',
                data: doc
            })
        }
    })
})

module.exports = router;