var express = require('express');
var router = express.Router();
var dishModels = require('../modal/dishModels');
var Dish = dishModels.dish;
var ObjectId = require('mongodb').ObjectID;
router.post('/', function (req, res) {
    const {id} = req.body;
    Dish.findOneAndDelete({_id:ObjectId(id)}, (err) => {
    
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: '删除失败！'
            })

        }
        else {
            res.json({
                success: true,
                message: '删除成功！'
            })
        }
    })
})

    module.exports = router