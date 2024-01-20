const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const router = express.Router();

// Creating Payment Intent
router.post("/intents", async (req, res) => {
    try {
        //Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "GBP",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        //Return Payment Intent Secret to Client
        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

// export default router;

module.exports = router;
