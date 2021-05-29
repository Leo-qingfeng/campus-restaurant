var express = require('express');
var router = express.Router();

router.get('/',function (req,res) {
    console.log(req.session.login);
    if (req.session.login) {
        req.session.destroy();
        res.json({
            logout: true,
            success: true,
            code: 1,
            message: '登出成功'
        })
    } else {
        res.json({
            logout: false,
            success: true,
            code: 2,
            message: '当前未登录，无法登出'
        })
    }
})

module.exports = router;