import express from "express";

export const app = express();

app.use(express.json());

app.get("/payment-successful", (req, res) => {
    
    
    res.status(200).send("Payment successful");

});