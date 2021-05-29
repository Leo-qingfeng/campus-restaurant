const express = require('express');
const router = express.Router();

const  multer = require('multer');
let fs = require("fs");

const upload = multer({
    dest:"myUpload/"//上传文件存放路径
});

const singleMidle = upload.single("dishPic");//一次处理一张head字段名的文件，字段名一定要对应！

//接收过来的头像文件
router.post('/', singleMidle, function(req, res, next) {
    console.log(req.file);  
    let file = req.file;
//文件改名保存
    fs.renameSync('myUpload/' + file.filename, 'myUpload/' + file.originalname);//这里修改文件名字
    res.send("服务器结束工作");
});

//获得用户头像src
// router.get('/download/:picture',function (req,res) {
//     console.log(req.params.picture);
//     res.sendFile(process.cwd()+"/myUpload/"+req.params.picture+".jpg")
// });
module.exports=router