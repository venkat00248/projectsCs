const KAFKA = {
    BROKERS: ['broker:29092'],
    // BROKERS: ['localhost:9092'],
    CLIENT_ID: 'kafkaapp',
    CONSUMER_GROUP_ID: 'myshiftproduction5',
    TOPIC: 'myshifttickets2',
    DB: {
        MONGO: {
            DEV: {
                USERNAME: "",
                PASSWORD: "",
                HOST: "localhost",
                PORT: "27017",
                DATABASE_NAME: "itsm"
            },
            UAT: {
                USERNAME: "itsm_Mahesh",
                PASSWORD: "Nsg7d_foW",
                HOST: "10.10.144.10",
                PORT: "27017",
                DATABASE_NAME: "itsm"
            }
        },
        MONGO_KAFKA: {
            DEV: {
                USERNAME: "",
                PASSWORD: "",
                HOST: "localhost",
                PORT: "27017",
                DATABASE_NAME: "itsm_raw"
            },
            UAT: {
                USERNAME: "itsm_Mahesh",
                PASSWORD: "Nsg7d_foW",
                HOST: "10.10.144.10",
                PORT: "27017",
                DATABASE_NAME: "itsm_raw"
            }
        },POSTGRES: {
            DEV: {
                USERNAME: "mahesh",
                PASSWORD: "maHesh@123",
                HOST: "10.10.144.10",
                PORT: "5432",
                DATABASE_NAME: "db_itsm",
                SCHEMA_NAME: "itsm"
            }, 
            UAT: {
                USERNAME: "mahesh",
                PASSWORD: "maHesh@123",
                HOST: "10.10.144.10",
                PORT: "5432",
                DATABASE_NAME: "db_itsm",
                SCHEMA_NAME: "itsm"
            }
        }
    }
};

module.exports = { KAFKA };
