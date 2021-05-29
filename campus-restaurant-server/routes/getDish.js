var express = require('express');
var router = express.Router();
var dishModels = require('../modal/dishModels');
var Dish = dishModels.dish;

router.get('/', function (req, res) {
    Dish.find({}, (err, doc) => {
        if (err) {
            return res.json({
                success: false,
                message: '菜品查询失败',
                code:3,
                data:{}
            })
        }
        else {
            if(doc){
                res.json({
                    success: true,
                    code:1,
                    data:doc,
                    message:"当前菜品查询成功"

    
                })
             
            }   else{
                res.json({
                    success: true,
                    code:2,
                    data:{},
                    message:"当前没有菜品！"
    
                })
            }
           
        }
    })
});

module.exports = router;