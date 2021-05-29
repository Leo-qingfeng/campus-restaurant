var express = require('express');
var router = express.Router();
var dishModels = require('../modal/dishModels');
var Dish = dishModels.dish;

router.post('/',function (req, res) {
    console.log(req.files);
    Dish.create(req.body, (err, doc) => {
        if (err) {
            return res.json({
                success: false,
                message: '菜品添加失败，请确认菜品与价格输入正确',
            })
        }
        else {
            res.json({
                success: true,
                message: '菜品添加成功！',

            })
        }
    })
});

module.exports = router;