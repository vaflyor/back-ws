const {db} = require('../db')

const UserSchema = new db.Schema({
    telegramId: {
        type: Number,
        required: true,
        unique: true
    },
    username: String,
    coins: {
        type: Number,
        default: 0
    },
    referralLink: {
        type: String,
        required: true,
        unique: true
    },
    referId: {
        type: Number
    },
    boost: {
        type: Number,
        default: 1,
        max: 10
    },
    stamina: {
        type: Number,
        default: 1000,
        max: 10000,
        min: 0
    },
    staminaLimit: {
        type: Number,
        default: 1000,
        max: 10000
    }
})

module.exports = db.model('User', UserSchema);