import { Kafka } from "kafkajs";

const kafkaServer = new Kafka({
    clientId: "analytic-service",
    brokers: ["localhost:9094"],
});

const analitycConsumer = kafkaServer.consumer({
    groupId: "analytic-service",
});


const startConsumer = async () => {
    try {
        await analitycConsumer.connect();
        await analitycConsumer.subscribe({ topics: ["payment-successful", "order-successful"], fromBeginning: true });
        await analitycConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {

                switch (topic) {
                    case "payment-successful":
                        console.log("payment-successful", message.value!.toString());
                        break;
                    case "order-successful":
                        console.log("order-successful", message.value!.toString());
                    default:
                        break;
                }



            },
        });
    } catch (error) {
        console.error("Consumer failed to start:", error);
    }
};

startConsumer();
