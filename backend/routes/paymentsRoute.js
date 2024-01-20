const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const router = express.Router();

// Checkout
router.post("/checkout", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.line_items,
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `https://book-store-project-frontend-three.vercel.app/shop`,
            cancel_url: `https://book-store-project-frontend-three.vercel.app/`,
        });
        return res.status(200).json(session);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
});

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
