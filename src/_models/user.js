const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = new Schema({
    phone: String,
    password: String,
    nickname: String,
    avatar: String,
    gender: Number, //1男2女
    age: Number,
    status: Number,
    qq: String,
    wechat: String,
    created_at: {
        type: Date,
        default: new Date()
    }
});
User.index({
    created_at: 1
})
mongoose.model("User", User);