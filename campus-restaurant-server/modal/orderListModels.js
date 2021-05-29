var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderListSchema = new Schema({
    orderName: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    createTime:{
        type:Date,
        required:false,
        default:new Date()
    },
    orderStatus: {
        type: Number,
        required: true
    },
    orderCost: {
        type: Number,
        required: true
    }
});

exports.orderList = mongoose.model('orderList',orderListSchema);