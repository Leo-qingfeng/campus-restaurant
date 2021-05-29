var express = require('express');
var router = express.Router();
var orderListModels = require('../modal/orderListModels');
var orderList = orderListModels.orderList;

function getBeforeDate(number) {
    const num = number;
    const date = new Date();
    let year = date.getFullYear();
    let mon = date.getMonth() + 1;
    let day = date.getDate();
    if (day <= num) {
        if (mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    date.setDate(date.getDate() - num);
    year = date.getFullYear();
    mon = date.getMonth() + 1;
    day = date.getDate();
    const s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day);
    return s;
}
router.get('/', function (req, res) {

    const {
        userId
    } = req.session;
    const { pages, curPage } = req.body;
    let total;
    let lastDate = new Date(getBeforeDate(7));
    // orderList.find({
    //     createTime: {
    //         "$gte": new Date(lastDate),
    //         "$lte": new Date()
    //     }
    // }, (err, person) => {
    //     if (!err) {
    //         total = person.length;
    //         let data = [];
    //         console.log(person);
    //         person.forEach(e => {
    //             data.push({ 'day': e.createTime.getDate + 1() })
    //         })

    //         let i = 0;
    //         for (let j = 0; j < data.length; j++) {
    //             if (data[j].day)
    //     }

    //     }
    //     else {
    //         throw err;
    //     }
    // })

    orderList.aggregate([
        {
            $match: {
                'createTime': {
                    "$gte": new Date(lastDate),
                    "$lte": new Date()
                }
            },
        },

        { $project: { day: { $substr: ["$createTime", 0, 10] } } },
        {
            $group: { _id: "$day", total: { $sum: 1 } },

        }
    ]).exec((err, result) => {
        if (err) {
            throw err;
        }
        else {
            if(result){
                res.json({
                    data:result,
                    success:true
                })
            }
        }
    })

})



module.exports = router;