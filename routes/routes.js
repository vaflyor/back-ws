const express = require('express');
const router = express.Router();
const Users = require('../../../database/models/User');
const {tapPrice, staminaPrice} = require('../prices')


router.post('/', async (req, res) => {
    try {
        const tgId = req.body.tgId;
        const user = await Users.findOne({telegramId: tgId})

        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }

        res.status(200).json(user);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({message: "Server error"});
    }
});

router.post('/update-balance', async (req, res) => {
    try {
        const {tgId, balance, stamina} = req.body

        if (balance) {
            await Users.updateOne({telegramId: tgId}, {$set: {coins: balance, stamina: stamina}})
        } else {
            await Users.updateOne({telegramId: tgId}, {$set: {stamina: stamina}})
        }

        let {staminaLimit, stamina: varStamina} = await Users.findOne({telegramId: tgId});

        const interval = setInterval(async () => {
            if (varStamina < staminaLimit) {
                varStamina += 1;
                if (varStamina % 50 === 0) {
                    await Users.updateOne({telegramId: tgId}, {$set: {stamina: varStamina}})
                }
            } else {
                clearInterval(interval)
            }
        }, 1000)


        res.status(200).send('Success');
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({message: "Server error"});
    }
})

router.post('/referral', async (req, res) => {
    try {
        const {tgId} = req.body;
        const referrals = await Users.find({referId: tgId}, {__v: 0, coins: 0});
        const referralLink = await Users.findOne({telegramId: tgId}, {__v: 0, coins: 0});
        const responseData = {
            referrals: referrals,
            referralLink: referralLink
        };

        res.status(200).json(responseData);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({message: "Server error"});
    }
});

router.post('/boost', async (req, res) => {
    try {
        const tgId = req.body.tgId;
        const user = await Users.findOne({telegramId: tgId});

        const responseData = {
            tapPrice: tapPrice,
            staminaPrice: staminaPrice,
            userStaminaLimit: user.staminaLimit,
            userBoost: user.boost,
            coins: user.coins
        };

        res.status(200).json(responseData);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({message: "Server error"});
    }
});

router.post('/boost1', async (req, res) => {
    try {
        const {tgId, balance} = req.body;
        await Users.updateOne({telegramId: tgId}, {$set: {coins: balance}});
        res.status(200).json('Success');
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({message: "Server error"});
    }
});

router.post('/update-boost-info', async (req, res) => {
    try {
        const {tgId, boost, staminaLimit} = req.body;

        if (boost) {
            await Users.updateOne({telegramId: tgId}, {$set: {boost: boost}});
        } else if (staminaLimit) {
            await Users.updateOne({telegramId: tgId}, {$set: {staminaLimit: staminaLimit}});
        }

        res.status(200)
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = router;