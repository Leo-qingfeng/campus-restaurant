var express = require('express');
var router = express.Router();

router.get('/', function (req,res) {
    if (req.session.login) {
        res.json({
            success: true,
            isLogin: true,
            status: 1
        })
    } else {
        res.json({
            isLogin: false,
            success: true,
            status: 2
        })
    }
})

module.exports = router;