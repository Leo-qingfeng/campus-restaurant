var express = require('express');
var router = express.Router();
var orderListModels = require('../modal/orderListModels');
var orderList = orderListModels.orderList;
var usersModels = require('../modal/usersModels');
var User = usersModels.users;
router.post('/', function (req, res) {
    const { orderCost, userId } = req.body;
    User.findById(userId, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            if (result) {
                const { banlance } = result
                if (orderCost > banlance) {
                    res.json({
                        success: false,
                        message: '余额不足！',
                        code: 400
                    })
                } else {
                    let money = banlance - orderCost;
                    User.findByIdAndUpdate(userId, { banlance: money }, (err, userData) => {
                        if (err) {

                            res.json({
                                success: false,
                                message: '扣钱失败'
                            })
                        }
                        else {

                      
                            orderList.create(req.body, (err, doc) => {
                                if (err) {
                                    return res.json({
                                        success: false,
                                        status: 2,
                                        message: '订单提交失败',
                                    })
                                }
                                else {
                                    res.json({
                                        success: true,
                                        status: 1,
                                        message: '订单提交成功！已从余额扣除'+orderCost+'元',

                                    })
                                }
                            })
                        }
                    })

                }
            }
        }
    })

})

module.exports = router;