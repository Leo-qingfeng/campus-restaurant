var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    birth: {
        type: Date,
        required: false,
        default: Date.now
    },
    banlance: {
        type: Number,
        required: false,
        default: 0
    },
    email: {
        type: String,
        required: false,
    },
    role:{
        type:Number,
        required:true
    },
    header:{
        type:String,
        required:false,
        default:'海绵宝宝.jpg'
    }
})

exports.users = mongoose.model('users', usersSchema);