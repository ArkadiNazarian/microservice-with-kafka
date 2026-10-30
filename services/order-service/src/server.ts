import { Kafka } from "kafkajs";

const kafkaServer = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9094"],
});

const orderConsumer = kafkaServer.consumer({
    groupId: "order-service",
});

const orderProducer = kafkaServer.producer()

const startConsumer = async () => {
    try {
        await orderProducer.connect()
        await orderConsumer.connect();
        await orderConsumer.subscribe({ topic: "payment-successful", fromBeginning: false });
        await orderConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("value", message.value!.toString());


                await orderProducer.send({
                    topic: 'order-successful',
                    messages: [{
                        value: JSON.stringify({
                            price: message.value!.toString(),
                            order: 'successful'
                        })
                    }]
                })
            },

        });
    } catch (error) {
        console.error("Consumer failed to start:", error);
    }
};

startConsumer();
