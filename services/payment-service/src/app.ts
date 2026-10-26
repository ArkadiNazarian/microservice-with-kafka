import express from "express";
import { producer } from "./server.js";

export const app = express();

app.use(express.json());

app.get("/payment-successful", (req, res) => {

    producer.send({
        topic: "payment-successful",
        messages: [{
            value: JSON.stringify({
                price: 10
            })
        }]
    });

    res.status(200).send("Payment successful");

});