const KAFKA = {
    BROKERS: ['10.10.121.101:9092'],
    // BROKERS: ['localhost:9092'],
    // BROKERS: ['MUMAULUKAF101:9092'],
    CLIENT_ID: 'kafkaapp',
    CONSUMER_GROUP_ID: 'myshiftproduction2',
    TOPIC: 'myshifttickets'
};

module.exports = { KAFKA };
