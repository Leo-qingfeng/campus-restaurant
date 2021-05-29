var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var dishSchema = new Schema({
    dishName: {
        type: String,
        required: true
    },
    dishPrice: {
        type: Number,
        required: true
    },
    dishPic: {
        type: String,
        required: false
    }
})

exports.dish = mongoose.model('dish',dishSchema);