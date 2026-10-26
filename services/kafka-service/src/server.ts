import { Kafka } from "kafkajs";

const kafkaServer = new Kafka({
    clientId: "kafka-service",
    brokers: ["localhost:9094"],
});

const admin = kafkaServer.admin();

const run = async () => {
    await admin.connect();
    console.log("Connected to Kafka");
    await admin.createTopics({
        topics: [
            {
                topic: "payment-successful",
                numPartitions: 1,
            },
            {
                topic: "order-successful",
                numPartitions: 1,
            },
        ],
    });

    await admin.disconnect();
}

run().catch((err) => {
    console.error("Kafka init failed:", err);
    process.exit(1);
});