const express = require('express');
const router = express.Router();
const Users = require('../../../database/models/User');

router.post('/', async (req, res) => {
    try {
        const tgId = req.body.tgId;
        console.log('data from client: ', tgId);
        const user = await Users.findOne({ telegramId: tgId })

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/update-balance', async (req, res) => {
    try {
        const {tgId, balance} = req.body
        console.log('balance: ', balance)
        console.log('tgId: ', tgId)

        await Users.updateOne({telegramId: tgId}, {$set: {coins: balance}})
        res.status(200);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;
