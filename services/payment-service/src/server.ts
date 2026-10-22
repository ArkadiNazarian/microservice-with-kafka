import { app } from "./app.js";
import { Kafka } from "kafkajs";


const kafkaServer = new Kafka({
    clientId: "payment-service",
    brokers: ["localhost:9094"],
});

const producer = kafkaServer.producer();

const connectToKafka = async () => {
    try {
        await producer.connect();
        console.log("Connected to Kafka");
    } catch (err) {
        console.error("Error connecting to Kafka:", err);
        process.exit(1);
    }
}

app.listen(3000, async () => {
    await connectToKafka()
    console.log("Payment service listening on port 3000");
});