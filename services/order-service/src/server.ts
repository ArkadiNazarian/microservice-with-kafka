import { Kafka } from "kafkajs";

const kafkaServer = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9094"],
});

const orderConsumer = kafkaServer.consumer({
    groupId: "order-service",
});

const startConsumer = async () => {
    try {
        await orderConsumer.connect();
        await orderConsumer.subscribe({ topic: "payment-successful", fromBeginning: false });
        await orderConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("value", message.value!.toString());
            },
        });
    } catch (error) {
        console.error("Consumer failed to start:", error);
    }
};

startConsumer();
